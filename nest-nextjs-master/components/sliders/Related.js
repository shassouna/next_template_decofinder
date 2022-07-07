import { useEffect, useState } from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchByCatagory } from "../../redux/action/product";
import SingleProduct from "./../ecommerce/SingleProduct";

SwiperCore.use([Navigation]);

const RelatedSlider = (props) => {

    const [related, setRelated] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        // With Category
        const allProducts = await fetchByCatagory("/static/product.json");
        setRelated(allProducts);
    };
    console.log(props.autres_typeprods)

    return (
        <>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                
                navigation={{
                    prevEl: ".custom_prev_n",
                    nextEl: ".custom_next_n",
                }}
                className="custom-class"
            >
                {props.produits&&related.map((product, i) => (
                    <SwiperSlide key={i}>
                        <SingleProduct 
                        product={product} 
                        produit={props.produits[2]}
                        exposant={props.exposant}
                        />
                    </SwiperSlide>
                ))}
                {props.autres_typeprods&&related.map((product, i) => (
                    <SwiperSlide key={i}>
                        <SingleProduct 
                        product={product} 
                        typeproduit={props.autres_typeprods[0]}
                        exposant={props.exposant}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div
                className="slider-arrow slider-arrow-2 carausel-6-columns-arrow"
            >
                <span className="slider-btn slider-prev slick-arrow custom_prev_n">
                    <i className="fi-rs-angle-left"></i>
                </span>
                <span className="slider-btn slider-next slick-arrow custom_next_n">
                    <i className="fi-rs-angle-right"></i>
                </span>
            </div>
            
        </>
    );
};

export default RelatedSlider;
