import Layouts from "@/src/layouts/Layouts";
import Link from "next/link";

const Services = () => {
  return (
    <>
      {/* Section Started Inner */}
      <section className="section kf-started-inner">
        <div
          className="kf-parallax-bg js-parallax"
          style={{ backgroundImage: "url(images/services_inner_bg.jpg)" }}
        />
        <div className="container">
          <h1
            className="kf-h-title text-anim-1 scroll-animate"
            data-splitting="chars"
            data-animate="active"
          >
            Services
          </h1>
        </div>
      </section>
      {/* Section Services */}
      <section className="section kf-services">
        <div className="container">
          <div className="kf-titles align-center"  style={{ display: "grid",
              placeItems: "center"}}>
            <div
              className="kf-subtitle element-anim-1 scroll-animate"
              data-animate="active"
            >
              We provide
            </div>
            <h3
              className="kf-title element-anim-1 scroll-animate"
              data-animate="active" style={{textAlign:"center"}}
            >
              Custom Roast Services One
            </h3>
          </div>
          <div className="kf-services-items row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
              <div
                className="kf-services-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image kf-image-hover">
                  <img src="images/service1.jpg" alt="image" />
                </div>
                <div className="desc">
                  <div className="icon">
                  <i className="las la-cogs" />
                  </div>
                  <h5 className="name orangeColor" style={{fontSize:"1.5rem"}}>Machines & Supplies</h5>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
              <div
                className="kf-services-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image kf-image-hover">
                  <img src="images/service2.jpg" alt="image" />
                </div>
                <div className="desc">
                  <div className="icon">
                    <i className="las la-coffee" />
                  </div>
                  <h5 className="name orangeColor" style={{fontSize:"1.5rem"}}>Coffee Club</h5>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
              <div
                className="kf-services-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image kf-image-hover">
                  <img src="images/service3.jpg" alt="image" />
                </div>
                <div className="desc">
                  <div className="icon">
                  <i className="las la-chalkboard-teacher" />
                  </div>
                  <h5 className="name orangeColor" style={{fontSize:"1.5rem"}}>Coffee Academy</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Section Numbers-2 */}
      <section className="section kf-numbers-2 section-bg">
        <div className="container">
          <div className="kf-titles align-center"  style={{ display: "grid",
              placeItems: "center"}}>
            <div
              className="kf-subtitle element-anim-1 scroll-animate"
              data-animate="active"
            >
              What we do
            </div>
            <h3
              className="kf-title element-anim-1 scroll-animate"
              data-animate="active"
            >
              Custom Roast Services Two
            </h3>
          </div>
          <div className="kf-numbers-items-2 row">
            <div style={{"display": "flex","flexWrap":"wrap","justifyContent":"space-around"}}>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3" style={{"width":"80vh"}}>
              <div
                className="kf-numbers-item-2 element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="icon">
                <i className="las la-store-alt" />
                </div>
                <div className="desc">
                  <h5 className="name orangeColor" style={{fontSize:"1.4rem", fontWeight:"400"}}>A TO Z
                  BAR SOLUTION</h5>
                  <div className="subname">We provide a full-service solution for setting  up and managing your coffee business. From cafe design and equipment selection to menu development and staff training, we ensure your business runs smoothly from start to finish. Our services also include quality control, ensuring consistency in coffee taste, brewing techniques, and overall service standards. We offer ongoing maintenance and operational guidance to keep your coffee service at its best.</div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3" style={{"width":"80vh"}}>
              <div
                className="kf-numbers-item-2 element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="icon">
                <i className="las la-chalkboard-teacher" />
                </div>
                <div className="desc">
                  <h5 className="name orangeColor" style={{fontSize:"1.4rem", fontWeight:"400"}}>TRAINING ACADEMY</h5>
                  <div className="subname">Our academy offers professional training programs for all skill levels, covering everything from foundational barista skills to advanced techniques. Whether you're an aspiring barista or a business looking to upskill your team, we provide hands-on training to ensure excellence in coffee preparation and service.</div>
                </div>
              </div>
            </div>
            </div>
            <div style={{"display": "flex","flexWrap":"wrap","justifyContent":"space-around"}}>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3" style={{"width":"80vh"}}>
              <div
                className="kf-numbers-item-2 element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="icon">
                <i className="las la-lightbulb" />
                </div>
                <div className="desc">
                  <h5 className="name orangeColor" style={{fontSize:"1.5rem", fontWeight:"400"}}>CONSULTANCY</h5>
                  <div className="subname">We offer expert guidance to help businesses enhance efficiency, profitability, and brand identity in the coffee industry. Whether you're launching a new coffee concept, refining your operations, or scaling your business, we provide strategic insights, workflow optimization, cost control strategies, and market positioning advice to help you stand out in a competitive market.</div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3" style={{"width":"80vh"}}>
              <div
                className="kf-numbers-item-2 element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="icon">
                <i className="las la-tools" />
                </div>
                <div className="desc">
                  <h5 className="name orangeColor" style={{fontSize:"1.4rem", fontWeight:"400"}}>EQUIPMENT MAINTENANCE</h5>
                  <div className="subname">Our expert technicians provide routine maintenance and emergency repairs for coffee machines and brewing equipment, ensuring consistent performance and longevity.</div>
                </div>
              </div>
            </div>
            </div>
            <div style={{"display": "flex","flexWrap":"wrap","justifyContent":"space-around"}}>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3" style={{"width":"80vh"}}>
              <div
                className="kf-numbers-item-2 element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="icon">
                <i className="las la-shopping-bag" />
                </div>
                <div className="desc">
                  <h5 className="name orangeColor" style={{fontSize:"1.4rem", fontWeight:"400"}}>SHOP CLOSURE PURCHASING</h5>
                  <div className="subname">We offer a fair and transparent process for purchasing used coffee equipment and supplies from businesses that are closing or undergoing renovations.</div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3" style={{"width":"80vh"}}>
              <div
                className="kf-numbers-item-2 element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="icon">
                <i className="las la-mug-hot" />
                </div>
                <div className="desc">
                  <h5 className="name orangeColor" style={{fontSize:"1.4rem", fontWeight:"400"}}>COFFEE BLEND & MACHINE CUSTOMIZATION</h5>
                  <div className="subname">We help create custom coffee blends tailored to your brand and modify coffee machines to match your specific operational needs.</div>
                </div>
              </div>
            </div>
            </div>
            <div style={{"display": "flex","flexWrap":"wrap","justifyContent":"space-around"}}>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3" style={{"width":"80vh"}}>
              <div
                className="kf-numbers-item-2 element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="icon">
                <i className="las la-cogs" />
                </div>
                <div className="desc">
                  <h5 className="name orangeColor" style={{fontSize:"1.4rem", fontWeight:"400"}}>PARTS SELLING</h5>
                  <div className="subname">We supply high-quality replacement parts for coffee machines, grinders, and brewing 	equipment 	to 	keep 	your operations 	running 	without interruptions.</div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3" style={{"width":"80vh"}}>
              <div
                className="kf-numbers-item-2 element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="icon">
                <i className="las la-tag" />
                </div>
                <div className="desc">
                  <h5 className="name orangeColor" style={{fontSize:"1.4rem", fontWeight:"400"}}>PRIVATE/ WHITE LABELING</h5>
                  <div className="subname">Develop your own coffee brand with our private labeling service. We assist with custom blends, packaging, and production, giving you a unique product under your own branding.</div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>
    
      {/* Section CTA */}
      <br/><br/><br/><br/><br/><br/>
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
                href="menu-coffee"
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
export default Services;
