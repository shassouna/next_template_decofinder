import React from "react";
import ProductDetails from "../../components/ecommerce/ProductDetails";
import Layout from '../../components/layout/Layout';
import { server } from "../../config/index";
import { findProductIndex } from "../../util/util";


import axios from 'axios'

const ProductId = (props) => {
    return (
        <>
         {<Layout parent="Home" sub="Shop" subChild={props.produit['attributes']['TITRE_FR']}>
            <div className="container">
                <ProductDetails product={props.product} produit={props.produit} exposant={props.exposant} pays={props.pays}/>
            </div>
         </Layout>}
        </>
    );
};



    export async function getServerSideProps (params) {
    
    /*const request = await fetch(`${server}/static/product.json`);
    const data = await request.json();

    const index = findProductIndex(data, params.query.slug);
    // console.log(params);

    return { product: data[index] };*/
    const qs = require("qs")

    const res = await axios.get(`http://localhost:1337/api/produits/bote-couvert-th-style-ancienne-bote-couvert-en-bois-tiroir-40-cm-353873`)

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

    
    const request = await fetch(`${server}/static/product.json`);
    const data = await request.json();

    const index = findProductIndex(data, params.query.slug);

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
            product: data[index]
        }, 
      }
};


export default ProductId;
