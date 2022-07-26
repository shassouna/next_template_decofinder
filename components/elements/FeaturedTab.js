
import SingleProduct from "../ecommerce/SingleProduct";

const FeaturedTab = (props) => {
    return (
        <>
                {props.produits&&props.produits.map((produit, i) => (
                    <div className="col-lg-1-5 col-md-4 col-12 col-sm-6" key={i}>
                        <SingleProduct
                        produit={produit}
                        exposant={props.exposant}
                        />
                        </div>
                ))}
                {props.autres_typeprods&&props.autres_typeprods.map((typeproduit, i) => (
                    <div className="col-lg-1-5 col-md-4 col-12 col-sm-6" key={i}>
                        <SingleProduct 
                        typeproduit={typeproduit}
                        exposant={props.exposant}
                        />
                        </div>
                ))}
                {props.selections&&props.selections.map((selection, i) => (
                    <div className="col-lg-1-5 col-md-4 col-12 col-sm-6" key={i}>
                        <SingleProduct 
                        selection={selection}
                        />
                        </div>
                ))}
                {props.inspirations&&props.inspirations.map((inspiration, i) => (
                    <div className="col-lg-1-5 col-md-4 col-12 col-sm-6" key={i}>
                        <SingleProduct 
                        inspiration={inspiration}
                        />
                        </div>
                ))}
                {props.nouveautes&&props.nouveautes.map((nouveaute, i) => (
                    <div className="col-lg-1-5 col-md-4 col-12 col-sm-6" key={i}>
                        <SingleProduct 
                        nouveaute={nouveaute}
                        />
                        </div>
                ))}
        </>
    );
};

export default FeaturedTab;
