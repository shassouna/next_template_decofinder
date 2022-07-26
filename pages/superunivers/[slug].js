import Layout from "../../components/layout/Layout";
import Breadcrumb2 from "../../components/layout/Breadcrumb2";
import SingleProduct from "../../components/ecommerce/SingleProduct";

// My imports 
import axios from 'axios'

const Slug = ({
    superunivers_univers_categories, 
    superunivers,
    univers_categories
            }) => {
    return (
        console.log(univers_categories),
        <Layout noBreadcrumb="d-none" superunivers_univers_categories={superunivers_univers_categories}>
            <Breadcrumb2 title="Superunivers" description={superunivers&&superunivers["attributes"]["DESCR"]} levels={[superunivers&&superunivers["attributes"]["LIB"]]}/>
            <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="row flex-row">
                            <div className="sidebar-widget widget-category-2 mb-30">
                                <h5 className="section-title style-1 mb-30">
                                    {superunivers && "Les univers de "+superunivers["attributes"]["LIB"]+" :"}
                                </h5>                                  
                            </div>
                            <div className="col-lg-4-5">
                                <div className="row product-grid-3">
                                    {univers_categories&&univers_categories.length === 0 && (
                                        <h3>Aucun univers_categories </h3>
                                    )}
                                    {univers_categories&&univers_categories.map((e, i) => (
                                        <div
                                        className="col-lg-1-5 col-md-4 col-12 col-sm-6"
                                        key={i}
                                        >
                                            <SingleProduct 
                                            univers={e["univers"]}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <br/>
                            </div>
                            {
                            univers_categories&&univers_categories.map(val=>(
                                <>
                                    <div className="sidebar-widget widget-category-2 mb-30">
                                        <h6 className="section-title style-1 mb-30 mt-50">
                                            {val["univers"] && val["univers"]["attributes"]["LIB"]}
                                        </h6>
                                        <h6>Les catégories :</h6>                                  
                                    </div>
                                    <div className="col-lg-4-5">
                                        <div className="row product-grid-3">
                                            {val&&val.length === 0 && (
                                                <h3>Aucune categorie </h3>
                                            )}
                                            {val["categories"]&&val["categories"].map((categorie, i) => (
                                                <div
                                                className="col-lg-1-5 col-md-4 col-12 col-sm-6"
                                                key={i}
                                                >
                                                    <SingleProduct 
                                                    typeproduit={categorie}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ))
                            }
                        </div>
                    </div>
            </section>
        </Layout>
    )
}

export default Slug

export async function getStaticPaths() {
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

    const paths = res.data.data.map(element=>{
        return {
            params:{slug : element["attributes"]["slug"]}
        }

    })
    return {
        paths:paths,
        fallback : false
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

   // Superunivers Begin
   const resSuperunivers = await axios.get(`http://localhost:1337/api/superuniversdetailss/${context.params.slug}`) 
   // Superunivers End

   // Univers Begin
   const superunivers = superunivers_univers.find(element=>element["superunivers"]["attributes"]["LIB"] == resSuperunivers.data.data["attributes"]["LIB"])
   // Univers End


   return {
        props: {
            superunivers_univers_categories : superunivers_univers,
            superunivers : resSuperunivers.data.data,
            univers_categories : superunivers["categories_univers"],
        }, 
   }
}
