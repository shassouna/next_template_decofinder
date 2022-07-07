import Link from "next/link";
import React, {useState} from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/action/cart";
import { addToCompare } from "../../redux/action/compareAction";
import { openQuickView } from "../../redux/action/quickViewAction";
import { addToWishlist } from "../../redux/action/wishlistAction";

const SingleProduct = ({
    produit,
    exposant,
    typeproduit,
    product,
    addToCart,
    addToCompare,
    addToWishlist,
    openQuickView,
}) => {
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
    console.log(produit)

    return (
        <>
        {   // case produit
            produit && exposant && 
                <div className="product-cart-wrap mb-30" onMouseOver={handleShowDescription} onMouseLeave={handleHideDescription}>
                    <div className="product-img-action-wrap">
                        <div className="product-img product-img-zoom">
                            <Link
                                href="/products/[slug]"
                                as={`/products/${product.slug}`}
                            >
                                <a>
                                    <img
                                        className="default-img"
                                        src={product.images[0].img}
                                        alt=""
                                    />
                                    <img
                                        className="hover-img"
                                        src={product.images[1].img}
                                        alt=""
                                    />
                                </a>
                            </Link>
                        </div>
                        <div className="product-action-1">
                            <a
                                aria-label="Quick view"
                                className="action-btn hover-up"
                                data-bs-toggle="modal"
                                onClick={(e) => openQuickView(product)}
                            >
                                <i className="fi-rs-eye"></i>
                            </a>
                            <a
                                aria-label="Add To Wishlist"
                                className="action-btn hover-up"
                                onClick={(e) => handleWishlist(product)}
                            >
                                <i className="fi-rs-heart"></i>
                            </a>
                            <a
                                aria-label="Compare"
                                className="action-btn hover-up"
                                onClick={(e) => handleCompare(product)}
                            >
                                <i className="fi-rs-shuffle"></i>
                            </a>
                        </div>

                        <div className="product-badges product-badges-position product-badges-mrg">
                            {product.trendiuit&& <span className="hot">Hot</span>}
                            {product.creatuit&& <span className="new">New</span>}
                            {product.totalSell > 100 && (
                                <span className="best">Best Sell</span>
                            )}
                            {product.discount.isActive && (
                                <span className="sale">Sale</span>
                            )}
                            {product.discount.percentage >= 5 && (
                                <span className="hot">
                                    {product.discount.percentage}%
                                </span>
                            )}
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
                                href="/products/[slug]"
                                as={`/products/${product.slug}`}
                            >
                                <a>{produit['attributes']['TITRE_FR']}</a>
                            </Link>
                        </h2>
                        {showProductDescription &&
                            <div style={{visibilty:"hidden"}}>
                                <span className="font-small text-muted">
                                    {produit['attributes']['DESC_FR'].split(" ").slice(0,12).join(" ")+" ...."}
                                </span>
                            </div>
                        }
                        <div className="product-card-bottom">
                            <div className="product-price">
                                <span>{produit['attributes']['TARIF_PUB']+" €"} </span>
                            </div>
                            <div className="add-cart">
                                <a
                                    className="add"
                                    onClick={(e) => handleCart(product)}
                                >
                                    <i className="fi-rs-shopping-cart mr-5"></i> Add
                                </a>
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
                                as={`/products/${product.slug}`}
                            >
                                <a>
                                    <img
                                        className="default-img"
                                        src={product.images[0].img}
                                        alt=""
                                    />
                                    <img
                                        className="hover-img"
                                        src={product.images[1].img}
                                        alt=""
                                    />
                                </a>
                            </Link>
                        </div>
                        <div className="product-action-1">
                            <a
                                aria-label="Quick view"
                                className="action-btn hover-up"
                                data-bs-toggle="modal"
                                onClick={(e) => openQuickView(product)}
                            >
                                <i className="fi-rs-eye"></i>
                            </a>
                            <a
                                aria-label="Add To Wishlist"
                                className="action-btn hover-up"
                                onClick={(e) => handleWishlist(product)}
                            >
                                <i className="fi-rs-heart"></i>
                            </a>
                            <a
                                aria-label="Compare"
                                className="action-btn hover-up"
                                onClick={(e) => handleCompare(product)}
                            >
                                <i className="fi-rs-shuffle"></i>
                            </a>
                        </div>

                        <div className="product-badges product-badges-position product-badges-mrg">
                            {product.trendiuit&& <span className="hot">Hot</span>}
                            {product.creatuit&& <span className="new">New</span>}
                            {product.totalSell > 100 && (
                                <span className="best">Best Sell</span>
                            )}
                            {product.discount.isActive && (
                                <span className="sale">Sale</span>
                            )}
                            {product.discount.percentage >= 5 && (
                                <span className="hot">
                                    {product.discount.percentage}%
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="product-content-wrap">
                        <h2>
                            <Link
                                href="/products/[slug]"
                                as={`/products/${product.slug}`}
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
