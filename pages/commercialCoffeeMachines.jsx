import Layouts from "@/src/layouts/Layouts";
import Link from "next/link";
import { useState, useEffect } from "react";
import Preloader from "@/src/layouts/Preloader";
import { getCommercial } from "./api/api";

const CommercialCoffeeMachines = () => {
  const pageSize = 3; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);
  const [ccmachines, setCcmachines] = useState([]);

  useEffect(() => {
    const fetchCcmachines = async () => {
      try {
        const data = await getCommercial();
        setCcmachines(data);
      } catch (err) {
        console.log("Failed to fetch commercial machines data!");
      } finally {
        setLoading(false);
      }
    };
    fetchCcmachines();
  }, []);
  if (loading) return <Preloader />;
  else {
    const totalPages = Math.ceil(ccmachines.length / pageSize);

    // Get paginated items
    const startIndex = (currentPage - 1) * pageSize;
    const displayedMachines = ccmachines.slice(
      startIndex,
      startIndex + pageSize
    );
    // Function to create pagination numbers with dots
    const getPaginationNumbers = () => {
      const visiblePages = 2; // Show 2 numbers before & after current page
      let pages = [];

      if (totalPages <= 5) {
        // If there are 5 or fewer pages, show all
        pages = Array.from({ length: totalPages }, (_, i) => i + 1);
      } else {
        pages.push(1); // Always show first page

        if (currentPage > visiblePages + 2) pages.push("...");

        for (
          let i = Math.max(2, currentPage - visiblePages);
          i <= Math.min(totalPages - 1, currentPage + visiblePages);
          i++
        ) {
          pages.push(i);
        }

        if (currentPage < totalPages - visiblePages - 1) pages.push("...");

        pages.push(totalPages); // Always show last page
      }

      return pages;
    };
    const toggleExpanded = (index) => {
      setExpanded((prev) => ({
        ...prev,
        [index]: !prev[index], // Toggle the state for the selected item
      }));
    };
    return (
      <>
        {/* Section Started Inner */}
        <section className="section kf-started-inner">
          <div
            className="kf-parallax-bg js-parallax"
            style={{ backgroundImage: "url(images/machines_inner_bg.jpg)" }}
          />
          <div className="container">
            <h1
              className="kf-h-title text-anim-1 scroll-animate"
              data-splitting="chars"
              data-animate="active"
            >
              Commercial Coffee Machines
            </h1>
          </div>
        </section>
        {/* Section Quote */}
        <div
          className="kf-titles align-center"
          style={{ marginTop: "4rem", display: "grid", placeItems: "center" }}
        >
          <div
            className="kf-subtitle element-anim-1 scroll-animate"
            data-animate="active" style={{textAlign:"center"}}
          >
            Power Up Your Workflow, Shop Now!
          </div>
          <h3
            className="kf-title element-anim-1 scroll-animate"
            data-animate="active"
            style={{ width: "90%", textAlign: "center" }}
          >
            Explore Our High-Performance Machines Today!
          </h3>
        </div>

        {/* Section Archive */}
        <section className="section kf-archive" style={{ marginTop: "-1rem" }}>
          <div className="container">
            <div
              className="row"
              style={{
                display: "grid",
                placeItems: "center",
                minHeight: "100vh",
                marginTop: "-7rem ",
              }}
            >
              <div
                className="col-xs-12 col-sm-12 col-md-12 col-lg-8"
                style={{ margin: "auto", width: "100%" }}
              >
                <div className="kf-archive-items">
                  {displayedMachines.map((machine, index) => (
                    <div
                      key={index}
                      className="kf-archive-item element-anim-1 scroll-animate"
                      data-animate="active"
                      style={{ margin: " 4rem  auto" }}
                    >
                      <div className="image kf-image-hover">
                        <img
                          src={machine.image_url}
                          alt="image"
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "contain",
                            display: "block",
                          }}
                        />
                      </div>
                      <div className="desc">
                        <h5 className="name">
                          <Link href="#">{machine.title}</Link>
                        </h5>
                        <div className="kf-text">{machine.description}</div>
                        {/* Show additional info when expanded */}
                        {expanded[index] && (
                          <>
                          <ul className="additional-info">
                            {Object.entries(machine.additional_info).map(
                              ([key, value], i) => (
                                <li key={i}>
                                  <strong>{key}:</strong> {value}
                                </li>
                                
                              )
                            )}
                          </ul>
                          <ul>
                          {machine.large_info && Object.entries(machine.large_info).map(
                            ([key, value]) => (
                              <li key={key} >
                                <strong>{key}:</strong> {value}
                              </li>
                            )
                          )}
                        </ul>
                        </>
                        )}

                        {/* Show More / Show Less Button */}
                        <div className="readmore ">
                          <button
                            className="kf-btn-link blueColor"
                            onClick={() => toggleExpanded(index)}
                          >
                            {expanded[index] ? "Show Less" : "Show More"}
                            <i className="fas fa-chevron-right blueColor" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {totalPages > 1 && (
            <div className="pagination" style={{"margin":"auto", "width":"60vh","justifyContent":"space-evenly"}}>
              <button onClick={() => {setCurrentPage((prev) => Math.max(prev - 1, 1)),console.log("current page:", currentPage);}} disabled={currentPage === 1}>
                Previous
              </button>
              <span style={{"margin":" auto 10px"}} className="whiteText"> Page {currentPage} of {totalPages} </span>
              <button onClick={() => {setCurrentPage((prev) => Math.min(prev + 1, totalPages)),console.log("current page:", currentPage);}} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          )} 
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4"></div>
            </div>
          </div>
        </section>

        
    
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
  }
};

export default CommercialCoffeeMachines;
