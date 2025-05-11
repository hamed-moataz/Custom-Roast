import TestimonialsCarousel from "@/src/components/sliders/TestimonialsCarousel";
import Layouts from "@/src/layouts/Layouts";
import MachineCard from "@/src/components/MachineCard";

import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import Video from "../src/components/video";

const Index = () => {
  const test =
    "Test > Test Test > Test Test > Test Test > Test Test > Test Test > Test Test > Test Test > Test Test > Test Test > Test Test > Test Test > Test";
  return (
    <>
      <section className="section kf-about section-bg">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-5">
              <div className="kf-titles">
                <div
                  className="kf-subtitle1 element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  About Us
                </div>
                <h3
                  className="kf-title element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <Typewriter
                    words={["Organic & Fresh Coffee Provider Center "]}
                    loop={0}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={2000} // ينتظر 2 ثانية قبل التغيير
                  />
                </h3>
              </div>
              <div
                className="kf-text element-anim-1 scroll-animate"
                data-animate="active"
              >
                <p>
                  We’re one of the leading companies when it comes to Coffee,
                  Coffee machines, Accessories & Consultancy, with over 5 years
                  of experience in the “coffee industry”
                </p>
              </div>
              <div
                className="kf-about-quote element-anim-1 scroll-animate"
                data-animate="active"
                style={{boxShadow:'  0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)'}}
              >
                {/* <img src="images/quote_img.png" alt="image" />
                <div> */}
                At Custom Roast, we elevate coffee with quality, innovation, and
                exceptional service.
                {/* </div> */}
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-7">
              <div
                className="kf-about-image element-anim-1 scroll-animate"
                data-animate="active"
              >
                <img
                  src="images/about_img.png"
                  alt="image"
                  className="img-index-home-page"
                  // style={{ width: "450px", height: "450px" }}
                  // animate={{ y: [0, -10, 0] }} // حركة بسيطة لأعلى ثم رجوع
                  // transition={{
                  //   repeat: Infinity,
                  //   duration: 2,
                  //   ease: "easeInOut",
                  // }}
                />
              </div>
            </div>
            <Video />
          </div>
        </div>
      </section>
      {/* Section Services */}
      <div
        style={{ height: "100px", overflow: "hidden", position: "relative" }}
      >
        <div
          style={{
            // background: "#F57B35",
            backgroundImage: "linear-gradient(#F79B72)",

            height: "50px",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            padding: "20px",
          }}
        >
          <motion.h1
            style={{
              fontSize: "2.5rem",
              color: "white",
              whiteSpace: "nowrap", // مهم علشان النص ميكسرش
              position: "absolute",
              top: 0,
              left: 0,
            }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          >
            {test}
          </motion.h1>
        </div>
        <div
          style={{
            backgroundImage: "linear-gradient(#134E97)",
            height: "50px",
            width: "100%",
            position: "absolute",
            top: "50px",
            left: 0,
            padding: "10px",
          }}
        >
          <motion.h1
            style={{
              fontSize: "2.5rem",
              color: "white",
              whiteSpace: "nowrap",
              position: "absolute",
              top: 0,
              left: 0,
            }}
            animate={{ x: ["100%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          >
            {test}
          </motion.h1>
        </div>
      </div>
      <section
        className="section kf-services section-bg"
        style={{ position: "relative" }}
        data-aos="fade-up"
      >
        <h2
          className="text-center"
          style={{ position: "absolute", top: "10px", right: "50%" }}
        >
          Title
        </h2>
        <div className="container">
          <div className="kf-services-items row justify-content-around align-items-center ">
            {/* <div className="col-6 col-sm-6 col-md-4 col-lg-3 mt-2 test">
              <h4 className="text-center"> Machines & Supplies</h4>
              <div className="card ">
                <div className="overlay"></div>
                <Link href="commercialCoffeeMachines" className="con-link">
                  <img src="images/service1.jpg" alt="image" id="img-edit" />
                  <h5
                    className="name orangeColor text-center mt-2"
                    style={{ fontSize: "1.5rem" }}
                  >
                    Machines & Supplies
                  </h5>{" "}
                </Link>
                <div className="card-body">
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card’s content.
                  </p>
                </div>
              </div>
            </div> */}
            <MachineCard />
            <div className="col-6 col-sm-6 col-md-4 col-lg-3 mt-2 test">
              <h4 className="text-center">Coffee Menu</h4>
              <div className="card ">
                <div className="overlay"></div>
                <Link href="menu-coffee" className="con-link">
                  <img
                    src="images/service2.jpg"
                    alt="image"
                    id="img-edit"
                    className="card-img-top"
                  />
                  <h5
                    className="name orangeColor text-center mt-2"
                    style={{ fontSize: "1.5rem" }}
                  >
                    Coffee Menu
                  </h5>
                </Link>
                <div className="card-body">
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card’s content.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-4 col-lg-3 mt-2 test">
              <h4 className="text-center">Coffee Academy</h4>

              <div className="card ">
                <div className="overlay"></div>
                <Link href="academy" className="con-link">
                  <img src="images/service3.jpg" alt="image" id="img-edit" />
                  <h5
                    className="name orangeColor text-center mt-2"
                    style={{ fontSize: "1.5rem" }}
                  >
                    Coffee Academy
                  </h5>
                </Link>
                <div className="card-body">
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card’s content.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-4 col-lg-3 mt-2 test">
              <h4 className="text-center">Coffee Academy</h4>

              <div className="card ">
                <div className="overlay"></div>
                <Link href="academy" className="con-link">
                  <img src="images/service3.jpg" alt="image" id="img-edit" />
                  <h5
                    className="name orangeColor text-center mt-2"
                    style={{ fontSize: "1.5rem" }}
                  >
                    Coffee Academy
                  </h5>
                </Link>
                <div className="card-body">
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card’s content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Choose */}
      {/* <section className="section kf-choose section-bg">
        <div className="container">
          <div className="kf-parallax-icon pi-1" data-jarallax-element={-60}>
            <div
              className="p-icon"
              style={{ backgroundImage: "url(images/parallax_icon1.png)" }}
            />
          </div>
          <div className="kf-parallax-icon pi-2" data-jarallax-element={-80}>
            <div
              className="p-icon"
              style={{ backgroundImage: "url(images/parallax_icon2.png)" }}
            />
          </div>
          <div className="kf-parallax-icon pi-3" data-jarallax-element={-40}>
            <div
              className="p-icon"
              style={{ backgroundImage: "url(images/parallax_icon3.png)" }}
            />
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
              <div
                className="kf-choose-image element-anim-1 scroll-animate"
                data-animate="active"
              >
                <img src="images/chooseUs.jpg" alt="image" />
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-5 offset-lg-1 align-self-center">
              <div className="kf-titles">
                <div
                  className="kf-subtitle element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  Why Choose Us
                </div>
                <h3
                  className="kf-title element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  Lebanese Coffee Excellence for Unique Tastes
                </h3>
              </div>
              <div
                className="kf-text element-anim-1 scroll-animate"
                data-animate="active"
              >
                <p>
                At Custom Roast, we believe coffee should be as unique as you are. From sourcing the finest beans to crafting the perfect roast, we tailor every step to match your taste and business needs. Whether you're a café, restaurant, or passionate coffee lover, we provide expert guidance, premium blends, and cutting-edge equipment to elevate your coffee experience.
                </p>
              </div>
              <div className="kf-choose-list">
                <ul>
                  <li
                    className="element-anim-1 scroll-animate"
                    data-animate="active"
                  >
                    <div className="icon">
                      <img src="images/choose_icon1.png" alt="image" />
                    </div>
                    <div className="desc">
                      <h5 className="name orangeColor" style={{fontSize:"1.2rem"}}>Premium Coffee Solutions</h5>
                      <div className="subname">
                      From sourcing the finest beans to precision roasting, we craft coffee experiences tailored to your unique taste and business needs.
                      </div>
                    </div>
                  </li>
                  <li
                    className="element-anim-1 scroll-animate"
                    data-animate="active"
                  >
                    <div className="icon">
                      <img src="images/choose_icon2.png" alt="image" />
                    </div>
                    <div className="desc">
                      <h5 className="name orangeColor" style={{fontSize:"1.2rem"}}>Expert Consultancy & Equipment</h5>
                      <div className="subname">
                      Providing top-tier coffee machines, accessories, and expert guidance to elevate cafés, restaurants, and coffee enthusiasts alike.
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <Link
                href="about"
                className="kf-btn element-anim-1 scroll-animate blueHover"
                data-animate="active"
              >
                <span>explore more</span>
                <i className="fas fa-chevron-right" />
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      {/* Section CTA */}
      <section
        className="section kf-cta kf-parallax"
        style={{ backgroundImage: "url(images/cta_bg.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
              <div className="kf-titles">
                <div
                  className="kf-subtitle element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  Craving a Coffee Adventure
                </div>
                <h3
                  className="kf-title element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  Explore top coffee & find your perfect brew!
                </h3>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 align-self-center align-right">
              <Link
                href="reservation"
                className="kf-btn element-anim-1 scroll-animate blueHover"
                data-animate="active"
              >
                <span>Coffee Menu</span>
                <i className="fas fa-chevron-right" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Index;
