import Link from "next/link";
import { useEffect, useState } from "react";
import { stickyNav } from "../utils";

const Header = () => {
 

  const [toggle, setToggle] = useState(false);
  const [logoSrc, setLogoSrc] = useState("images/logo.png");
  useEffect(() => {
    if (document.querySelector("header").className.includes("animated")) {
      setTimeout(() => {
        document.querySelector("header").classList.add("opened", "show");
        setLogoSrc("images/logo1.png");
      }, 800);
    } else {
      setLogoSrc("images/logo.png");
    }
  }, [toggle]);

  const [activeMenu, setActiveMenu] = useState("");
  const activeMenuSet = (value) =>
      setActiveMenu(activeMenu === value ? "" : value),
    activeLi = (value) =>
      value === activeMenu ? { display: "block" } : { display: "none" };

  return (
    <header className={`kf-header ${toggle ? "animated" : ""}`}>
      {/* topline */}
      <div className="kf-topline">
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
            {/* hours */}
            <div className="kf-h-group">
              <i className="far fa-clock " /> <em>opening hours :</em> <span className="blueColor">08:00 am -
              05:00pm
              </span>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 align-center">
            {/* social */}
            <div className="kf-h-social">
              <a
                href="https://www.facebook.com/share/16RAcMNikC/?mibextid=wwXIfr"
                target="blank"
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#">
                <i className="fab fa-twitter" />
              </a>
              <a
                href="https://www.instagram.com/customroastgroup?igsh=MTdoMXB2dDhtemY3Mg=="
                target="blank"
              >
                <i className="fab fa-instagram" />
              </a>
              <a href="#">
                <i className="fab fa-youtube" />
              </a>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 align-right">
            {/* location */}
            <div className="kf-h-group">
              <i className="fas fa-map-marker-alt" /> <em>Location :</em>{" "}
             <span className="blueColor"> Beirut, Lebanon, Mansouriyeh, Mkalles </span>
            </div>
          </div>
        </div>
      </div>
      {/* navbar */}
      <div className="kf-navbar" >
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
            {/* logo */}
            <div className="kf-logo" style={{ minWidth: "150px"}}>
              <Link href="/">
                <img
                  src={logoSrc}
                  alt="image"
                  style={{
                    minWidth: "180px",
                    minHeight: "75px",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </Link>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 align-center " style={{margin:"auto", justifyContent:"center"}}>
            {/* main menu */}
            <div className="kf-main-menu">
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="menu-coffee">
                    Coffee
                    {/* <i className="las la-angle-down" /> */}
                  </Link>
                  {/* <ul>
                    <li>
                      <Link href="menu-coffee">Coffee</Link>
                    </li>
                    {/* <li>
                      <Link href="menu-restaurant">Menu Restaurant</Link>
                    </li> */}
                  {/* </ul> */}
                </li>

                <li>
                  <Link href="commercialCoffeeMachines">
                    Machines
                    <i className="las la-angle-down" />
                  </Link>
                  <ul>
                    <li>
                      <Link href="commercialCoffeeMachines" className="blueHover">
                        Commercial Coffee Machines
                      </Link>
                    </li>
                    <li>
                      <Link href="professionalHomeMachines" className="blueHover">
                        Professional Home Machines
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="accessories">
                    Supplies
                    <i className="las la-angle-down" />
                  </Link>
                  <ul>
                    <li>
                      <Link href="accessories" className="blueHover">Accessories</Link>
                    </li>
                    <li>
                      <Link href="grinders" className="blueHover">Grinders</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="academy">Academy</Link>
                </li>

                <li>
                  <a href="services">
                    Pages
                    <i className="las la-angle-down" />
                  </a>
                  <ul>
                    <li>
                      <Link href="services" className="blueHover">Service</Link>
                    </li>
                    <li>
                      <Link href="about" className="blueHover">About</Link>
                    </li>
                    {/* <li>
                      <Link href="reservation">Reservation</Link>
                    </li>
                    <li>
                      <Link href="history">History</Link>
                    </li> */}
                    {/* <li>
                      <Link href="team">Our Chefs</Link>
                    </li>
                    <li>
                      <Link href="gallery">Gallery</Link>
                    </li> */}
                    <li>
                      <Link href="faq" className="blueHover">FAQ</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="contacts">Contacts</Link>
                </li>
                {/* <li>
                  <a href="#">
                    Blog
                    <i className="las la-angle-down" />
                  </a>
                  <ul>
                    <li>
                      <Link href="blog-grid">Blog Grid</Link>
                    </li>
                    <li>
                      <Link href="blog">Blog Standard</Link>
                    </li>
                    <li>
                      <Link href="blog-single">Blog Single</Link>
                    </li>
                  </ul>
                </li> */}
              </ul>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 align-right">
            {/* menu btn */}
            <a
              href="#"
              className={`kf-menu-btn ${toggle ? "active" : ""}`}
              onClick={() => setToggle(!toggle)}
            >
              <span />
            </a>
            {/* btn */}
            <Link href="menu-coffee" className="kf-btn h-btn blueHover">
              <span >Explore Coffees</span>
            </Link>
          </div>
        </div>
      </div>
      {/* mobile navbar */}
      {toggle && (
      <div className={`kf-navbar-mobile ${toggle ? 'active' : ''}`}>
        {/* mobile menu */}
        <div className="kf-main-menu">
        {typeof window !== "undefined" && (
          <ul >
            <li >
              <Link href="/"  className="blueColor headerMobileFontsize"  onClick={() => setToggle(false)} >Home</Link>
            </li>
            <li>
              <Link href="menu-coffee"  className="blueColor" onClick={() => setToggle(false)} >Coffee</Link>
            </li>
            <li
              className="has-children"
              onClick={() => activeMenuSet("Machines")}
            >
              <Link href="#"  className="blueColor" >Machines</Link>
              <i
                className="las la-angle-down"
                onClick={() => activeMenuSet("Machines")}
              />
              <ul style={activeLi("Machines")}>
                <li>
                  <Link href="commercialCoffeeMachines"  className="blueColor" onClick={() => setToggle(false)}>
                    Commercial Coffee Machines
                  </Link>
                </li>
                <li>
                  <Link href="professionalHomeMachines"  className="blueColor" onClick={() => setToggle(false)}>
                    Professional Home Machines
                  </Link>
                </li>
              </ul>
            </li>
            <li className="has-children">
              <Link href="# " onClick={() => activeMenuSet("Supplies")}  className="blueColor">
                Supplies
              </Link>
              <i
                className="las la-angle-down"
                onClick={() => activeMenuSet("Supplies")}
              />
              <ul style={activeLi("Supplies")}>
                <li>
                  <Link href="accessories"  className="blueColor" onClick={() => setToggle(false)}>Accessories</Link>
                </li>
                <li>
                  <Link href="grinders"  className="blueColor" onClick={() => setToggle(false)}>Grinders</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="academy"  className="blueColor headerMobileFontsize" onClick={() => setToggle(false)}>Academy</Link>
             
            </li>
            <li className="has-children">
              <Link href="#" onClick={() => activeMenuSet("Pages")}  className="blueColor">
                Pages
              </Link>
              <i
                className="las la-angle-down"
                onClick={() => activeMenuSet("Pages")}
              />
              <ul style={activeLi("Pages")}>
                <li>
                  <Link href="services" className="blueColor" onClick={() => setToggle(false)}>Service</Link>
                </li>
                <li>
                  <Link href="about"  className="blueColor" onClick={() => setToggle(false)}>About</Link>
                </li>
                <li>
                  <Link href="faq"  className="blueColor" onClick={() => setToggle(false)}>FAQ</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="contacts" className="blueColor" onClick={() => setToggle(false)} >Contacts</Link>
            </li>
          </ul>
        )}
        </div>
        {/* mobile topline */}
        <div className="kf-topline">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              {/* social */}
              <div className="kf-h-social">
                <a
                  href="https://www.facebook.com/share/16RAcMNikC/?mibextid=wwXIfr"
                  target="blank"
                >
                  <i className="fab fa-facebook-f" />
                </a>
                <a
                  href="https://www.instagram.com/customroastgroup?igsh=MTdoMXB2dDhtemY3Mg=="
                  target="blank"
                >
                  <i className="fab fa-instagram" />
                </a>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              {/* hours */}
              <div className="kf-h-group blueColor">
                <i className="far fa-clock " /> <em>opening hours :</em> 08:00 am
                - 09:00 pm
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              {/* location */}
              <div className="kf-h-group blueColor">
                <i className="fas fa-map-marker-alt "  /> <em>Location :</em>{" "}
                Beirut, Lebanon, Mansouriyeh, Mkalles
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </header>
  );
};
export default Header;
