import React from "react";
import ProductDetails from "../../components/ecommerce/ProductDetails";
import Layout from '../../components/layout/Layout';

// My imports
import axios from 'axios'
import { useRouter } from 'next/router'

const ProductId = (props) => {

    const router = useRouter()

    if(router.isFallback){
        return <h1>Patientez un instant ... </h1>
    }

    return (
        <>
         {<Layout parent="Home" sub="Shop" subChild={props.produit['attributes']['TITRE_FR']}
         superunivers_univers_categories = {props.superunivers_univers_categories}>
            <div className="container">
                <ProductDetails 
                produit={props.produit} 
                exposant={props.exposant} 
                pays={props.pays}
                autres_produits_exposant_typeprod={props.autres_produits_exposant_typeprod}
                typeprod={props.typeprod}
                autres_produits_exposant={props.autres_produits_exposant}
                autres_produits_typeprod={props.autres_produits_typeprod}
                autres_typeprods={props.autres_typeprods}
                revendeurs={props.revendeurs}
                />
            </div>
         </Layout>}
        </>
    );
};

export async function getStaticPaths() {

    const paths = []

    return {
        paths:paths,
        fallback : true
    }
}

export async function getStaticProps (context) {

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
    const resSuperUnivers = await axios.get(`http://localhost:1337/api/superuniversdetailss?${querySuperUnivers}`)
    // SuperUnivers end

    
    // For each superunivers begin
    const superunivers_univers = []
    for (let superunivers of resSuperUnivers.data.data) {

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


    const res = await axios.get(`http://localhost:1337/api/produits/pismo-427641`)

    const query = qs.stringify(
        {
            filters: {
                CLE_PAYS: { $eq: res.data.data["attributes"]["CLE_PAYS"] } 
            }
        },
        {
            encodeValuesOnly: true,
        }
        )   
    const res2 = await axios.get(`http://localhost:1337/api/payss?${query}`)

    const query2 = qs.stringify(
        {
            filters: {
                CLE_TYPE_PROD: { $eq: res.data.data["attributes"]["CLE_TYPE_PROD"] } 
            }
        },
        {
            encodeValuesOnly: true,
        }
        )
    const res3 = await axios.get(`http://localhost:1337/api/typeprods?${query2}`)

    const query3 = qs.stringify(
        {
            filters: 
            {
                CLE_EXPOSANT: { $eq: res.data.data["attributes"]["CLE_EXPOSANT"] } 
            }
        },
        {
            encodeValuesOnly: true,
        }
        )
    const res4 = await axios.get(`http://localhost:1337/api/exposants?${query3}`)

    const query4 = qs.stringify(
        {
            filters: {
                $and: [
                    {
                        CLE_EXPOSANT: { $eq: res.data.data["attributes"]["CLE_EXPOSANT"] } 
                    },
                    {
                        CLE_TYPE_PROD: { $eq: res.data.data["attributes"]["CLE_TYPE_PROD"] } 
                    } 
                ]
            }
   
        },
        {
            encodeValuesOnly: true,
        }
        )
    const res5 = await axios.get(`http://localhost:1337/api/produits?${query4}`)

    const query5 = qs.stringify(
        {
            filters: {
                        CLE_EXPOSANT: { $eq: res.data.data["attributes"]["CLE_EXPOSANT"] } 
                    }
        },
        {
            encodeValuesOnly: true,
        }
        )    
    const res6 = await axios.get(`http://localhost:1337/api/produits?${query5}`)

    const query6 = qs.stringify(
        {
            filters: {
                        CLE_TYPE_PROD: { $eq: res.data.data["attributes"]["CLE_TYPE_PROD"] } 
                    }
        },
        {
            encodeValuesOnly: true,
        }
        )    
    const res7 = await axios.get(`http://localhost:1337/api/produits?${query6}`)

    const query7 = qs.stringify(
        {
            filters: {
                        CLE_RAYON: { $eq: res.data.data["attributes"]["CLE_RAYON"] } 
                    }
        },
        {
            encodeValuesOnly: true,
        }
        )    
    const res8 = await axios.get(`http://localhost:1337/api/typeprods?${query7}`)

    const query8 = qs.stringify(
        {
            filters: {
                        NUMERO: 1279790
                    }
        },
        {
            encodeValuesOnly: true,
        }
        ) 
        
    const revendeurs = []
    const res9 = await axios.get(`http://localhost:1337/api/lienrevendeurproduits?${query8}`)

    for (let lien_revendeur_produit of res9.data.data) {
        const query = qs.stringify(
            {
                filters: 
                {
                    CLE_EXPOSANT: { $eq: lien_revendeur_produit["attributes"]["CLE_EXPOSANT_REVENDEUR"] } 
                }
            },
            {
                encodeValuesOnly: true,
            }
        )
        const res = await axios.get(`http://localhost:1337/api/exposants?${query}`)
        revendeurs.push({exposant:res.data.data[0], lien_revendeur_produit:lien_revendeur_produit})
    }
   

    return {
        props: {
            produit : res.data.data,
            pays : res2.data.data[0],
            typeprod : res3.data.data[0],
            exposant : res4.data.data[0],
            autres_produits_exposant_typeprod : res5.data.data,
            autres_produits_exposant : res6.data.data,
            autres_produits_typeprod : res7.data.data,
            autres_typeprods : res8.data.data,
            revendeurs : revendeurs,
            superunivers_univers_categories : superunivers_univers,
        }, 
      }
};


export default ProductId;
