import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import CategoryProduct from "../../components/ecommerce/Filter/CategoryProduct";
import PriceRangeSlider from "../../components/ecommerce/Filter/PriceRangeSlider";
import ShowSelect from "../../components/ecommerce/Filter/ShowSelect";
import SizeFilter from "../../components/ecommerce/Filter/SizeFilter";
import SortSelect from "../../components/ecommerce/Filter/SortSelect";
import VendorFilter from "../../components/ecommerce/Filter/VendorFilter";
import Pagination from "../../components/ecommerce/Pagination";
import QuickView from "../../components/ecommerce/QuickView";
import SingleProduct from "../../components/ecommerce/SingleProduct";
import Breadcrumb2 from "../../components/layout/Breadcrumb2";
import Layout from "../../components/layout/Layout";
import { fetchProduct } from "../../redux/action/product";

// Our imports 
import axios from 'axios'

const Products = ({ products, 
    productFilters, 
    fetchProduct, 
    superunivers_univers_categories, 
    exposant, 
    categorie, 
    univers, 
    superunivers, 
    typeprods, 
    produits,
    autres_categories,
    autres_exposants,
    styles,
    couleurs
}) => {
    let Router = useRouter(),
        searchTerm = Router.query.search,
        showLimit = 12,
        showPagination = 4;

    let [pagination, setPagination] = useState([]);
    let [limit, setLimit] = useState(showLimit);
    let [pages, setPages] = useState(Math.ceil(products.items.length / limit));
    let [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchProduct(searchTerm, "/static/product.json", productFilters);
        cratePagination();
    }, [productFilters, limit, pages, products.items.length]);

    const cratePagination = () => {
        // set pagination
        let arr = new Array(Math.ceil(products.items.length / limit))
            .fill()
            .map((_, idx) => idx + 1);

        setPagination(arr);
        setPages(Math.ceil(products.items.length / limit));
    };

    const startIndex = currentPage * limit - limit;
    const endIndex = startIndex + limit;
    const getPaginatedProducts = products.items.slice(startIndex, endIndex);

    let start = Math.floor((currentPage - 1) / showPagination) * showPagination;
    let end = start + showPagination;
    const getPaginationGroup = pagination.slice(start, end);

    const next = () => {
        setCurrentPage((page) => page + 1);
    };

    const prev = () => {
        setCurrentPage((page) => page - 1);
    };

    const handleActive = (item) => {
        setCurrentPage(item);
    };

    const selectChange = (e) => {
        setLimit(Number(e.target.value));
        setCurrentPage(1);
        setPages(Math.ceil(products.items.length / Number(e.target.value)));
    };
    return (
        <>
            <Layout noBreadcrumb="d-none" superunivers_univers_categories={superunivers_univers_categories}>
            <Breadcrumb2 levels={[superunivers&&superunivers["attributes"]["LIB"],univers&&univers["attributes"]["LIB"],categorie&&categorie["attributes"]["LIB_FR"]]}/>
                <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="row flex-row">
                        <div className="col-lg-1-5 primary-sidebar sticky-sidebar">
                                <div className="sidebar-widget widget-category-2 mb-30">
                                <h5 className="section-title style-1 mb-30">
                                        {univers && "A voir aussi dans "+univers["attributes"]["LIB"]}
                                    </h5>
                                    <div className="scroll"><CategoryProduct  autres_categories={autres_categories}/></div>                                   
                                </div>
                                <div className="sidebar-widget widget-category-2 mb-30">
                                <h5 className="section-title style-1 mb-30">
                                        {categorie && "Dans la catégorie : "+categorie["attributes"]["LIB_FR"]}
                                    </h5>
                                    <div className="scroll"><CategoryProduct typeprods={typeprods}/></div>
                                </div>
                                <div className="sidebar-widget widget-category-2 mb-30">
                                <h5 className="section-title style-1 mb-30">
                                        Marques
                                    </h5>
                                    <div className="scroll"><CategoryProduct autres_exposants={autres_exposants}/></div>
                                </div>
                                <div className="sidebar-widget widget-category-2 mb-30">
                                <h5 className="section-title style-1 mb-30">
                                        Prix
                                    </h5>
                                    <div className="scroll"><CategoryProduct produits_prix={produits}/></div>
                                </div>
                                <div className="sidebar-widget widget-category-2 mb-30">
                                <h5 className="section-title style-1 mb-30">
                                        Designer
                                    </h5>
                                    <div className="scroll"><CategoryProduct produits_designers={produits}/></div>
                                </div>
                                <div className="sidebar-widget widget-category-2 mb-30">
                                <h5 className="section-title style-1 mb-30">
                                        Style
                                    </h5>
                                    <div className="scroll"><CategoryProduct produits_styles={styles}/></div>
                                </div>
                                <div className="sidebar-widget widget-category-2 mb-30">
                                <h5 className="section-title style-1 mb-30">
                                        Couleur
                                    </h5>
                                    <div className="scroll"><CategoryProduct produits_couleurs={couleurs}/></div>
                                </div>
                                <div className="sidebar-widget widget-category-2 mb-30">
                                <h5 className="section-title style-1 mb-30">
                                        Materiaux
                                    </h5>
                                    <div className="scroll"><CategoryProduct produits_prix={produits}/></div>
                                </div>
                            </div>
                            <div className="col-lg-4-5">
                                <div className="shop-product-fillter">
                                    <div className="totall-product">
                                        <p>
                                            {
                                               typeprods&& 
                                               <>
                                                <strong className="text-brand">
                                               {typeprods.length}
                                               </strong>
                                                types produits 
                                               </>
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="row product-grid-3">
                                    {typeprods&&typeprods.length === 0 && (
                                        <h3>No Products Found </h3>
                                    )}
                                    {typeprods&&typeprods.slice(0,10).map((typeproduit, i) => (
                                        <div
                                        className="col-lg-1-5 col-md-4 col-12 col-sm-6"
                                        key={i}
                                        >
                                            <SingleProduct 
                                            typeproduit={typeproduit}
                                            exposant={exposant}
                                            />
                                        </div>

                                    ))}
                                </div>
                                <br/>
                                <div className="row product-grid-3">
                                    <h6>Découvrez tous les produits de la catégorie {categorie&&categorie["attributes"]["LIB_FR"]} :</h6>
                                    <br/><br/>
                                    {produits&&produits.length === 0 && (
                                        <h3>No Products Found </h3>
                                    )}
                                    {produits&&produits.map((produit, i) => (
                                        <div
                                        className="col-lg-1-5 col-md-4 col-12 col-sm-6"
                                        key={i}
                                        >
                                            <SingleProduct 
                                            produit={produit}
                                            exposant={exposant}
                                            />
                                        </div>

                                    ))}
                                </div>
                            </div>

                            
                        </div>
                    </div>
                </section>
                <QuickView />
            </Layout>
        </>
    );
};

const mapStateToProps = (state) => ({
    products: state.products,
    productFilters: state.productFilters,
});

const mapDidpatchToProps = {
    // openCart,
    fetchProduct,
    // fetchMoreProduct,
};

export default connect(mapStateToProps, mapDidpatchToProps)(Products);

export async function getStaticPaths() {

    const paths = []

    return {
        paths:paths,
        fallback : true
    }
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

     // Begin exposant four products
     const queryExposant = qs.stringify (
        {
            filters: {
                CLE_EXPOSANT: { $eq: "5791" } 
            }
        },
        {
            encodeValuesOnly: true,
        }
    )   
    const resExposant = await axios.get(`http://localhost:1337/api/exposants?${queryExposant}`) 
    // End exposant four products

    // Categories Begin
        const resCategory = await axios.get(`http://localhost:1337/api/typeprods/${context.params.slug}`) 
    // Categories End

    // Univers Begin
       const queryUnivers = qs.stringify(
        {
            filters : {           
                        CLE_RAYON: { $eq: resCategory.data.data["attributes"]["CLE_RAYON"] }              
                    }
        },
        {
            encodeValuesOnly: true,
        }
    ) 
    const resUnivers = await axios.get(`http://localhost:1337/api/rayondetails?${queryUnivers}`) 
    const resUniversBase = await axios.get(`http://localhost:1337/api/rayonbases?${queryUnivers}`)    
    // Univers End

    // Superunivers Begin
    const querySuperunivers = qs.stringify(
        {
            filters : {           
                        CLE_SUPERUNIVERS: { $eq: resUniversBase.data.data[0]["attributes"]["CLE_SUPERUNIVERS"] } ,  
                        CLE_LANG : { $eq : "0" }           
                    }
        },
        {
            encodeValuesOnly: true,
        }
    ) 
    const resSuperunivers = await axios.get(`http://localhost:1337/api/superuniversdetailss?${querySuperunivers}`) 
    // Superunivers End

    // Typeprods Begin
    const queryTypeprods = qs.stringify(
        {
            filters : {           
                CLE_TYPE_PROD_CATEGORIE: { $eq: resCategory.data.data["attributes"]["CLE_TYPE_PROD"] } ,           
            }
        },
        {
            encodeValuesOnly: true,
        }
    )
    const resTypeprods = await axios.get(`http://localhost:1337/api/typeprods?${queryTypeprods}`) 
    // Typeprods End

    // Produits Begin
    const keys_typeprods = []
    resTypeprods.data.data.forEach(element => {
        keys_typeprods.push(element["attributes"]["CLE_TYPE_PROD"])
    })
    const queryProds = qs.stringify(
        {
            filters : {           
                CLE_TYPE_PROD: { $in : keys_typeprods } ,           
            }
        },
        {
            encodeValuesOnly: true,
        }
    )
    const resProds = await axios.get(`http://localhost:1337/api/produits?${queryProds}`) 
    // Produits End

    // categories (same univers like the category) Begin
    const f = superunivers_univers.find(element=>element["superunivers"]["id"]==resSuperunivers.data.data[0]["id"])
    const f2 = f["categories_univers"].find(element=>element["univers"]["id"] == resUnivers.data.data[0]["id"])
    // categories (same univers like the category) End

    // Marques of univers Begin
    const queryMarques = qs.stringify(
        {
            filters : {           
                CLE_RAYON_PRINCIPAL: { $eq : resUnivers.data.data[0]["attributes"]["CLE_RAYON"] } ,           
            }
        },
        {
            encodeValuesOnly: true,
        }
    )
    const resMarques = await axios.get(`http://localhost:1337/api/exposants?${queryMarques}`)      
    // Marques of univers End

    // Styles Begin
    const keys_styles = resProds.data.data.map(e=>e["attributes"]["CLE_STYLE"])

    const queryStyles= qs.stringify(
        {
            filters : {           
                CLE_STYLE: { $in : [...new Set(keys_styles)] } ,           
            }
        },
        {
            encodeValuesOnly: true,
        }
    )
    const resStyles = await axios.get(`http://localhost:1337/api/styles?${queryStyles}`)    
    // Styles End

    // Couleurs Begin
    const keys_couleurs = resProds.data.data.map(e=>e["attributes"]["CLE_COULEUR"])

    const queryCouleurs= qs.stringify(
        {
            filters : {           
                CLE_COULEUR: { $in : [...new Set(keys_couleurs)] } ,           
            }
        },
        {
            encodeValuesOnly: true,
        }
    )
    const resCouleurs = await axios.get(`http://localhost:1337/api/couleurs?${queryCouleurs}`)    
    console.log(resCouleurs.data.data)
    // Couleurs End

    return {
        props: {
            superunivers_univers_categories : superunivers_univers,
            exposant : resExposant.data.data[0],
            categorie : resCategory.data.data,
            univers : resUnivers.data.data[0],
            typeprods : resTypeprods.data.data,
            superunivers : resSuperunivers.data.data[0],
            produits : resProds.data.data,
            autres_categories : f2["categories"],
            autres_exposants : resMarques.data.data,
            styles : resStyles.data.data,
            couleurs : resCouleurs.data.data
        }, 
      }
}