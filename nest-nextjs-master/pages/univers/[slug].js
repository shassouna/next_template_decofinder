import Layout from "../../components/layout/Layout";
import Breadcrumb2 from "../../components/layout/Breadcrumb2";
import CategoryProduct from "../../components/ecommerce/Filter/CategoryProduct";
import SingleProduct from "../../components/ecommerce/SingleProduct";
// My Imports
import axios from 'axios' 
const Slug = ({superunivers_univers_categories, univers, categories, autres_univers, marques, superunivers}) => {
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
                CLE_TYPE_PROD: { $in : keys_typesproduits } ,          
                TITRE_FR: { $ne : "NULL" } ,
                TARIF_PUB: { $ne : "NULL" }
            }
        },
        {
            encodeValuesOnly: true,
        }
    )
    const resProds = await axios.get(`http://localhost:1337/api/produits?${queryProds}`) 
    console.log(resProds.data.data)
    // Produits univers End

    // Prix Begin
    /*let tabPrix = ([...resProds.data.data].map(produit => produit["attributes"]['TARIF_PUB']) )
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
    })*/
    // Prix End

   return {
        props: {
            superunivers_univers_categories : superunivers_univers,
            univers : resUnivers.data.data,
            categories : categories,
            autres_univers : autres_univers,
            marques : resMarques.data.data,
            superunivers : superunivers
        }, 
    }
}
