import { useRouter } from "next/router";
import { connect } from "react-redux";
import { updateProductCategory } from "../../../redux/action/productFiltersAction";

// My imports
import Link from "next/link"
import {useEffect, useState} from "react"

const CategoryProduct = ({ updateProductCategory, autres_categories, typeprods, autres_exposants, produits_prix, produits_designers, produits_styles, produits_couleurs }) => {
    const router = useRouter();

    const selectCategory = (e, category) => {
        e.preventDefault();
        // removeSearchTerm();
        updateProductCategory(category);
        router.push({
            pathname: "/products",
            query: {
                cat: category, //
            },
        });
    };

    const [produitsPrix, setProduitPrix] = useState ([])
    const [produitsDesigners, setProduitsDesigners] = useState([])

    useEffect(()=>{
        if(produits_prix){
            let tab = ([...produits_prix].map(produit => produit["attributes"]['TARIF_PUB']) )
            let res = []
            tab.forEach(element => {
                if(element!="NULL"){
                    let f = res.find(e=>e.prix==element)
                    if(f){
                        f.count=f.count+1
                    }else {
                        res.push({prix:element, count:1})
                    }   
                }
            })
            setProduitPrix ([...res])
        }
        const res2 = []
        if(produits_designers){
            produits_designers.forEach(e=>{
                if(!res2.find(element=>element["attributes"]["DESIGNER"]==e["attributes"]["DESIGNER"])){
                    res2.push(e)
                }
            })
            setProduitsDesigners([...res2])
        }
    },[])
    return (
        <>
            <ul>
            {
            autres_categories&&autres_categories.map(val=>(
                <li>
                    <Link href={`http://localhost:3000/categories/${val['attributes']['slug']}`}>
                    <a>
                        {val["attributes"]["LIB_FR"]}
                    </a>    
                    </Link>
                    <span className="count">{/*30*/}</span>
                </li>                
            ))
            } 
            {
            typeprods&&typeprods.map(val=>(
                <li>
                    <Link href={`http://localhost:3000/type-produits/${val['attributes']['slug']}`}>
                    <a>
                        {val['attributes']['LIB_FR']}
                    </a>    
                    </Link>
                    <span className="count">{/*30*/}</span>
                </li>                
            ))
            }    
            {
            autres_exposants&&autres_exposants.map(val=>(
                <li>
                    <Link href={`http://localhost:3000/exposants/${val['attributes']['slug']}`}>
                    <a>
                        {val['attributes']['NOM']}
                    </a>    
                    </Link>
                </li>                
            ))
            }    
            {
            produitsPrix&&produitsPrix.map(val=>(
                <li>
                    <a>
                        {val.prix}
                    </a>    
                    <span className="count">{val.count}</span>
                </li>                
            ))
            } 
            {
            produitsDesigners&&produitsDesigners.map(val=>(
                val['attributes']['DESIGNER']!= "NULL" && val['attributes']['DESIGNER'].length>1&&
                <li>
                <a>
                {val['attributes']['DESIGNER']}
                </a>    
                </li>              
            ))
            }  
            {
            produits_styles&&produits_styles.map(val=>(
                val['attributes']['LIB_FR']!= "NULL" && val['attributes']['LIB_FR'].length>1&&
                <li>
                <a>
                {val['attributes']['LIB_FR']}
                </a>    
                </li>              
            ))
            }       
            {
            produits_couleurs&&produits_couleurs.map(val=>(
                val['attributes']['LIB_FR']!= "NULL" && val['attributes']['LIB_FR'].length>1&&
                <li>
                <a>
                {val['attributes']['LIB_FR']}
                </a>    
                </li>              
            ))
            }    
            </ul>
        </>
    );
};

export default connect(null, { updateProductCategory })(CategoryProduct);
