import TestimonialsCarousel from "@/src/components/sliders/TestimonialsCarousel";
import Layouts from "@/src/layouts/Layouts";
import Link from "next/link";
import { sliderProps } from "@/src/sliderProps";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Preloader from "@/src/layouts/Preloader";
import { getTeammates } from "./api/api";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import SwiperCore from 'swiper'; // ✅ Core Swiper class (not from 'swiper/react')

export const kfHistory = {
  slidesPerView: 1,
  spaceBetween: 70,
  loop: false,
  speed: 1000,
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      const labels = ["2018", "2020", "2022", "2023", "2024", "2025"];
      return `<span class="${className} pag-year-history">${labels[index]}</span>`;
    },
  },
  on: {
    slideChange: function () {
      // This function will be triggered whenever the slide changes
      const bullets = document.querySelectorAll(".pag-year-history");
      const activeIndex = this.activeIndex;

      // Check window width only when on the client side
      if (typeof window !== "undefined") {
        const isMobile = windowWidth <= 768;

        console.log("Window width:", windowWidth, "Is mobile:", isMobile); // Debugging

        // Hide all year labels first
        bullets.forEach((bullet) => {
          bullet.style.display = "none";
        });

        if (isMobile) {
          // Only show the active year and its neighboring years (if any)
          if (bullets[activeIndex]) {
            bullets[activeIndex].style.display = "inline-block";
          }
          if (bullets[activeIndex - 1]) {
            bullets[activeIndex - 1].style.display ="hidden";
          }
          if (bullets[activeIndex + 1]) {
            bullets[activeIndex + 1].style.display = "hidden";
          }
        } else {
          // On desktop, show all years
          bullets.forEach((bullet) => {
            bullet.style.display = "inline-block";
          });
        }
      }
    },
  },
};


const About = () => {
  const [teammate, setTeammate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Update window width when the component is mounted or resized
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Set initial window width when the component mounts
    handleResize();

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const historyData = [
    {
      image: "images/history1.jpg",
      subname: "Custom Roast was founded",
      title: "A Humble Start That Led Us to Success Today",
      description: "It was a humble beginning for Custom Roast, we had the vision, mission and motivation to start and end up where we are today!",
      year: "2018",
      fullDate: "25 January 2018",
    },
    {
      image: "images/history2.jpg",
      subname: "The First Co-Roasting Facility",
      title: "A New Era of Coffee Production and Training",
      description: "The first co-roasting facility by Custom Roast was made at Mkallis for mass production, training academy & maintenance dept.",
      year: "2020",
      fullDate: "15 June 2020",
    },
    {
      image: "images/history3.jpg",
      subname: "Achieving WEGA Sponsorship",
      title: "Hard Work and Quality Led Us to This Milestone",
      description: "Through hard work and attentiveness to the quality of service and product, we attained WEGA sponsorship in Lebanon.",
      year: "2022",
      fullDate: "15 June 2022",
    },
    {
      image: "images/history4.jpg",
      subname: "Comprehensive Coffee Solutions",
      title: "Elevating Coffee & Café Bars with Expertise",
      description: "We started our solutions from A to Z for coffee and café bars, providing training, equipment, and proper floor plan circulation for the bar section.",
      year: "2023",
      fullDate: "15 January 2023",
    },
    {
      image: "images/history5.jpg",
      subname: "Showcasing Excellence at HORECA",
      title: "Introducing the Signature Arabica Blend",
      description: "Attended the famous HORECA exhibition, as well as creating our famous ARABICA Blend (by Custom Roast) that aims for different taste profiles and targets the F&B industry.",
      year: "2024",
      fullDate: "15 February 2024",
    },
    {
      image: "images/history6.jpg",
      subname: "A New Chapter for Custom Roast",
      title: "Rebranding After Seven Years of Dedication",
      description: "After 7 years of hard work, we decided to give our company a new image with a fresh logo, reflecting our growth and vision.",
      year: "2025",
      fullDate: "15 January 2025",
    },
  ];

  useEffect(() => {
    const fetchTeammates = async () => {
      try {
        const data = await getTeammates();
        setTeammate(data);
      } catch (err) {
        console.log('Failed to fetch teammates data!');
      } finally {
        setLoading(false);
      }
    };
    fetchTeammates();
  }, []);

  if (loading) return <Preloader />;

  else {
  return (
    <>
      {/* Section Started Inner */}
      <section className="section kf-started-inner">
        <div
          className="kf-parallax-bg js-parallax"
          style={{ backgroundImage: "url(images/history_inner_bg.jpg)" }}
        />
        <div className="container">
          <h1
            className="kf-h-title text-anim-1 scroll-animate"
            data-splitting="chars"
            data-animate="active"
          >
            About Us
          </h1>
        </div>
      </section>
      {/* Section About-2 */}
      <section className="section kf-choose kf-choose-2">
        <div className="container">
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-5 align-self-center whiteText"  >
              <div className="kf-titles" >
                <div
                  className="kf-subtitle element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  About Custom Roast
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
                  At Custom Roast, we believe coffee should be as unique as you
                  are. From sourcing the finest beans to crafting the perfect
                  roast, we tailor every step to match your taste and business
                  needs. Whether you're a café, restaurant, or passionate coffee
                  lover, we provide expert guidance, premium blends, and
                  cutting-edge equipment to elevate your coffee experience.
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
                      <h5 className="name orangeColor" style={{fontSize:"1.5rem", fontWeight:"300"}}>Premium Coffee Solutions</h5>
                      <div className="subname " >
                        From sourcing the finest beans to precision roasting, we
                        craft coffee experiences tailored to your unique taste
                        and business needs.
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
                      <h5 className="name orangeColor" style={{fontSize:"1.5rem", fontWeight:"300"}}>Expert Consultancy & Equipment</h5>
                      <div className="subname">
                        Providing top-tier coffee machines, accessories, and
                        expert guidance to elevate cafés, restaurants, and
                        coffee enthusiasts alike.
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <Link
                href="menu-coffee"
                className="kf-btn element-anim-1 scroll-animate"
                data-animate="active"
              >
                <span>our menu</span>
                <i className="fas fa-chevron-right" />
              </Link>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 offset-lg-1">
              <div
                className="kf-choose-image element-anim-1 scroll-animate"
                data-animate="active"
              >
                <img src="images/chooseUs.jpg" alt="image" />
              </div>
            </div>
          </div>
        </div>
      </section>
   {/* Section Numbers-2 */}
<section className="section kf-numbers-2 section-bg">
  <div className="container" style={{ overflowX: "auto" }}>
    <div
      className="kf-numbers-items-2"
      style={{
        display: "flex",
        flexWrap: "wrap", 
        gap: "2rem",
        justifyContent: "center",
      }}
    >
      {[
        {
          icon: "las la-crown",
          title: "Premium Clients",
          subtitle: "Elite customers, superior service",
        },
        {
          icon: "las la-user-tie",
          title: "Expert Members",
          subtitle: "Skilled professionals at work",
        },
        {
          icon: "las la-trophy",
          title: "Outstanding Achievements",
          subtitle: "Excellence earned, milestones reached",
        },
        {
          icon: "lar la-grin-stars",
          title: "5 Star Reviews",
          subtitle: "Excellence brewed to perfection.",
        },
      ].map((item, index) => (
        <div
          key={index}
          className="col"
          style={{
            minWidth: "220px", // 👈 Ensure each item has width
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            className="kf-numbers-item-2 element-anim-1 scroll-animate"
            data-animate="active"
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <div className="icon">
              <i className={item.icon} style={{ fontSize: "2.5rem" }} />
            </div>
            <div className="desc">
              <h5
                className="name orangeColor"
                style={{ fontSize: "1.5rem", fontWeight: "400" }}
              >
                {item.title}
              </h5>
              <div className="subname">{item.subtitle}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Section History */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <section className="section kf-history section-bg">
        <div className="container">
          <div className="kf-titles align-center" style={{ display: "grid", placeItems: "center" }}>
            <div className="kf-subtitle element-anim-1 scroll-animate" data-animate="active">
              Our Custom Roast History
            </div>
            <h3 className="kf-title element-anim-1 scroll-animate" data-animate="active">
              Something Know About Our History
            </h3>
          </div>
          <div className="kf-history-carousel">
            <Swiper {...kfHistory} className="swiper-container" style={{ justifyContent: "center", height: "550px" }}>
              {historyData.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="kf-history-item element-anim-1 scroll-animate" data-animate="active" style={{ margin: "auto" }}>
                    <div className="image">
                      <img src={item.image} alt="image" style={item.year === "2025" ? { objectFit: "cover", width: "100%", height: "100%" } : {}} />
                    </div>
                    <div className="desc history-desk-width">
                      <div className="subname whiteText" style={{ fontSize: "1rem" }}>{item.subname}</div>
                      <h5 className="name orangeColor" style={{ fontSize: "1.5rem", fontWeight: "400" }}>
                        {item.title}
                      </h5>
                      <div className="kf-text whiteText">
                        <p>{item.description}</p>
                      </div>
                    </div>
                    <div className="date">{item.year}</div>
                    <div className="label whiteText" style={{ opacity: 1, visibility: 'visible' }}>{item.fullDate}</div>
                  </div>
                </SwiperSlide>
              ))}
              <div className="swiper-pagination" />
              <div className="swiper-scrollbar" />
              <div className="swiper-button-prev">
                <i className="fas fa-angle-left whiteText" />
              </div>
              <div className="swiper-button-next">
                <i className="fas fa-angle-right whiteText" />
              </div>
            </Swiper>
          </div>
        </div>
      </section>

      {/* Section Team */}
      <br/> <br/> <br/> <br/> <br/> <br/>
      <section className="section kf-team section-bg">
        <div className="container">
          <div className="kf-titles align-center"  style={{ display: "grid",
              placeItems: "center"}}>
            <div
              className="kf-subtitle element-anim-1 scroll-animate"
              data-animate="active"
            >
              Experience Team Member
            </div>
            <h3
              className="kf-title element-anim-1 scroll-animate"
              data-animate="active"
            >
              Meet Our Professional Team
            </h3>
          </div>
          <div className="kf-team-items row">
            {teammate.map((person) => (
              <div
                className="col-xs-12 col-sm-12 col-md-6 col-lg-3 "
                key={person.name}
              >
                <div
                  className="kf-team-item element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div className="desc">
                    <h5 className="name orangeColor" style={{fontSize:"1rem", fontWeight:"500"}}>{person.name}</h5>
                    <div className="subname whiteText">{person.role}</div>
                  </div>
                  <div className="image kf-image-hover" style={{height:"15rem"}}>
                    <img src={person.image_url} alt="image" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                    <div className="info">
                      <div className="label">{person.email}</div>
                      <div className="label">{person.phoneNumber}</div>
                    </div>
                    <div className="social">
                      {person.facebookLink && (
                        <a
                          href={person.facebookLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fab fa-facebook-f" />
                        </a>
                      )}
                      {person.twitterLink && (
                        <a
                          href={person.twitterLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fab fa-twitter" />
                        </a>
                      )}
                      {person.LinkedinLink && (
                        <a
                          href={person.LinkedinLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fab fa-linkedin" />
                        </a>
                      )}
                      {person.youtubeLink && (
                        <a
                          href={person.youtubeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fab fa-youtube" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <br/> <br/> <br/> <br/> <br/> <br/>
      {/* Section Testimonials Carousel */}
      <TestimonialsCarousel />
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
                <span>Coffe Menu</span>
                <i className="fas fa-chevron-right" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};}
export default About;
