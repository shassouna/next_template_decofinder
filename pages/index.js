import QuickView from "./../components/ecommerce/QuickView";
import Layout from "./../components/layout/Layout";
import CategorySlider from "./../components/sliders/Category";
import Intro1 from "./../components/sliders/intro4.js";

// Our imports
import axios from 'axios';
import FeaturedTab from './../components/elements/FeaturedTab';


export default function Home(props) {

    return (
        <>
            <Layout superunivers_univers_categories={props.superunivers_univers_categories} noBreadcrumb="d-none">
                <section className="home-slider position-relative mb-30">
                    <div className="container">
                        <div className="home-slide-cover mt-30">
                            <Intro1 />
                        </div>
                    </div>
                </section>
                <section className="section-padding pb-5">
                <div className="product-grid-5 row"
                style={{width:"90%", marginLeft:"5%"}}>
                            <FeaturedTab 
                           selections={props.selections}
                            />
                    </div>
                </section>
                <section style={{marginTop:"55px"}}>
                    <div style={{display:'flex', flexDirection:'row', flexWrap:"wrap", justifyContent:'center', width:"90%", marginLeft:"5%"}}>
                        <a  target="_blank" href={"#"} style={{width:'20%', minWidth:"380px", marginLeft:"2.5%", marginRight:"2.5%"}}>
                        <button style={{width:'100%'}} className="button button-add-to-cart-home">Toutes les sélections du jury</button>
                        </a>
                        <a href={"#"} style={{width:'20%', minWidth:"380px", marginLeft:"2.5%", marginRight:"2.5%"}}>
                        <button style={{width:'100%'}} className="button button-add-to-cart-home">Tous les coups de coeur</button>
                        </a>
                        <a href={"#"} style={{width:'20%',minWidth:"380px", marginLeft:"2.5%", marginRight:"2.5%"}}>
                        <button style={{width:'100%'}} className="button button-add-to-cart-home">Tous les achats en ligne</button>
                        </a>
                        <a href={"#"} style={{width:'20%', minWidth:"380px", marginLeft:"2.5%", marginRight:"2.5%"}}>
                        <button style={{width:'100%'}} className="button button-add-to-cart-home">Toutes les promotions</button>
                        </a>
                    </div>
                </section>

                <section className="popular-categories section-padding" style={{marginTop:"75px"}}>
                    <div className="container wow animate__fadeIn animate__animated">
                        <div className="section-title">
                            <div className="title">
                                <h3>Tous les Mega Univers :</h3>
                            </div>
                        </div>
                        <div className="carausel-10-columns-cover position-relative">
                            <div className="carausel-10-columns" id="carausel-10-columns">
                                <CategorySlider superunivers_univers_categories={props.superunivers_univers_categories}/>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container  pt-50">
                        <div className="row">
                            <div className="col-xl-10 col-lg-12 m-auto">
                                <section className="row align-items-center mb-50">
                                    <div className="col-lg-6">
                                            <h2 className="mb-10">Le salon en ligne de la décoration et de l’ameublement depuis 1994 !</h2>
                                            <p className="mb-25">Decofinder est conçu pour permettre aux acheteurs, particuliers comme professionnels, de trouver des produits, des entreprises et de la documentation. Pensé comme un outil de découverte ayant pour objectif de faciliter la recherche, il offre également aux entreprises de meilleurs canaux de diffusion et de vente pour leurs produits, tant en France qu’à l’étranger.</p>
                                            <h2 className="mb-10">De l’ameublement à la décoration, notre catalogue répond à toutes vos envies :</h2>
                                            <p className="mb-25">Avec plus de 500 000 produits référencés au sein de 12 Univers, Decofinder est un site leader et la référence du secteur de la décoration, de l’habitat et du design. Du style classique au style contemporain, des objets rétro aux objets design, notre catalogue est mis à jour régulièrement afin de vous assurer un choix à la hauteur de vos attentes.</p>
                                            <p>C’est pourquoi, nous mettons tout en place pour vous satisfaire : une large gamme de mobilier avec des bureaux, des lits, des rangements, des tables ou encore des sièges et des canapés, conçus dans des matières et des styles différents, novateurs et design. Vous trouverez également tout pour décorer vos murs, vos plafonds et vos sols : de la peinture intérieure ou extérieure au papier peint en passant par les tableaux décoratifs, les parquets, les tapis et les luminaires, vous trouverez de quoi réaliser l’ambiance parfaite.</p>
                                            <h2 className="mb-10">Avec Decofinder tout est possible :</h2>
                                            <p className="mb-25">Grâce à l’une des offres les plus complètes sur le marché de la décoration et de l’ameublement, nous pouvons répondre à la majorité de vos demandes et de vos envies. Fausse poutre, encoignure ou encore chintz, notre équipe met tout en œuvre pour vous satisfaire.</p>
                                            <p className="mb-25">Vous cherchez un billot de cuisine, un bout de canapé ou bien une entrée de meuble pour vos serrures ? Nous avons les produits qu’il vous faut et surtout un vaste choix de couleurs, de formes et de matières, grâce à nos milliers d’exposants. Vasque de jardin, suspension multiple, table de jeux ou encore porte tasses, nous avons ce que vous cherchez !</p>
                                    </div>
                                    <div className="col-lg-6">
                                            <p className="mb-25">Finalement, de l’intérieur à l’extérieur, de la table à la cuisine et à la salle de bain, du high-tech à la décoration, au linge de maison ou encore au monde de l’enfant, notre équipe reste présente et à l’affût pour vous proposer les meilleurs produits.</p>
                                            <h2 className="mb-10">Un espace dédié pour les créateurs et les exposants :</h2>
                                            <p className="mb-25">Fort d’un savoir-faire dans l’univers du commerce en ligne, Decofinder s’est donné comme mission de valoriser les entreprises et les designers en leur offrant une plus large visibilité. Grâce à un descriptif d’entreprise, des fiches techniques détaillées et une mise en avant des sites Internet, toutes les conditions sont réunies pour assurer une notoriété croissante.</p>
                                            <p className="mb-25">Grâce à notre site internet proposé en 5 langues (francais, anglais, allemand, italien et espagnol) et nos millions de visiteurs annuels, vous serez mis en relation avec de nombreux futurs acheteurs.</p>
                                            <h2 className="mb-10">Decofinder c'est aussi des idées et des conseils tendances pour votre intérieur et votre extérieur en matière de décoration et d’ameublement :</h2>
                                            <p className="mb-25">Quelquefois, il peut être compliqué de se projeter et de choisir un produit. C’est pourquoi, nous vous accompagnons également à travers notre Mag, dans la découverte des dernières tendances en matière de décoration, d’ameublement et de design, grâce à de nombreuses sélections. Nous vous présentons aussi les dernières créations élaborées par des designers ainsi que de nombreuses rénovations et créations architecturales, afin que jamais vous ne manquiez d’inspiration.</p>
                                            <p className="mb-25">Decofinder s’attache également à vous accompagner lors de l’aménagement et de l’optimisation de vos espaces ainsi que dans la réalisation de vos petits travaux, grâce à sa page Conseil. Retrouvez-y des astuces, des tutos et des recommandations pour donner vie à vos projets et pour plus d’inspiration, nous vous proposons des posts quotidiens sur nos réseaux sociaux. Nous restons à votre écoute pour toute question que vous jugeriez utile.</p>
                                            <p className="mb-25">Bonne visite sur Decofinder.</p>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="container mb-50 d-none d-md-block" style={{minWidth:"100%", borderRadius:"0px"}}>
                    <div className="row about-count">
                        <div  className="product-grid-4 row" style={{zIndex:100}}>
                           <FeaturedTab 
                                inspirations={props.selections}
                            />                       
                        </div>
                        <div style={{display:'flex', flexDirection:'row', flexWrap:"wrap", justifyContent:'center', width:"90%", marginLeft:"5%", marginTop:"50px"}}>
                            <a  target="_blank" href={"#"} style={{width:'20%', minWidth:"380px", marginLeft:"2.5%", marginRight:"2.5%"}}>
                            <button style={{width:'100%'}} className="button button-add-to-cart-inspirations">Découvrez toutes les inspirations</button>
                            </a>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="product-grid-4 row">
                    <FeaturedTab nouveautes={props.selections} />
                    </div>
                    {/* <SingleProductList product={item}/> */}
                </section>
  
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

    // Begin four products
    const queryFourProducts = qs.stringify(
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
    const resFourProducts = await axios.get(`http://localhost:1337/api/produits?${queryFourProducts}`)  

    const selections = []
    for (let produit of resFourProducts.data.data) {
        // Begin exposant four products
        const queryExposant = qs.stringify (
            {
                filters: {
                    CLE_EXPOSANT: { $eq: produit['attributes']['CLE_EXPOSANT'] } 
                }
            },
            {
                encodeValuesOnly: true,
            }
        )   
        const resExposant = await axios.get(`http://localhost:1337/api/exposants?${queryExposant}`) 
        // End exposant four products

        // Begin typeprod for product
        const queryTypeprod = qs.stringify (
            {
                filters: {
                    CLE_TYPE_PROD: { $eq: produit['attributes']['CLE_TYPE_PROD'] } 
                }
            },
            {
                encodeValuesOnly: true,
            }
        )  
        const resTypeprod = await axios.get(`http://localhost:1337/api/typeprods?${queryTypeprod}`) 
        // End typeprod for product

        selections.push({produit : produit, typeprod : resTypeprod.data.data[0], exposant : resExposant.data.data[0]})
    }
    // End four products

    // Begin Nouveautes
    /*const queryNouveautes = qs.stringify(
        {
            filters: {
                NOUVEAUTE : { $eq: "1" } 
            }
        },
        {
            encodeValuesOnly: true,
        }
        )
        const resNouveautes = await axios.get(`http://localhost:1337/api/produits?${queryNouveautes}`) 
        const nouveautes = []
        for (let produit of resNouveautes.data.data) {
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
        */
    // End Nouveautes 

    return {
        props: {
            superunivers_univers_categories : superunivers_univers,
            fourproducts : resFourProducts.data.data,
            selections : selections,
           // nouveautes : nouveautes
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
