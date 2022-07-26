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
import CategorySlider from "../sliders/Category";

// My Imports
import Image from 'next/image'

const ProductDetails = ({
    produit,
    exposant,
    pays,
    autres_produits_exposant_typeprod,
    typeprod,
    autres_produits_exposant,
    autres_produits_typeprod,
    autres_typeprods,
    revendeurs,
    addToCompare,
    addToCart,
    addToWishlist,
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

    //const inCart = cartItems.find((cartItem) => cartItem.id === product.id);

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
                                                <ThumbSlider />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-xs-12" style={{backgroundColor:"#FAFAFB"}}>
                                        <div className="detail-info  pr-30 pl-30">
                                            <div className="detail-info-header">
                                                <Image
                                                style={{backgroundColor:"gray", borderRadius:"4.5px"}}
                                                src="/assets/imgs/theme/icons/icon-youtube-white.svg"
                                                width={160}
                                                height={130}>
                                                </Image>
                                                <button className="detail-info-header-button">Suivre</button>
                                            </div>
                                            <h2 className="title-detail">{typeprod['attributes']['LIB_FR'].split("-").join(" ")+ " - "+ produit['attributes']['TITRE_FR']}</h2>
                                            <div className="clearfix product-price-cover">
                                                <div className="product-price primary-color float-left">
                                                    <span className="current-price  text-brand">{produit['attributes']['TARIF_PUB']+" €"}</span>
                                                </div>
                                            </div>
                                            <div className="bt-1 border-color-1 mt-30 mb-30"></div>
                                            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', marginRight:"10px", marginLeft:"10px"}}>
                                                <a target="_blank" href={exposant['attributes']['SRV_INTERNET']}>
                                                <button style={{width:'100%'}} className="button button-add-to-cart"><i className="fi-rs-shopping-cart mr-5"></i>SITE WEB</button>
                                                </a>
                                                <a href={"#"}>
                                                <button style={{width:'100%'}} className="button button-add-to-cart"><i className="fi-rs-shopping-cart mr-5"></i>QUESTION / DEVIS</button>
                                                </a>
                                                <a href={"#"}>
                                                <button style={{width:'100%'}} className="button button-add-to-cart"><i className="fi-rs-shopping-cart mr-5"></i>POINTS DE VENTE</button>
                                                </a>
                                                <a href={"#"}>
                                                <button style={{width:'100%'}} className="button button-add-to-cart"><i className="fi-rs-shopping-cart mr-5"></i>METTRE EN FAVORIS</button>
                                                </a>
                                            </div>
                                            <div className="mobile-social-icon">
                                                <a target="_blank" href="https://www.facebook.com/decofinder">
                                                    <Image
                                                        src="/assets/imgs/theme/icons/icon-facebook-white.svg"
                                                        alt=""
                                                        width={75}
                                                        height={75}
                                                        className="mobile-social-icon-item"
                                                    />
                                                </a>
                                                <a target="_blank" href="https://twitter.com/decofinder">
                                                    <Image
                                                        src="/assets/imgs/theme/icons/icon-twitter-white.svg"
                                                        alt=""
                                                        width={75}
                                                        height={75}
                                                        className="mobile-social-icon-item"
                                                    />
                                                </a>
                                                <a target="_blank" href="https://www.instagram.com/decofinder/">
                                                    <Image
                                                        src="/assets/imgs/theme/icons/icon-instagram-white.svg"
                                                        alt=""
                                                        width={75}
                                                        height={75}
                                                        className="mobile-social-icon-item"
                                                    />
                                                </a>
                                                <a target="_blank" href="https://www.pinterest.fr/decofinder/">
                                                    <Image
                                                        src="/assets/imgs/theme/icons/icon-pinterest-white.svg"
                                                        alt=""
                                                        width={75}
                                                        height={75}
                                                        className="mobile-social-icon-item"
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 col-sm-12 col-xs-12" style={{backgroundColor:"#FFFFFF"}}>
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-xs-12" style={{backgroundColor:"#FAFAFB", marginTop:"50px"}}>
                                        <div className="detail-info  pr-30 pl-30">
                                            <h2 className="title-detail" style={{ marginTop:"20px",fontWeight: 700, fontSize: '24px', lineHeight: '32px'}}>Acheter en ligne</h2>
                                            <div className="bt-1 border-color-1 mt-30 mb-30"></div>
                                            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', marginRight:"10px", marginLeft:"10px"}}>
                                            {
                                            revendeurs.map(val=>{
                                                return (
                                                    <a target="_blank" href={val["lien_revendeur_produit"]["attributes"]["URL_PAGE"]}>
                                                        <button style={{width:"100%"}} className="button button-add-to-cart">
                                                        <p>{val['exposant']['attributes']['NOM']}</p>
                                                        <div><i className="fi-rs-shopping-cart mr-5"></i></div>
                                                        </button>
                                                    </a> 
                                                )
                                            })
                                            }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {quickView ? null : (
                                    <>
                                        <ProductTab  
                                        produit={produit}
                                        pays={pays}
                                        />
                                        <div className="row mt-60">
                                            <div className="col-12" style={{display:"flex", justifyContent:"center"}}>
                                                <h3 className="section-title style-1 mb-30">Autres produits {typeprod['attributes']['LIB_FR']+" "+exposant['attributes']['NOM']}</h3>
                                            </div>
                                            <div className="col-12">
                                                <div className="row related-products position-relative">
                                                    <RelatedSlider 
                                                    produits={autres_produits_exposant_typeprod.filter(e=>e['attributes']['TITRE_FR'] != "NULL")}
                                                    exposant={exposant}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-60">
                                            <div className="col-12" style={{display:"flex", justifyContent:"center"}}>
                                                <h3 className="section-title style-1 mb-30">Toute la collection de {exposant['attributes']['NOM']}</h3>
                                            </div>
                                            <div className="col-12">
                                            <div className="carausel-10-columns-cover position-relative">
                                                <div className="carausel-10-columns" id="carausel-10-columns">
                                                    <CategorySlider 
                                                    autres_produits_exposant={autres_produits_exposant}
                                                    />
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="row mt-60">
                                            <div className="col-12" style={{display:"flex", justifyContent:"center"}}>
                                                <h3 className="section-title style-1 mb-30">Vous aimerez aussi</h3>
                                            </div>
                                            <div className="col-12">
                                                <div className="row related-products position-relative">
                                                    <RelatedSlider 
                                                    produits={autres_produits_typeprod.filter(e=>e['attributes']['TITRE_FR'] != "NULL")}
                                                    exposant={exposant}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-60">
                                            <div className="col-12" style={{display:"flex", justifyContent:"center"}}>
                                                <h3 className="section-title style-1 mb-30">Produits associés</h3>
                                            </div>
                                            <div className="col-12">
                                                <div className="row related-products position-relative">
                                                    <RelatedSlider 
                                                    autres_typeprods={autres_typeprods}
                                                    exposant={exposant}
                                                    />
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
