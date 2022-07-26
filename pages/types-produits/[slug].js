import Layout from "../../components/layout/Layout";
import Breadcrumb2 from "../../components/layout/Breadcrumb2";
import CategoryProduct from "../../components/ecommerce/Filter/CategoryProduct";
import SingleProduct from "../../components/ecommerce/SingleProduct";

// My imports 
import axios from "axios"

const Slug = ({
    superunivers_univers_categories,
    typeProd,
    categorie,
    univers,
    superunivers,
    autres_typeProds,
    autres_exposants,
    produits,
    prods_exposants,
    produits_prix,
    designers,
    styles,
    couleurs,
    materiaux
}) => {
    return (
        <Layout noBreadcrumb="d-none" superunivers_univers_categories={superunivers_univers_categories}>
            <Breadcrumb2 title="Type produit" levels={[superunivers&&superunivers["attributes"]["LIB"],univers&&univers["attributes"]["LIB"],categorie&&categorie["attributes"]["LIB_FR"], typeProd&&typeProd["attributes"]["LIB_FR"]]}/>
            <section className="mt-50 mb-50">
                <div className="container">
                    <div className="row flex-row">
                    <div className="col-lg-1-5 primary-sidebar sticky-sidebar">
                                <div className="sidebar-widget widget-category-2 mb-30">
                                <h5 className="section-title style-1 mb-30">
                                        Dans la même catégorie
                                    </h5>
                                    <div className="scroll"><CategoryProduct typeprods={autres_typeProds}/></div>
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
                                    <div className="scroll"><CategoryProduct produits_prix={produits_prix}/></div>
                                </div>
                                <div className="sidebar-widget widget-category-2 mb-30">
                                <h5 className="section-title style-1 mb-30">
                                        Designer
                                    </h5>
                                    <div className="scroll"><CategoryProduct produits_designers={designers}/></div>
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
                                    <div className="scroll"><CategoryProduct produits_materiaux={materiaux}/></div>
                                </div>
                        </div> 
                        <div className="col-lg-4-5">
                            <div className="shop-product-fillter">
                                <div className="totall-product">
                                    <p>
                                        {
                                        produits&& 
                                        <>
                                        <strong className="text-brand">
                                        {produits.length}
                                        </strong>
                                        produits 
                                        </>
                                        }
                                   </p>
                                </div>
                            </div>
                            <div className="row product-grid-3">
                            {prods_exposants&&prods_exposants.length === 0 && (
                                <h3>Aucun produit </h3>
                            )}
                            {prods_exposants&&prods_exposants.slice(0,10).map((produit, i) => (
                                <div
                                className="col-lg-1-5 col-md-4 col-12 col-sm-6"
                                key={produit["id"]}
                                >
                                    <SingleProduct 
                                    produit={produit.produit}
                                    exposant={produit.exposant}
                                    />
                                </div>
                            ))}
                            </div>
                       </div>  
                    </div>
                    <div className="archive-header-2 text-center">
                            <h2 className=" mt-50 mb-30">Produits associés</h2>
                    </div>
                    <div className="row product-grid-3">
                        {autres_typeProds&&autres_typeProds.length === 0 && (
                            <h3>Aucun type produit </h3>
                        )}
                        {autres_typeProds&&autres_typeProds.slice(0,10).map((typeproduit, i) => (
                            <div
                            className="col-lg-1-5 col-md-4 col-12 col-sm-6"
                            key={i}
                            >
                                <SingleProduct 
                                typeproduit={typeproduit}
                                />
                            </div>

                        ))}
                    </div>
                </div>         
            </section>
        </Layout>
    )
}

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

    // Typeprods Begin
    const resTypeprod = await axios.get(`http://localhost:1337/api/typeprods/${context.params.slug}`) 
    // Typeprods End

    // Categories Begin
    const queryCategory = qs.stringify(
        {
            filters : {           
                CLE_TYPE_PROD: { $eq: resTypeprod.data.data['attributes']['CLE_TYPE_PROD_CATEGORIE'] }              
                    }
        },
        {
            encodeValuesOnly: true,
        }
    ) 
    const resCategory = await axios.get(`http://localhost:1337/api/typeprods?${queryCategory}`) 
    // Categories End

    // Univers Begin
    const queryUnivers = qs.stringify(
        {
            filters : {           
                        CLE_RAYON: { $eq: resCategory.data.data[0]["attributes"]["CLE_RAYON"] }              
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
                CLE_TYPE_PROD_CATEGORIE: { $eq: resTypeprod.data.data['attributes']['CLE_TYPE_PROD_CATEGORIE'] } ,           
            }
        },
        {
            encodeValuesOnly: true,
        }
    )
    const resTypeprods = await axios.get(`http://localhost:1337/api/typeprods?${queryTypeprods}`) 
    // Typeprods End

    // Produits Begin
    const queryProds = qs.stringify(
        {
            filters : {           
                CLE_TYPE_PROD: { $eq : resTypeprod.data.data['attributes']['CLE_TYPE_PROD'] } ,          
                TITRE_FR: { $ne : "NULL" } ,
                TARIF_PUB: { $ne : "NULL" }
            }
        },
        {
            encodeValuesOnly: true,
        }
    )
    const resProds = await axios.get(`http://localhost:1337/api/produits?${queryProds}`) 
    // Produits End

    // Exposants produits Begin
    const prods_exposants = []
    for (let produit of resProds.data.data){
        const queryExpProd = qs.stringify(
            {
                filters : {           
                    CLE_EXPOSANT: { $eq : produit["attributes"]["CLE_EXPOSANT"] } ,          
                }
            },
            {
                encodeValuesOnly: true,
            }
        )
        const resExpProd = await axios.get(`http://localhost:1337/api/exposants?${queryExpProd}`)  
        prods_exposants.push({produit:produit, exposant:resExpProd.data.data[0]})
    }
    // Exposants produits End

    // Prix Produits Begin
    let tabPrix = ([...resProds.data.data].map(produit => produit["attributes"]['TARIF_PUB']) )
    let resPrix = []
    tabPrix.forEach(element => {
        if(element!="NULL"){
            let f = resPrix.find(e=>e.prix==element)
            if(f){
                f.count=f.count+1
            }else {
                resPrix.push({prix:element, count:1})
            }   
        }
    })
    // Prix Produits End 

    // Marques of univers Begin
    const marques = prods_exposants.map(e=>e.exposant)  
    // Marques of univers End

    // Designers Begin
    const designers = []
    resProds.data.data.forEach(e=>{
        if(!designers.find(element=>element["attributes"]["DESIGNER"]==e["attributes"]["DESIGNER"])){
            designers.push(e)
        }
    })
    // Designers End

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
    const styles = []
    resStyles.data.data.forEach(e=>{
        if(!styles.find(element=>element["attributes"]["CLE_STYLE"]==e["attributes"]["CLE_STYLE"])){
            styles.push(e)
        }
    })
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
    const couleurs = []
    resCouleurs.data.data.forEach(e=>{
        if(!couleurs.find(element=>element["attributes"]["CLE_COULEUR"]==e["attributes"]["CLE_COULEUR"])){
            couleurs.push(e)
        }
    })
    // Couleurs End

    // Materiaux Begin
    const keys_materiaux1 = resProds.data.data.map(e=>e["attributes"]["CLE_MATERIAU1"])
    const keys_materiaux2 = resProds.data.data.map(e=>e["attributes"]["CLE_MATERIAU2"])
    const keys_materiaux3 = resProds.data.data.map(e=>e["attributes"]["CLE_MATERIAU3"])
    const keys_materiaux = keys_materiaux1.concat(keys_materiaux2).concat(keys_materiaux3)
    const queryMateriaux= qs.stringify(
        {
            filters : {           
                CLE_MATERIAU: { $in : [...new Set(keys_materiaux)] } ,           
            }
        },
        {
            encodeValuesOnly: true,
        }
    )
    const resMateriaux = await axios.get(`http://localhost:1337/api/materiaus?${queryMateriaux}`)    
    const materiaux = []
    resMateriaux.data.data.forEach(e=>{
        if(!materiaux.find(element=>element["attributes"]["CLE_MATERIAU"]==e["attributes"]["CLE_MATERIAU"])){
            materiaux.push(e)
        }
    })
    // Materiaux End

    return {
        props: {
            superunivers_univers_categories : superunivers_univers,
            typeProd : resTypeprod.data.data,
            categorie : resCategory.data.data[0],
            univers : resUnivers.data.data[0],
            superunivers : resSuperunivers.data.data[0],
            autres_typeProds : resTypeprods.data.data.filter(e=>e["attributes"]['LIB_FR']!=resTypeprod.data.data["attributes"]['LIB_FR']),
            autres_exposants : marques,
            produits : resProds.data.data,
            prods_exposants : prods_exposants,
            produits_prix : resPrix,
            designers : designers,
            styles : styles,
            couleurs : couleurs,
            materiaux : materiaux
        }, 
    }
}

export default Slug
