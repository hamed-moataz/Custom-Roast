import Layouts from "@/src/layouts/Layouts";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { getWorkshops, getCourses} from "./api/api";
import Preloader from "@/src/layouts/Preloader";

// Dynamically import Isotope with ssr: false
const Isotope = dynamic(() => import('isotope-layout'), { ssr: false });

const WorkshopsPerPage = 6;
const CoursesPerPage = 6;

const Academy = () => {
  const isotope = useRef(null);
  const [currentWorkshopPage, setCurrentWorkshopPage] = useState(1);
  const [courses, setCourses] = useState([]);
 const [loading, setLoading] = useState(true);
 const [workshops, setWorkshops] = useState([]);

 useEffect(() => {
  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      console.log('Failed to fetch courses data!');
    } finally {
      setLoading(false);
    }
  };
  fetchCourses();
}, []);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const data = await getWorkshops();
        setWorkshops(data);
      } catch (err) {
        console.log('Failed to fetch workshops data!');
      } finally {
        setLoading(false);
      }
    };
    fetchWorkshops();
  }, []);
 
  useEffect(() => {
    if (typeof window !== "undefined" && isotope.current) {
      isotope.current.arrange();
    }
  }, [currentWorkshopPage]);

  useEffect(() => {
    if (typeof window !== "undefined" && isotope.current) {
      isotope.current.reloadItems();
      isotope.current.arrange();
    }
  }, [currentWorkshopPage]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        try {
          // Check if Isotope is available and construct it
          if (Isotope) {
            isotope.current = new Isotope.default(".all-menu-items", {
              itemSelector: ".kf-menu-item-col",
              percentPosition: true,
              masonry: {
                columnWidth: ".kf-menu-item-col",
              },
              animationOptions: {
                duration: 750,
                easing: "linear",
                queue: false,
              },
            });
          } else {
            console.error("Isotope is not available.");
          }
        } catch (error) {
          console.error("Error initializing Isotope: ", error);
        }
      }, 500);

      return () => {
        if (isotope.current) {
          isotope.current.destroy();
        }
      };
    }
  }, []);

  const [visibleCourses, setVisibleCourses] = useState(CoursesPerPage);
  const loadMoreCourses = () => {
    setVisibleCourses((prev) => Math.min(prev + CoursesPerPage, courses.length));
  };
  if (loading) return <Preloader />;
  else {
  
  const totalWorkshopPages = Math.ceil(workshops.length / WorkshopsPerPage);
  const startIndex = (currentWorkshopPage - 1) * WorkshopsPerPage;
  const currentWorkshops = workshops.slice(startIndex, startIndex + WorkshopsPerPage);



  return (
    <>
      {/* Section Started Inner */}
      <section className="section kf-started-inner">
        <div
          className="kf-parallax-bg js-parallax"
          style={{ backgroundImage: "url(images/academy_inner_bg.jpg)" }}
        />
        <div className="container">
          <h1
            className="kf-h-title text-anim-1 scroll-animate"
            data-splitting="chars"
            data-animate="active"
          >
           Training academy
          </h1>
        </div>
      </section>
       {/* Section Quote */}
       <section className="section kf-quote">
        <div className="container">
          <div className="kf-parallax-icon pi-4" data-jarallax-element={-60}>
            <div
              className="p-icon"
              style={{ backgroundImage: "url(images/quote_line_icon1.png)" }}
            />
          </div>
          <div className="kf-parallax-icon pi-5" data-jarallax-element={-80}>
            <div
              className="p-icon"
              style={{ backgroundImage: "url(images/quote_line_icon2.png)" }}
            />
          </div>
          <div
            className="kf-quote-box element-anim-1 scroll-animate"
            data-animate="active"
          >
            <div className="kf-titles align-center" style={{ display: "grid",
    placeItems: "center"}}>
            <div
              className="kf-subtitle element-anim-1 scroll-animate"
              data-animate="active" 
            >
              CUSTOM ROAST COFFEE
              ACADEMY

            </div>
            <h3
              className="kf-title element-anim-1 scroll-animate"
              data-animate="active"
            >
                Our Academy Overview
            </h3>
          </div>
            <div className="text whiteText">
            Custom Roast Coffee Academy offers 
engaging, hands-on courses designed for 
coffee enthusiasts at every level. Our 
expert-led training covers a wide range of 
topics, including an introduction to coffee, 
barista skills, brewing techniques, latte art, 
coffee roasting, and sensory cupping. We 
aim to enhance your coffee knowledge and 
appreciation through practical learning, 
guiding you from foundational skills to 
advanced coffee craftsmanship. Whether 
you're just starting out or aiming to perfect 
your technique, our academy has 
something to offer for everyone.
            </div>
           
          </div>
        </div>
        
      </section>
      <hr style={{"width":"50%", "margin":"-6rem auto -2rem ", color:"white"}} className="hr-academy"></hr>
      {/* Section Courses */}
      <section className="section kf-latest-blog">
        <div className="container">
          <div className="kf-titles align-center" style={{ display: "grid",
    placeItems: "center"}}>
            <div
              className="kf-subtitle element-anim-1 scroll-animate"
              data-animate="active"
            >
              Unlock Knowledge, Enroll Now!

            </div>
            <h3
              className="kf-title element-anim-1 scroll-animate"
              data-animate="active"
            >
                 Explore Our Available Courses
            </h3>
          </div>
          <div className="kf-blog-grid-items row">
           {courses.slice(0, visibleCourses).map((course) => (
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4" key={course.title}>
            
              <div 
                className="kf-blog-grid-item element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image kf-image-hover">
                <Link href={{ pathname: "/courses", query: { _id: course._id } }}>
                    <img src={course.image_url} alt="image" />
                  </Link>
                </div>
                <div className="desc">
                  <h4 className="name" style={{"color":"#f57b35 "}}>
                   {course.title}
                  </h4>
                
                 
                  <div className="kf-comm whiteText">
                    <i className="far fa-comments whiteText" />
                   Show more info
                  </div>
                </div>
              </div>
                
            </div>
          ))}
           
           {visibleCourses < courses.length && (
            <div className="align-center">
              <button className="kf-btn" onClick={loadMoreCourses}>
                <span>Load More</span>
                <i className="fas fa-chevron-right" />
              </button>
            </div>
          )}
          </div>
        </div>
      </section>
      {/* Section Workshops */}
      <section className="section kf-numbers-2 section-bg">
        <div className="container">
          <div className="kf-titles align-center" style={{ display: "grid",
    placeItems: "center"}}>
            <div
              className="kf-subtitle element-anim-1 scroll-animate"
              data-animate="active"
            >
              Unlock Knowledge, Enroll Now!
            </div>
            <h3
              className="kf-title element-anim-1 scroll-animate"
              data-animate="active" style={{ display: "grid", textAlign:"center",
                placeItems: "center"}}
            >
              Explore Our Available Workshops
            </h3>
          </div>
          <div className="kf-numbers-items-2 row">
         
            <div style={{"display": "flex","flexWrap":"wrap",justifyContent:"space-around",}}>
            {currentWorkshops.map((workshop, index) => (
            <div key={`${workshop.title}-${currentWorkshopPage}`} className="col-xs-12 col-sm-12 col-md-4 col-lg-3" style={{"width":"75svh"}}>
              <div
                className="kf-numbers-item-2 element-anim-1 scroll-animate"
                data-animate="active"
              >
                  <div className="image kf-image-hover" style={{ height: "40vh", width: "100%", "borderRadius":"2px"}}>
                    <a href={workshop.image_url} className="has-popup-image">
                      <img src={workshop.image_url} alt="image" />
                    </a>
                  </div>
                <div className="desc"  style={{ marginTop: "20px" , display: "grid",
    placeItems: "center"}}>
                  <h5 className="name orangeColor" style={{fontSize:"1.2rem",marginBottom:"1rem"}}>{workshop.title}</h5>
                  <div style={{"display":"flex","flexWrap":"wrap"}}>
                  <div className="subname" style={{ marginRight: "20px" }}> Lenght: {workshop.length_value} {workshop.length_unit}</div>
                  <div className="subname" style={{ marginRight: "20px" }}>&</div>
                  <div className="subname">Class Size: {workshop.class_size} Persons</div>
                  </div>
                  <div className="subname"  style={{ marginTop: "10px"  }}>{workshop.description}</div>
                </div>
              </div>
            </div>))}
          </div>
          {totalWorkshopPages > 1 && (
            <div className="pagination" style={{"margin":"40px auto ", "width":"60vh","justifyContent":"space-between"}}>
              <button onClick={() => {setCurrentWorkshopPage((prev) => Math.max(prev - 1, 1)),console.log("current page:", currentWorkshopPage);}} disabled={currentWorkshopPage === 1}>
                Previous
              </button>
              <span style={{"margin":" auto 10px"}}> Page {currentWorkshopPage} of {totalWorkshopPages} </span>
              <button onClick={() => {setCurrentWorkshopPage((prev) => Math.min(prev + 1, totalWorkshopPages)),console.log("current page:",currentWorkshopPage);}} disabled={currentWorkshopPage === totalWorkshopPages}>
                Next
              </button>
            </div>
          )}
          </div>
        </div>
      </section>
      <br/> <br/> <br/> <br/> <br/> <br/>
    </>
  );
};}
export default Academy;
