import { sliderProps } from "@/src/sliderProps";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import "swiper/css/scrollbar";
const TestimonialsCarousel = () => {
  return (
    <section
      className="section kf-testimonials kf-testimonials-2 section-bg"
      style={{ backgroundColor:"rgba(22, 34, 43, 0.84)" }}
    >
      <div className="container">
        <div className="kf-titles align-center"  style={{ display: "grid",
              placeItems: "center"}}>
          <div
            className="kf-subtitle element-anim-1 scroll-animate"
            data-animate="active"
          >
            Customer Feedback
          </div>
          <h3
            className="kf-title element-anim-1 scroll-animate"
            data-animate="active"
          >
            What Our Clients Say
          </h3>
        </div>
        <div className="kf-testimonials-carousel">
         <Swiper {...sliderProps.kfTestimonialsCarousel} className="swiper-container">
  <SwiperSlide>
    <div className="slide-item element-anim-1 scroll-animate" data-animate="active">
      <div className="image">
        <img src="images/rev2.jpg" alt="image" />
      </div>
      <div className="desc">
        <div className="stars">
          <i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" />
          <i className="fas fa-star" /><i className="fas fa-star" />
        </div>
        <div className="kf-text whiteText" style={{marginTop:"2rem"}}>
          “Fast and efficient service. High quality products, and very reliable! Thank you Custom Roast.”
        </div>
        <h5 className="name" style={{marginTop:"2.4rem"}}>
          RAMZI <em>CEO FRONT DOOR</em>
        </h5>
      </div>
    </div>
  </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div
                  className="slide-item element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div className="image">
                    <img src="images/rev4.jpg" alt="image" />
                  </div>
                  <div className="desc">
                    <div className="stars">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                    </div>
                    <div className="text whiteText" style={{marginTop:"2rem"}}>
                    “I love Custom Roast. Your roasting is always quality, and I truly appreciate the personalized touch in every batch.”
                    </div>
                    <h5 className="name" style={{marginTop:"2.3rem"}}>
                    ALI JABER <em>MANAGER SIP</em>
                    </h5>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div
                  className="slide-item element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div className="image">
                    <img src="images/rev3.jpg" alt="image" />
                  </div>
                  <div className="desc">
                    <div className="stars">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                    </div>
                    <div className="kf-text whiteText" style={{marginTop:"2rem"}}>
                    "I enjoy working with Custom Roast for their respect, professionalism, and consistent quality. Since day one, I’ve had no issues."
                    </div>
                    <h5 className="name" style={{marginTop:"1.1rem"}}>
                    MOUSSA  <em>CEO SOL BISTRO BAALBACK</em>
                    </h5>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div
                  className="slide-item element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div className="image">
                    <img src="images/rev1.jpg" alt="image" />
                  </div>
                  <div className="desc">
                    <div className="stars">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                    </div>
                    <div className="text whiteText" style={{"marginTop":"70px"}}>
                    "Custom roast is incredible"
                    </div>
                    <h5 className="name" style={{"marginTop":"70px"}}>
                    RITA <em> MANAGER ZITA BEIRUT</em>
                    </h5>
                  </div>
                </div>
              </SwiperSlide>
              
            
            <div className="swiper-pagination" />
          </Swiper>
        </div>
      </div>
    </section>
  );
};
export default TestimonialsCarousel;
