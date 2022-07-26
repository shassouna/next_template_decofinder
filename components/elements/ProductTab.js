import React, { useState, useEffect } from "react";
import axios from 'axios'
import qs from 'qs'

// global functions 
function cleanHTML(str)
{
   if ((str===null) || (str===''))
   {
   return false;
   }
   else
   {
   str = str.toString();
   return str.replace(/<[^>]*>/g, '');
   }
}

const ProductTab = (props) => {

    const [activeIndex, setActiveIndex] = useState(1);

    const [colorProduct, setColorProduct] = useState()
    const [motifProduct, setMotifProduct] = useState()
    const [materiauxProduct, setMateriauProduct] = useState([])
    const [fabricationProduct, setFabricationProduct] = useState()
    const [styleProduct, setStyleProduct] = useState()
    const [ambianceProduct, setAmbianceProduct] = useState()

    const handleOnClick = (index) => {
        setActiveIndex(index);
    };

    async function handleGetProductColeur() {
        const query = qs.stringify(
            {
                filters: {
                            CLE_COULEUR : { $eq: props.produit['attributes']['CLE_COULEUR'] } 
                        }
            },
            {
                encodeValuesOnly: true,
            }
            )  
        const res = await axios.get(`http://localhost:1337/api/couleurs?${query}`)
        setColorProduct(res.data.data[0])
    }
    async function handleGetProductMotif() {
        const query = qs.stringify(
            {
                filters: {
                            CLE_MOTIF : { $eq: props.produit['attributes']['CLE_MOTIF'] } 
                        }
            },
            {
                encodeValuesOnly: true,
            }
            )  
        const res = await axios.get(`http://localhost:1337/api/motifs?${query}`)
        setMotifProduct(res.data.data[0])
    }
    async function handleGetProductMateriaux() {
        const query = qs.stringify(
            {
                filters: {
                    $or: [
                        { CLE_MATERIAU: { $eq: props.produit['attributes']['CLE_MATERIAU1']} },
                        { CLE_MATERIAU: { $eq: props.produit['attributes']['CLE_MATERIAU2']} },
                        { CLE_MATERIAU: { $eq: props.produit['attributes']['CLE_MATERIAU3'] } },
                      ],
                }
            },
            {
                encodeValuesOnly: true,
            }
            )  
        const res = await axios.get(`http://localhost:1337/api/materiaus?${query}`)
        setMateriauProduct(res.data.data)
    }
    async function handleGetProductFabrication() {
        const query = qs.stringify(
            {
                filters: {
                            CLE_FABRICATION : { $eq: props.produit['attributes']['CLE_FABRICATION'] } 
                        }
            },
            {
                encodeValuesOnly: true,
            }
            )  
        const res = await axios.get(`http://localhost:1337/api/fabrications?${query}`)
        console.log(res.data.data)
        setFabricationProduct(res.data.data[0])
    }
    async function handleGetProductStyle() {
        const query = qs.stringify(
            {
                filters: {
                            CLE_STYLE : { $eq: props.produit['attributes']['CLE_STYLE'] } 
                        }
            },
            {
                encodeValuesOnly: true,
            }
            )  
        const res = await axios.get(`http://localhost:1337/api/couleurs?${query}`)
        setStyleProduct(res.data.data[0])
    }
    async function handleGetProductAmbiance() {
        const query = qs.stringify(
            {
                filters: {
                            CLE_STYLE : { $eq: props.produit['attributes']['CLE_STYLE'] } 
                        }
            },
            {
                encodeValuesOnly: true,
            }
            )  
        const res = await axios.get(`http://localhost:1337/api/couleurs?${query}`)
        setAmbianceProduct(res.data.data[0])
    }

    useEffect( ()=>{
        handleGetProductColeur()
        handleGetProductMateriaux()
        handleGetProductMotif()
        handleGetProductFabrication()
        handleGetProductStyle()
        handleGetProductAmbiance()
    },[])

    return (
        <div className="product-info">
            <div className="tab-style3">
                <ul className="nav nav-tabs text-uppercase">
                    <li className="nav-item">
                        <a className={activeIndex === 1 ? "nav-link active" : "nav-link"} id="Description-tab" data-bs-toggle="tab" onClick={() => handleOnClick(1)}>
                            Description
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className={activeIndex === 2 ? "nav-link active" : "nav-link"} id="Additional-info-tab" data-bs-toggle="tab" onClick={() => handleOnClick(2)}>
                            Caractéristiques
                        </a>
                    </li>
                </ul>
                <div className="tab-content shop_info_tab entry-main-content">
                    <div className={activeIndex === 1 ? "tab-pane fade show active" : "tab-pane fade"} id="Description">
                        <div className="">
                            <p>{cleanHTML(props.produit['attributes']['DESC_FR'])}</p>
                        </div>
                    </div>
                     	

                    <div className={activeIndex === 2 ? "tab-pane fade show active" : "tab-pane fade"} id="Additional-info">
                        <table className="font-md">
                            <tbody>
                                {
                                props.produit['attributes']['MODELES']&&props.produit['attributes']['MODELES']!="NULL"&&
                                <tr className="stand-up">
                                    <th>Modèle</th>
                                    <td>
                                        <p>{props.produit['attributes']['MODELES']}</p>
                                    </td>
                                </tr>
                                }
                                {
                                props.produit['attributes']['COLLECTION']&&props.produit['attributes']['COLLECTION']!="NULL"&&
                                <tr className="stand-up">
                                    <th>Collection</th>
                                    <td>
                                        <p>{props.produit['attributes']['COLLECTION']}</p>
                                    </td>
                                </tr>
                                }
                                {
                                 props.pays['attributes']['LIB_FR']&&props.pays['attributes']['LIB_FR']!="NULL"&&
                                 <tr className="stand-up">
                                    <th>Origine</th>
                                    <td>
                                        <p>{props.pays['attributes']['LIB_FR']}</p>
                                    </td>
                                 </tr>   
                                }
                                {
                                props.produit['attributes']['REFERENCE_FABRICANT']&&props.produit['attributes']['REFERENCE_FABRICANT']!="NULL"&&
                                <tr className="folded-wo-wheels">
                                    <th>Ref.Fab</th>
                                    <td>
                                        <p>{props.produit['attributes']['REFERENCE_FABRICANT']}</p>
                                    </td>
                                </tr>
                                }
                                {
                                props.produit['attributes']['REFERENCE_FABRICANT']&&props.produit['attributes']['REFERENCE_FABRICANT']!="NULL"&&
                                <tr className="folded-wo-wheels">
                                    <th>Réf.Rev</th>
                                    <td>
                                        <p>{props.produit['attributes']['REFERENCE_FABRICANT']}</p>
                                    </td>
                                </tr>
                                }
                                {
                                props.produit['attributes']['EAN']&&props.produit['attributes']['EAN']!="NULL"&&
                                <tr className="folded-w-wheels">
                                    <th>EAN</th>
                                    <td>
                                        <p>{props.produit['attributes']['EAN']}</p>
                                    </td>
                                </tr>
                                }
                                {
                                props.produit['attributes']['DIMENSIONS']&&props.produit['attributes']['DIMENSIONS']!="NULL"&&
                                <tr className="door-pass-through">
                                    <th>Dimensions</th>
                                    <td>
                                        <p>{props.produit['attributes']['DIMENSIONS']}</p>
                                    </td>
                                </tr>
                                }
                                {
                                props.produit['attributes']['DIMENSIONS']&&props.produit['attributes']['DIMENSIONS']!="NULL"&&
                                <tr className="door-pass-through">
                                    <th>Année</th>
                                    <td>
                                        <p>{props.produit['attributes']['DIMENSIONS']}</p>
                                    </td>
                                </tr>
                                }
                                {props.produit['attributes']['DESIGNER']&&props.produit['attributes']['DESIGNER']!='NULL'&&
                                <tr className="door-pass-through">
                                    <th>Designer</th>
                                    <td>
                                        <p>{props.produit['attributes']['DESIGNER']}</p>
                                    </td>
                                </tr>
                                }
                                {colorProduct&&colorProduct['attributes']['LIB_FR']&&colorProduct['attributes']['LIB_FR']!="NULL"&&
                                <tr className="door-pass-through">
                                    <th>Couleur</th>
                                    <td>
                                        <p>{colorProduct['attributes']['LIB_FR']}</p>
                                    </td>
                                </tr>
                                }
                                {materiauxProduct[0]&&materiauxProduct[0]['attributes']['LIB_FR']&&materiauxProduct[0]['attributes']['LIB_FR']!="NULL"&&
                                <tr className="door-pass-through">
                                    <th>Mat. 1</th>
                                    <td>
                                        <p>{materiauxProduct[0]['attributes']['LIB_FR']}</p>
                                    </td>
                                </tr>
                                }
                                {materiauxProduct[1]&&materiauxProduct[1]['attributes']['LIB_FR']&&materiauxProduct[1]['attributes']['LIB_FR']!="NULL"&&
                                <tr className="door-pass-through">
                                    <th>Mat. 2</th>
                                    <td>
                                        <p>{materiauxProduct[1]['attributes']['LIB_FR']}</p>
                                    </td>
                                </tr>
                                }
                                {materiauxProduct[2]&&materiauxProduct[2]['attributes']['LIB_FR']&&materiauxProduct[2]['attributes']['LIB_FR']!="NULL"&&
                                <tr className="door-pass-through">
                                    <th>Mat. 3</th>
                                    <td>
                                        <p>{materiauxProduct[2]['attributes']['LIB_FR']}</p>
                                    </td>
                                </tr>
                                }
                                {motifProduct&&motifProduct['attributes']['LIB_FR']&&motifProduct['attributes']['LIB_FR']!="NULL"&&
                                <tr className="door-pass-through">
                                    <th>Motif</th>
                                    <td>
                                        <p>{motifProduct['attributes']['LIB_FR']}</p>
                                    </td>
                                </tr>
                                }
                                {fabricationProduct&&fabricationProduct['attributes']['LIB_FR']&&fabricationProduct['attributes']['LIB_FR']!="NULL"&&
                                <tr className="door-pass-through">
                                    <th>Fabrication</th>
                                    <td>
                                        <p>{fabricationProduct['attributes']['LIB_FR']}</p>
                                    </td>
                                </tr>
                                }
                                {styleProduct&&styleProduct['attributes']['LIB_FR']&&styleProduct['attributes']['LIB_FR']!="NULL"&&
                                <tr className="door-pass-through">
                                    <th>Style</th>
                                    <td>
                                        <p>{styleProduct['attributes']['LIB_FR']}</p>
                                    </td>
                                </tr>
                                }
                                {props.produit['attributes']['DESIGNER']&&props.produit['attributes']['DESIGNER']!="NULL"&&
                                <tr className="door-pass-through">
                                    <th>Marque</th>
                                    <td>
                                        <p>{props.produit['attributes']['DESIGNER']}</p>
                                    </td>
                                </tr>
                                }
                                {ambianceProduct&&styleProduct['attributes']['LIB_FR']&&ambianceProduct['attributes']['LIB_FR']!="NULL"&&
                                <tr className="door-pass-through">
                                    <th>Ambiance</th>
                                    <td>
                                        <p>{styleProduct['attributes']['LIB_FR']}</p>
                                    </td>
                                </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductTab;
