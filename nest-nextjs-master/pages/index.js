import CategoryTab from "../components/ecommerce/categoryTab";
import FeatchDeals from "../components/ecommerce/fetchDeals";
import FeatchTab from "../components/ecommerce/fetchTab";
import FetchTabSlider from "../components/ecommerce/fetchTabSlider";
import Bottom from "../components/elements/Bottom";
import QuickView from "./../components/ecommerce/QuickView";
import Banner5 from "./../components/elements/Banner5";
import Deals1 from "./../components/elements/Deals1";
import IntroPopup from "./../components/elements/IntroPopup";
import Layout from "./../components/layout/Layout";
import CategorySlider from "./../components/sliders/Category";
import Intro1 from "./../components/sliders/Intro4";
import Link from "next/link";

// Our imports
import axios from 'axios';
import Category from "./../components/sliders/Category";


export default function Home(props) {
    console.log(props)
    return (
        <>
            <IntroPopup />

            <Layout superunivers_univers_categories={props.superunivers_univers_categories} noBreadcrumb="d-none">
                <section className="home-slider position-relative mb-30">
                    <div className="container">
                        <div className="home-slide-cover mt-30">
                            <Intro1 />
                        </div>
                    </div>
                </section>

                <section className="popular-categories section-padding">
                    <div className="container wow animate__fadeIn animate__animated">
                        <div className="section-title">
                            <div className="title">
                                <h3>Featured Categories</h3>
                                <ul className="list-inline nav nav-tabs links">
                                    <li className="list-inline-item nav-item">
                                        <Link href="/products">
                                            <a className="nav-link">Cake & Milk</a>
                                        </Link>
                                    </li>
                                    <li className="list-inline-item nav-item">
                                        <Link href="/products">
                                            <a className="nav-link">Coffes & Teas</a>
                                        </Link>
                                    </li>
                                    <li className="list-inline-item nav-item">
                                        <Link href="/products">
                                            <a className="nav-link active">Pet Foods</a>
                                        </Link>
                                    </li>
                                    <li className="list-inline-item nav-item">
                                        <Link href="/products">
                                            <a className="nav-link">Vegetables</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="carausel-10-columns-cover position-relative">
                            <div className="carausel-10-columns" id="carausel-10-columns">
                                <CategorySlider />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="banners mb-25">
                    <div className="container">
                        <div className="row">
                            <Banner5 />
                        </div>
                    </div>
                </section>

                <section className="product-tabs section-padding position-relative">
                    <div className="container">
                        <div className="col-lg-12">
                            <CategoryTab />
                        </div>
                    </div>
                </section>

                <section className="section-padding pb-5">
                    <div className="container">
                        <FetchTabSlider />
                    </div>
                </section>

                <section className="section-padding pb-5">
                    <div className="container">
                        <div className="section-title wow animate__animated animate__fadeIn" data-wow-delay="0">
                            <h3 className="">Deals Of The Day</h3>
                            <Link href="/products">
                                <a className="show-all">
                                    All Deals
                                    <i className="fi-rs-angle-right"></i>
                                </a>
                            </Link>
                        </div>
                        <FeatchDeals />
                    </div>
                </section>
                <Bottom />
                <QuickView />
            </Layout>
        </>
    );
}
export async function getStaticProps(context) {
    
    // SuperUinvers begin
    const qs =require('qs')
    const querySuperUnivers = qs.stringify(
        {
            filters: {
                        CLE_LANG : { $eq: "0" }
                    }
        },
        {
            encodeValuesOnly: true,
        }
    ) 
    const res = await axios.get(`http://localhost:1337/api/superuniversdetailss?${querySuperUnivers}`)
    // SuperUnivers end

    
    // For each superunivers begin
    const superunivers_univers = []
    for (let superunivers of res.data.data) {

        // Univers begin
        const queryUnivers = qs.stringify(
            {
                filters: {
                            CLE_SUPERUNIVERS: { $eq: superunivers["attributes"]["CLE_SUPERUNIVERS"] },
                        }
            },
            {
                encodeValuesOnly: true,
            }
        ) 
        // get keys of all univers for the superunivers begin
        const resunivers = await axios.get(`http://localhost:1337/api/rayonbases?${queryUnivers}`)

        const univers_keys = []

        for (let superunivers of resunivers.data.data) {
            univers_keys.push(superunivers['attributes']['CLE_RAYON'])
        }
        // get keys of all univers for the superunivers end

        const queryUniversDetails = qs.stringify(
            {
                filters: {
                            CLE_RAYON : { $in : univers_keys },
                            CLE_LANG : { $eq : "0" }
                        }
            },
            {
                encodeValuesOnly: true,
            }
        ) 
        const resUniversDetails = await axios.get(`http://localhost:1337/api/rayondetails?${queryUniversDetails}`)

        const categories_univers = []
        for (let univers of resUniversDetails.data.data) {
            // Categories Begin
                const queryCategory = qs.stringify(
                    {
                        filters : {           
                                    CLE_RAYON: { $eq: univers['attributes']['CLE_RAYON'] }              
                                }
                    },
                    {
                        encodeValuesOnly: true,
                    }
                ) 
                const resCategory = await axios.get(`http://localhost:1337/api/typeprods?${queryCategory}`) 
                categories_univers.push({univers: univers, categories : resCategory.data.data.filter(e=>e["attributes"]["CLE_TYPE_PROD"]==e["attributes"]["CLE_TYPE_PROD_CATEGORIE"])})
            }
            // Categories End

        superunivers_univers.push({superunivers:superunivers, categories_univers:categories_univers})
        // Univers fin
    }
    // End For each superunivers 

    return {
        props: {
            superunivers_univers_categories : superunivers_univers
        }, 
      }
}
        /*const categories_univers = []
        for (let univers of resUniversDetails.data.data) {
            console.log ("/////////////////////// " + univers['attributes']['CLE_RAYON'] )
            const queryCategory = qs.stringify(
                {
                    filters : {       
                                CLE_RAYON: { $eq: univers['attributes']['CLE_RAYON'] }
                            }
                },
                {
                    encodeValuesOnly: true,
                }
            ) 
            const resCategory = await axios.get(`http://localhost:1337/api/typeprods?${queryCategory}`)    
            console.log(resCategory.data.data.length)
            categories_univers.push({resCategory.data.data) 
        }*/
/*export async function getStaticProps(context) {
    const qs =require('qs')

    const res = await axios.get(`http://localhost:1337/api/superuniversdetailss`)

    const rayons_superunivers = []
    const typeprods_univers = []

    for (let cle_superunivers of res.data.data) {

        const query = qs.stringify(
            {
                filters: {
                            CLE_SUPERUNIVERS: { $eq: cle_superunivers["attributes"]["CLE_SUPERUNIVERS"] } 
                        }
            },
            {
                encodeValuesOnly: true,
            }
        ) 
        const res2 = await axios.get(`http://localhost:1337/api/rayonbases?${query}`)

        const rayons_keys = []

        for (let superunivers of res2.data.data) {
            rayons_keys.push(superunivers['attributes']['CLE_RAYON'])
        }

        const query2 = qs.stringify(
            {
                filters: {
                            CLE_RAYON : { $in : rayons_keys },
                            CLE_LANG : { $eq : "0"}
                        }
            },
            {
                encodeValuesOnly: true,
            }
        ) 
        const res3 = await axios.get(`http://localhost:1337/api/rayondetails?${query2}`)   
        rayons_superunivers.push({superunivers_lib : cle_superunivers, univers : res3.data.data})

        for (let univers of res3.data.data) {
            const query3 = qs.stringify(
                {
                    filters : {
                                    
                                CLE_RAYON: { $eq: univers['attributes']['CLE_RAYON'] }    
                            }
                },
                {
                    encodeValuesOnly: true,
                }
            ) 
            const res4 = await axios.get(`http://localhost:1337/api/typeprods?${query3}`) 
            typeprods_univers.push({univers : univers, typeprods : res4.data.data})    
        }
    }

    const query3 = qs.stringify(
        {
            filters: {
                $or: [
                    {selection: { $eq: true }},
                    {coupdecoeur: { $eq: true }},
                    {achatenligne: { $eq: true }},     
                    {asaisir: { $eq: true }}               
                ]
            }
        },
        {
            encodeValuesOnly: true,
        }
        )
    const res2 = await axios.get(`http://localhost:1337/api/produits?${query3}`)  
    const selections = []
    for (let produit of res2.data.data) {
        const query = qs.stringify (
            {
                filters: {
                    CLE_EXPOSANT: { $eq: produit['attributes']['CLE_EXPOSANT'] } 
                }
            },
            {
                encodeValuesOnly: true,
            }
        )   
        const res = await axios.get(`http://localhost:1337/api/exposants?${query}`) 

        const query2 = qs.stringify (
            {
                filters: {
                    CLE_TYPE_PROD: { $eq: produit['attributes']['CLE_TYPE_PROD'] } 
                }
            },
            {
                encodeValuesOnly: true,
            }
        )  
        const res2 = await axios.get(`http://localhost:1337/api/typeprods?${query2}`) 
        selections.push({produit : produit, typeprod : res2.data.data[0], exposant : res.data.data[0]})
    }

    const query4 = qs.stringify(
        {
            filters: {
                NOUVEAUTE : { $eq: "1" } 
            }
        },
        {
            encodeValuesOnly: true,
        }
        )
        const res3 = await axios.get(`http://localhost:1337/api/produits?${query4}`) 
        const nouveautes = []
        for (let produit of res3.data.data) {
            const query = qs.stringify (
                {
                    filters: {
                        CLE_EXPOSANT: { $eq: produit['attributes']['CLE_EXPOSANT'] } 
                    }
                },
                {
                    encodeValuesOnly: true,
                }
            )   
            const res = await axios.get(`http://localhost:1337/api/exposants?${query}`) 
    
            const query2 = qs.stringify (
                {
                    filters: {
                        CLE_TYPE_PROD: { $eq: produit['attributes']['CLE_TYPE_PROD'] } 
                    }
                },
                {
                    encodeValuesOnly: true,
                }
            )  
            const res2 = await axios.get(`http://localhost:1337/api/typeprods?${query2}`) 

            nouveautes.push({produit : produit, typeprod : res2.data.data[0], exposant : res.data.data[0]})
        }
    return {
      props: {
          superunivers : res.data.data,
          rayons_univers : rayons_superunivers,
          typeprods_univers : typeprods_univers,
          selections : selections,
          nouveautes : nouveautes
      }, 
    }
}*/
