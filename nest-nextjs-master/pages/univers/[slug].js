import Layout from "../../components/layout/Layout";
import Breadcrumb2 from "../../components/layout/Breadcrumb2";
import CategoryProduct from "../../components/ecommerce/Filter/CategoryProduct";
import SingleProduct from "../../components/ecommerce/SingleProduct";
// My Imports
import axios from 'axios' 
const Slug = ({
               superunivers_univers_categories, 
               univers, 
               categories, 
               autres_univers, 
               marques, 
               superunivers, 
               prix, 
               designers,
               styles,
               couleurs,
               materiaux,
               motifs
            }) => {

    return (
            <Layout noBreadcrumb="d-none" superunivers_univers_categories={superunivers_univers_categories}>
                <Breadcrumb2 title="Univers" description={univers&&univers["attributes"]["DOSSIER_TEXTE"]} levels={[univers&&univers["attributes"]["LIB"]]}/>
                <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="row flex-row">
                            <div className="col-lg-1-5 primary-sidebar sticky-sidebar">
                                <div className="sidebar-widget widget-category-2 mb-30">
                                    <h5 className="section-title style-1 mb-30">
                                        Dans l'univers : {univers&&univers["attributes"]["LIB"]}
                                    </h5>
                                    <div className="scroll"><CategoryProduct typeprods={categories}/></div>
                                </div>
                                <div className="sidebar-widget widget-category-2 mb-30">
                                    <h5 className="section-title style-1 mb-30">
                                        {univers&&"A voir aussi dans "+superunivers["attributes"]["LIB"]}
                                    </h5>
                                    <div className="scroll"><CategoryProduct autres_univers={autres_univers}/></div>
                                </div>
                                <div className="sidebar-widget widget-category-2 mb-30">
                                    <h5 className="section-title style-1 mb-30">
                                        Marques
                                    </h5>
                                    <div className="scroll"><CategoryProduct autres_exposants={marques}/></div>
                                </div>
                                <div className="sidebar-widget widget-category-2 mb-30">
                                <h5 className="section-title style-1 mb-30">
                                        Prix
                                    </h5>
                                    <div className="scroll"><CategoryProduct produits_prix={prix}/></div>
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
                                        Motif
                                    </h5>
                                    <div className="scroll"><CategoryProduct produits_motifs={motifs}/></div>
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
                                        <p>Dans cet univers</p>
                                    </div>
                                </div>
                                <div className="row product-grid-3">
                                    {categories&&categories.length === 0 && (
                                        <h3>Aucune catégorie </h3>
                                    )}
                                    {categories&&categories.map((typeproduit, i) => (
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
                                <br/>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
    )
}

export default Slug

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

   // Univers Begin
    const resUnivers = await axios.get(`http://localhost:1337/api/rayondetails/${context.params.slug}`) 
   // Univers End

   // categories Begin
   let i=0
   let categories = []
   let finduivers = false
   while (finduivers == false && i <  superunivers_univers.length){
    superunivers_univers[i]["categories_univers"].forEach(element=>{
        if(element["univers"]["attributes"]["LIB"] == resUnivers.data.data["attributes"]["LIB"]){
            categories = element["categories"]
            finduivers = true
        }
    })
    i=i+1
   }
   // categories End

   // autres_univers Begin
   let autres_univers = superunivers_univers[i-1]["categories_univers"].map(e=>e["univers"])
   // autres_univers End

   // superunivers Begin
   let superunivers = superunivers_univers[i-1]["superunivers"]
   // superunivers End

    // Marques of univers Begin
    const queryMarques = qs.stringify(
        {
            filters : {           
                CLE_RAYON_PRINCIPAL: { $eq : resUnivers.data.data["attributes"]["CLE_RAYON"] } ,           
            }
        },
        {
            encodeValuesOnly: true,
        }
    )
    const resMarques = await axios.get(`http://localhost:1337/api/exposants?${queryMarques}`) 
    // Marques of univers End

    // Produits univers Begin
    // Typeprods Begin
    let keys_categories = categories.map(categorie=>categorie["attributes"]["CLE_TYPE_PROD"])
    const queryTypeprods = qs.stringify(
        {
            filters : {           
                CLE_TYPE_PROD_CATEGORIE: { $in: keys_categories } ,           
            }
        },
        {
            encodeValuesOnly: true,
        }
    )
    const resTypeprods = await axios.get(`http://localhost:1337/api/typeprods?${queryTypeprods}`)  
    // Typeprods End

    let keys_typesproduits = resTypeprods.data.data.map(typeprod=>typeprod["attributes"]["CLE_TYPE_PROD"])

    const queryProds = qs.stringify(
        {
            filters : {           
                CLE_TYPE_PROD: { $in : keys_typesproduits.slice(0, 10) } ,          
            }
        },
        {
            encodeValuesOnly: true,
        }
    )
    const resProds = await axios.get(`http://localhost:1337/api/produits?${queryProds}`)
    // Produits univers End

    // Prix Begin
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
    // Prix End

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

    // Mautifs Begin
    const keys_motifs = resProds.data.data.map(e=>e["attributes"]["CLE_MOTIF"])

    const queryMotifs= qs.stringify(
        {
            filters : {           
                CLE_MOTIF: { $in : [...new Set(keys_motifs)] } ,           
            }
        },
        {
            encodeValuesOnly: true,
        }
    )
    const resMotifs = await axios.get(`http://localhost:1337/api/motifs?${queryMotifs}`)    
    const motifs = []
    resMotifs.data.data.forEach(e=>{
        if(!motifs.find(element=>element["attributes"]["CLE_MOTIF"]==e["attributes"]["CLE_MOTIF"])){
            motifs.push(e)
        }
    })
    // Mautifs End

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
            univers : resUnivers.data.data,
            categories : categories,
            autres_univers : autres_univers,
            marques : resMarques.data.data,
            superunivers : superunivers,
            prix : resPrix,
            designers : designers,
            styles : styles,
            couleurs : couleurs,
            materiaux : materiaux,
            motifs : motifs
        }, 
    }
}
