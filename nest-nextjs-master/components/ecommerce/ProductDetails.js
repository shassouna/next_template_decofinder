import { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
    addToCart,
    decreaseQuantity,
    increaseQuantity
} from "../../redux/action/cart";
import { addToCompare } from "../../redux/action/compareAction";
import { addToWishlist } from "../../redux/action/wishlistAction";
import ProductTab from "../elements/ProductTab";
import RelatedSlider from "../sliders/Related";
import ThumbSlider from "../sliders/Thumb";

// My Imports
import Image from 'next/image'

const ProductDetails = ({
    produit,
    exposant,
    pays,
    product,
    cartItems,
    addToCompare,
    addToCart,
    addToWishlist,
    increaseQuantity,
    decreaseQuantity,
    quickView,
}) => {
    const [quantity, setQuantity] = useState(1);
    

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

    const inCart = cartItems.find((cartItem) => cartItem.id === product.id);

    console.log(inCart);
    console.log(product)
    console.log(produit.attributes)    

    return (
        <>
            <section className="mt-50 mb-50">
                <div className="container">
                    <div className="row flex-row-reverse">
                        <div className="col-xl-10 col-lg-12 m-auto">
                            <div className="product-detail accordion-detail">
                                <div className="row mb-50  mt-30">
                                    <div className="col-md-6 col-sm-12 col-xs-12 mb-md-0 mb-sm-5">
                                        <div className="detail-gallery">
                                            <span className="zoom-icon">
                                                <i className="fi-rs-search"></i>
                                            </span>
                                            <div className="product-image-slider">
                                                <ThumbSlider product={product} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-xs-12" style={{backgroundColor:"#FAFAFB"}}>
                                        <div className="detail-info  pr-30 pl-30">
                                            <div className="detail-info-header">
                                                <Image
                                                style={{backgroundColor:"red", borderRadius:"2.5px"}}
                                                src="/assets/imgs/theme/icons/icon-youtube-white.svg"
                                                width={160}
                                                height={130}>
                                                </Image>
                                                <button className="detail-info-header-button">Suivre</button>
                                            </div>
                                            <h2 className="title-detail">{produit['attributes']['TITRE_FR']}</h2>
                                            <div className="product-detail-rating">
                                                <div className="product-rate-cover text-end">
                                                    <div className="product-rate d-inline-block">
                                                        <div className="product-rating" style={{ width: "90%" }}></div>
                                                    </div>
                                                    <span className="font-small ml-5 text-muted"> (32 reviews)</span>
                                                </div>
                                            </div>
                                            <div className="clearfix product-price-cover">
                                                <div className="product-price primary-color float-left">
                                                    <span className="current-price  text-brand">{produit['attributes']['TARIF_PUB']+" €"}</span>
                                                    <span>
                                                        <span className="save-price font-md color3 ml-15">{product.discount.percentage}% Off</span>
                                                        <span className="old-price font-md ml-15">{product.oldPrice ? `$ ${product.oldPrice}` : null}</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="bt-1 border-color-1 mt-30 mb-30"></div>
                                            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', marginRight:"10px", marginLeft:"10px"}}>
                                                <button className="button button-add-to-cart"><i className="fi-rs-shopping-cart mr-5"></i>SITE WEB</button>
                                                <button className="button button-add-to-cart"><i className="fi-rs-shopping-cart mr-5"></i>QUESTION / DEVIS</button>
                                                <button className="button button-add-to-cart"><i className="fi-rs-shopping-cart mr-5"></i>POINTS DE VENTE</button>
                                                <button className="button button-add-to-cart"><i className="fi-rs-shopping-cart mr-5"></i>METTRE EN FAVORIS</button>
                                            </div>
                                            <div className="mobile-social-icon">
                                                <a href="#">
                                                    <Image
                                                        src="/assets/imgs/theme/icons/icon-facebook-white.svg"
                                                        alt=""
                                                        width={75}
                                                        height={75}
                                                        className="mobile-social-icon-item"
                                                    />
                                                </a>
                                                <a href="#">
                                                    <Image
                                                        src="/assets/imgs/theme/icons/icon-twitter-white.svg"
                                                        alt=""
                                                        width={75}
                                                        height={75}
                                                        className="mobile-social-icon-item"
                                                    />
                                                </a>
                                                <a href="#">
                                                    <Image
                                                        src="/assets/imgs/theme/icons/icon-instagram-white.svg"
                                                        alt=""
                                                        width={75}
                                                        height={75}
                                                        className="mobile-social-icon-item"
                                                    />
                                                </a>
                                                <a href="#">
                                                    <Image
                                                        src="/assets/imgs/theme/icons/icon-pinterest-white.svg"
                                                        alt=""
                                                        width={75}
                                                        height={75}
                                                        className="mobile-social-icon-item"
                                                    />
                                                </a>
                                            </div>
                                            <div className="detail-extralink">
                                                <div className="product-extra-link2-button">
                                                    <button className="button button-add-to-cart">
                                                        Add to cart
                                                    </button>
                                                </div>
                                            </div>
                                            <ul className="product-meta font-xs color-grey mt-50">
                                                <li className="mb-5">
                                                  Origine : 
                                                    <a href="#">{pays['attributes']['LIB_FR']}</a>
                                                </li>
                                                <li className="mb-5">
                                                  Ref. Fab :
                                                    <a href="#" rel="tag" className="me-1">
                                                      {produit['attributes']['REFERENCE_FABRICANT']}
                                                    </a>
                                                </li>
                                                <li>
                                                  EAN :
                                                    <span className="in-stock text-success ml-5">{produit['attributes']['EAN']}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {quickView ? null : (
                                    <>
                                        <ProductTab />
                                        <div className="row mt-60">
                                            <div className="col-12">
                                                <h3 className="section-title style-1 mb-30">Related products</h3>
                                            </div>
                                            <div className="col-12">
                                                <div className="row related-products position-relative">
                                                    <RelatedSlider />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

const mapStateToProps = (state) => ({
    cartItems: state.cart,
});

const mapDispatchToProps = {
    addToCompare,
    addToWishlist,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
