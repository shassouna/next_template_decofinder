import { useRouter } from "next/router";
import { connect } from "react-redux";
import { updateProductCategory } from "../../../redux/action/productFiltersAction";

// My imports
import Link from "next/link"

const CategoryProduct = ({ 
    updateProductCategory, 
    autres_categories, 
    typeprods, 
    autres_exposants, 
    produits_prix, 
    produits_designers, 
    produits_styles, 
    produits_couleurs, 
    produits_materiaux,
    autres_univers }) => {
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
            produits_prix&&produits_prix.map(val=>(
                <li>
                    <a>
                        {val.prix}
                    </a>    
                    <span className="count">{val.count}</span>
                </li>                
            ))
            } 
            {
            produits_designers&&produits_designers.map(val=>(
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
            {
            produits_materiaux&&produits_materiaux.map(val=>(
                val['attributes']['LIB_FR']!= "NULL" && val['attributes']['LIB_FR'].length>1&&
                <li>
                <a>
                {val['attributes']['LIB_FR']}
                </a>    
                </li>             
            ))
            }   
            {
            autres_univers&&autres_univers.map(val=>(
                <li>
                    <Link href={`http://localhost:3000/univers/${val['attributes']['slug']}`}>
                    <a>
                        {val["attributes"]["LIB"]}
                    </a>    
                    </Link>
                    <span className="count">{/*30*/}</span>
                </li>                
            ))
            } 
            </ul>
        </>
    );
};

export default connect(null, { updateProductCategory })(CategoryProduct);
