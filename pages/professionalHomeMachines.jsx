import Layouts from "@/src/layouts/Layouts";
import Link from "next/link";
import { useState, useEffect } from "react";
import Preloader from "@/src/layouts/Preloader";
import { getProfessional } from "./api/api";

const ProfessionalHomeMachines = () => {
  const pageSize = 3; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const [phmachines, setPhmachines] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchPhmachines = async () => {
      try {
        const data = await getProfessional();
        setPhmachines(data);
      } catch (err) {
        console.log("Failed to fetch professional machines data!");
      } finally {
        setLoading(false);
      }
    };
    fetchPhmachines();
  }, []);

  if (loading) return <Preloader />;
  else {
    const totalPages = Math.ceil(phmachines.length / pageSize);

    // Get paginated items
    const startIndex = (currentPage - 1) * pageSize;
    const displayedMachines = phmachines.slice(
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
              Professional Home Machines
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
            data-animate="active"
            style={{ textAlign: "center" }}
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
        <section
          className="section kf-archive"
          style={{ marginTop: "-1rem", width: "100%" }}
        >
          <div className="container" style={{ width: "100%" }}>
            <div
              className="row"
              style={{
                display: "grid",
                placeItems: "center",
                minHeight: "100vh",
                marginTop: "-7rem ",
                width: "100%",
              }}
            >
              <div
                className="col-xs-12 col-sm-12 col-md-12 col-lg-8"
                style={{ margin: "auto", minWidth: "105%" }}
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
                          onClick={() => setPreviewImage(machine.image_url)}
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
                              {machine.large_info &&
                                Object.entries(machine.large_info).map(
                                  ([key, value]) => (
                                    <li key={key}>
                                      <strong>{key}:</strong> {value}
                                    </li>
                                  )
                                )}
                            </ul>
                          </>
                        )}

                        {/* Show More / Show Less Button */}
                        <div className="readmore">
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
                  {previewImage && (
                    <div
                      className="image-overlay"
                      onClick={() => setPreviewImage(null)}
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.8)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999,
                      }}
                    >
                      {/* حاوية الصورة + الزر */}
                      <div
                        style={{
                          position: "relative",
                          maxWidth: "70%",
                          maxHeight: "70%",
                          display:'flex',
                          justifyContent:'center',
                          alignItems:'center',
                          overflow:'hidden'
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span
                          onClick={() => setPreviewImage(null)}
                          style={{
                            position: "absolute",
                            top: "0",
                            right: "10px",
                            fontSize: "2rem",
                            color: "#F57B35",
                            borderRadius: "50%",
                            padding: "5px",
                            cursor: "pointer",
                            zIndex: 10000,
                          }}
                          className="fs-1"
                        >
                          &times;
                        </span>

                        {/* الصورة نفسها */}
                        <img
                          src={previewImage}
                          alt="Preview"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            borderRadius: "10px",
                            display: "block",
                            boxShadow: "0 0 20px #000",
                            // border:'2px solid red'
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                {/* Pagination */}
                {totalPages > 1 && (
                  <div
                    className="pagination"
                    style={{
                      margin: "auto",
                      width: "60vh",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <button
                      onClick={() => {
                        setCurrentPage((prev) => Math.max(prev - 1, 1)),
                          console.log("current page:", currentPage);
                      }}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    <span
                      style={{ margin: " auto 10px" }}
                      className="whiteText"
                    >
                      {" "}
                      Page {currentPage} of {totalPages}{" "}
                    </span>
                    <button
                      onClick={() => {
                        setCurrentPage((prev) =>
                          Math.min(prev + 1, totalPages)
                        ),
                          console.log("current page:", currentPage);
                      }}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
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

export default ProfessionalHomeMachines;
