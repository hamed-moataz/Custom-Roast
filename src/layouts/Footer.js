const Footer = () => {
  return (
    <div className="kf-footer">
      <div className="container">
        <div style={{display:"flex", flexWrap:"wrap",marginLeft:"-20%", justifyContent:"space-around"}} className="kf-footer-container">
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 kf-footer-logo">
            {/* logo */}
            <div
              className="kf-logo element-anim-1 scroll-animate"
              data-animate="active"
            >
              <a href="index.html">
                <img
                  src="images/logo1.png"
                  alt="image"
                  style={{
                    minWidth: "200px",
                    minHeight: "150px",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </a>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
            {/* hours */}
            <div
              className="kf-f-hours element-anim-1 scroll-animate kf-footer-hours"
              data-animate="active"
            >
              <h5
                className="orangeColor"
                style={{ fontSize: "1.4rem", fontWeight: "400" }}
              >
                Working Hours
              </h5>
              <ul>
                <li>
                  Monday - Friday
                  <em>08:00 am - 05:00pm</em>
                </li>
                <li>
                  Only Saturday
                  <em>09:00 pm - 03:00pm</em>
                </li>
                <li>
                  <strong>Sunday Close</strong>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
            {/* contact */}
            <div
              className="kf-f-contact element-anim-1 scroll-animate"
              data-animate="active"
            >
              <h5
                className="orangeColor"
                style={{ fontSize: "1.4rem", fontWeight: "400" }}
              >
                Contact Us
              </h5>
              <ul>
                <li>
                  <i className="las la-map-marker" />
                  <em>Location :</em>
                  Beirut, Lebanon,Mansouriyeh, Mkalles
                </li>
                <li>
                  <i className="las la-envelope-open-text" />
                  <em>Email Address :</em>
                  info@CustomRoastGroup.com
                </li>
                <li>
                  <i className="las la-phone" />
                  <em>Phone Number :</em>
                  +961 76 822 160
                </li>
              </ul>
            </div>
          </div>
        
        </div>
        <div className="row" >
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12  " >
            {/* copyright */}
            <div
              className="kf-copyright element-anim-1 scroll-animate"
              data-animate="active"
              style={{ textAlign:"center"}}
            >
              Copyright © 2025 CustomRoastGroup. All Rights Reserved.<br></br>{" "}
              Designed by CeevTech.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
