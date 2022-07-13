import Link from "next/link";
import React, {useState} from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/action/cart";
import { addToCompare } from "../../redux/action/compareAction";
import { openQuickView } from "../../redux/action/quickViewAction";
import { addToWishlist } from "../../redux/action/wishlistAction";

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

const SingleProduct = ({
    produit,
    exposant,
    selection,
    typeproduit,
    addToCart,
    addToCompare,
    addToWishlist,
    openQuickView,
}) => {

    console.log(selection)

    const handleCart = (product) => {
        addToCart(product);
        toast("Product added to Cart !");
    };

    const handleCompare = (product) => {
        addToCompare(product);
        toast("Added to Compare list !");
    };

    const handleWishlist = (product) => {
        addToWishlist(product);
        toast("Added to Wishlist !");
    };

    // Handle show description of product
    const handleShowDescription = () => {
        setShowProductDescription(true)
    }
    const handleHideDescription = () => {
        setShowProductDescription(false)
    }

    const [showProductDescription, setShowProductDescription] = useState(false)

    return (
        <>
        {   // case produit
            produit && exposant && 
                <div className="product-cart-wrap mb-30" onMouseOver={handleShowDescription} onMouseLeave={handleHideDescription}>
                    <div className="product-img-action-wrap">
                        <div className="product-img product-img-zoom">
                            <Link
                                href={`/products/${produit["attributes"]["slug"]}`}
                                as={`/products/${produit["attributes"]["slug"]}`}
                            >
                                <a>
                                    <img
                                        className="default-img"
                                        src={"/assets/imgs/shop/product-1-1.jpg"}
                                        alt=""
                                    />
                                    <img
                                        className="hover-img"
                                        src={"/assets/imgs/shop/product-1-1.jpg"}
                                        alt=""
                                    />
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="product-content-wrap">
                        <div className="product-category">
                            <Link href="/products">
                                <a>{exposant['attributes']['NOM']}</a>
                            </Link>
                        </div>
                        <h2>
                            <Link
                                href={`/products/${produit["attributes"]["slug"]}`}
                                as={`/products/${produit["attributes"]["slug"]}`}
                            >
                                <a>{produit['attributes']['TITRE_FR']}</a>
                            </Link>
                        </h2>
                        {showProductDescription &&
                            <div style={{visibilty:"hidden"}}>
                                <span className="font-small text-muted">
                                    {cleanHTML(produit['attributes']['DESC_FR']).split(" ").slice(0,12).join(" ")+" ...."}
                                </span>
                            </div>
                        }
                        <div className="product-card-bottom">
                            <div className="product-price">
                                <span>{produit['attributes']['TARIF_PUB']+" €"} </span>
                            </div>
                            <div className="add-cart">
                                <i className="fi-rs-heart fa-6"></i>
                            </div>
                        </div>
                    </div>
                </div>
        }

        {   // case type produit
            typeproduit && 
                <div className="product-cart-wrap mb-30" onMouseOver={handleShowDescription} onMouseLeave={handleHideDescription}>
                    <div className="product-img-action-wrap">
                        <div className="product-img product-img-zoom">
                            <Link
                                href="/products/[slug]"
                                as={`/products/${"product.slug"}`}
                            >
                                <a>
                                    <img
                                        className="default-img"
                                        src={"/assets/imgs/shop/product-1-1.jpg"}
                                        alt=""
                                    />
                                    <img
                                        className="hover-img"
                                        src={"/assets/imgs/shop/product-1-1.jpg"}
                                        alt=""
                                    />
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="product-content-wrap">
                        <h2>
                            <Link
                                href="/products/[slug]"
                                as={`/products/${"product.slug"}`}
                            >
                                <a>{typeproduit['attributes']['LIB_FR']}</a>
                            </Link>
                        </h2>
                        <div className="product-card-bottom">
                            <div className="add-cart">
                                <a className="add">
                                    <i className="fi-rs-shopping-cart mr-5"></i> Tous les produits
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
        }

        {   // case selection FourProducts
            selection && 
                <div className="product-cart-wrap mb-30" onMouseOver={handleShowDescription} onMouseLeave={handleHideDescription}>
                    <div className="product-img-action-wrap">
                        <div className="product-img product-img-zoom">
                            <Link
                                href="/products/[slug]"
                                as={`/products/${"product.slug"}`}
                            >
                                <a>
                                    <img
                                        className="default-img"
                                        src={"/assets/imgs/shop/product-1-1.jpg"}
                                        alt=""
                                    />
                                    <img
                                        className="hover-img"
                                        src={"/assets/imgs/shop/product-1-1.jpg"}
                                        alt=""
                                    />
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="product-content-wrap">
                    <div className="product-category">
                            <Link href="/products">
                                <a>{selection.exposant['attributes']['NOM']}</a>
                            </Link>
                    </div>
                    <h2>
                            <Link
                                href="/products/[slug]"
                                as={`/products/${"product.slug"}`}
                            >
                                <a>{selection.produit["attributes"]["TITRE_FR"]!="NULL"?selection.produit["attributes"]["TITRE_FR"]:selection.produit["attributes"]["MODELES"]}</a>
                            </Link>
                        </h2>
                        <div className="product-card-bottom">
                            <div className="product-category">
                                <Link href="/products">
                                    <a>{selection.typeprod['attributes']['LIB_FR']}</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
        }
        </>
    );
};

const mapDispatchToProps = {
    addToCart,
    addToCompare,
    addToWishlist,
    openQuickView,
};

export default connect(null, mapDispatchToProps)(SingleProduct);
