
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SingleProduct from "./../ecommerce/SingleProduct";

SwiperCore.use([Navigation]);

const RelatedSlider = (props) => {

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
                {props.produits&&props.produits.map((produit, i) => (
                    <SwiperSlide key={i}>
                        <SingleProduct 
                        produit={produit}
                        exposant={props.exposant}
                        />
                    </SwiperSlide>
                ))}
                {props.autres_typeprods&&props.autres_typeprods.map((typeproduit, i) => (
                    <SwiperSlide key={i}>
                        <SingleProduct 
                        typeproduit={typeproduit}
                        exposant={props.exposant}
                        />
                    </SwiperSlide>
                ))}
                {props.selections&&props.selections.map((selection, i) => (
                    <SwiperSlide key={i}>
                        <SingleProduct 
                        selection={selection}
                        />
                    </SwiperSlide>
                ))}
                {props.inspirations&&props.inspirations.map((inspiration, i) => (
                    <SwiperSlide key={i}>
                        <SingleProduct 
                        inspiration={inspiration}
                        />
                    </SwiperSlide>
                ))}
                {props.nouveautes&&props.nouveautes.map((nouveaute, i) => (
                    <SwiperSlide key={i}>
                        <SingleProduct 
                        nouveaute={nouveaute}
                        />
                    </SwiperSlide>
                ))}
                {/*                     <div
                        className="col-lg-1-5 col-md-4 col-12 col-sm-6"
                    >*/}
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
