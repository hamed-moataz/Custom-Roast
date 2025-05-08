
import ContactForm from "@/src/components/ContactForm";


const Contacts = () => {
  return (
    <>
      {/* Section Started Inner */}
      <section className="section kf-started-inner">
        <div
          className="kf-parallax-bg js-parallax"
          style={{
            backgroundImage: "url(images/contacts_inner_bg.jpg)",
          }}
        />
        <div className="container">
          <h1
            className="kf-h-title text-anim-1 scroll-animate"
            data-splitting="chars"
            data-animate="active"
          >
            Contact Us
          </h1>
        </div>
      </section>
      {/* Section Contacts Info */}
      <section className="section kf-contacts-info">
        <div className="container">
          <div className="kf-contacts-items row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 align-center">
              <div
                className="kf-contacts-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image">
                  {/*<img src="images/contact_icon1.png" alt="" />*/}
                  <i className="las la-map-marked-alt" />
                </div>
                <div className="desc">
                  <h5 className="name  orangeColor" style={{fontSize:"1.4rem", fontWeight:"400"}}>Main Location</h5>
                  <ul>
                    <li>
                 
                    Beirut, Lebanon,
                      <br /> Mansouriyeh, Mkalles 
                    </li>
                    <li>
                    Tripoli, Dam W Farez, <br />
                     24 St. (Ashraf Kabbara St.)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 align-center">
              <div
                className="kf-contacts-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image">
                  {/*<img src="images/contact_icon2.png" alt="" />*/}
                  <i className="las la-envelope-open-text" />
                </div>
                <div className="desc">
                  <h5 className="name orangeColor" style={{fontSize:"1.4rem", fontWeight:"400"}}>Email Address</h5>
                  <ul>
                    <li>
                    info@CustomRoastGroup.com
                    <br />
                      www.CustomRoastGroup.com
                    </li>
                    <li>
                    info@CustomRoastGroup.com <br />
                    www.CustomRoastGroup.com
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 align-center">
              <div
                className="kf-contacts-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image">
                  {/*<img src="images/contact_icon3.png" alt="" />*/}
                  <i className="las la-headset" />
                </div>
                <div className="desc">
                  <h5 className="name orangeColor" style={{fontSize:"1.4rem", fontWeight:"400"}}>Phone Number</h5>
                  <ul>
                    <li style={{marginTop:"2.5rem",marginBottom:"0.5rem"}}>
                    +961 76 822 160 <br />
                  
                    </li>
                    <li>
                    +961 76 822 160 <br />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Section Contacts Form */}
      <section className="section kf-contacts-form">
        <div className="container">
          <div
            className="kf-reservation-form element-anim-1 scroll-animate"
            data-animate="active"
          >
            <div className="kf-titles align-center">
              <div className="kf-subtitle">Contact Us</div>
              <h3 className="kf-title">Send Us Message</h3>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
     
    </>
  );
};
export default Contacts;
