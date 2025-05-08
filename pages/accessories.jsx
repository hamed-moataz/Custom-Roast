import { useState,useEffect } from "react";
import Layouts from "@/src/layouts/Layouts";
import { getAccessories } from "./api/api";
import Preloader from "@/src/layouts/Preloader";

const AccessoriesComponent = () => {
  const pageSize = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [accessories, setAccessories] = useState([]);
  const [totalAccessories, setTotalAccessories] = useState(0);
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(totalAccessories / pageSize);

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const response = await getAccessories(currentPage, pageSize);

        if (response?.data && Array.isArray(response.data)) {
          setAccessories(response.data);
          setTotalAccessories(response.total);
        } else {
          console.error("Unexpected response format:", response);
          setAccessories([]);
          setTotalAccessories(0);
        }
      } catch (err) {
        console.log('Failed to fetch accessories data!');
        setAccessories([]);
        setTotalAccessories(0);
      } finally {
        setLoading(false);
      }
    };

    fetchAccessories();
  }, [currentPage]);

  if (loading) return <Preloader />;

  const displayedAccessories = accessories;

  // pagination logic remains the same
  const getPaginationNumbers = () => {
    const visiblePages = 2;
    let pages = [];

    if (totalPages <= 5) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      pages.push(1);
      if (currentPage > visiblePages + 2) pages.push("...");
      for (let i = Math.max(2, currentPage - visiblePages); i <= Math.min(totalPages - 1, currentPage + visiblePages); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - visiblePages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };



  
  return (
    <>
      {/* Section Started Inner */}
      <section className="section kf-started-inner">
        <div
          className="kf-parallax-bg js-parallax"
          style={{ backgroundImage: "url(images/accessories_inner_bg.jpg)" }}
        />
        <div className="container">
          <h1
            className="kf-h-title text-anim-1 scroll-animate"
            data-splitting="chars"
            data-animate="active"
          >
            Accessories
          </h1>
        </div>
      </section>
      {/* Section Quote */}
      <div className="kf-titles align-center" style={{marginTop:"5rem",display: "grid",
              placeItems: "center",textAlign:"center"}}>
            <div
              className="kf-subtitle element-anim-1 scroll-animate"
              data-animate="active"
            >
              Upgrade Your Gear, Shop Now!
            </div>
            <h3
              className="kf-title element-anim-1 scroll-animate"
              data-animate="active" style={{textAlign:"center"}}
            >
              Discover Our Premium Accessories Today!
            </h3>
          </div>
        
        {/* accessories Section */}
      {displayedAccessories.map((accessory) => (
        <div className="container section-bg" style={{marginBottom:"5rem"}}>
        <div
          key={accessory.item_id}
          className="accessory-card"
          style={{ textAlign: "center" }}
        >
          <h3 className="orangeColor" style={{"paddingTop":"3rem", "paddingBottom":"1.5rem", fontSize:"1.7rem"}} >{accessory.title}</h3>

          <img
            src={accessory.image_url}
            alt={accessory.title}
            className="main-image"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              display: 'block'
            }}
          />
       
          <div style={{"textAlign":"center"}}>
            <div
              className="col-xs-12 col-sm-12 col-md-6 col-lg-3"
              style={{ width: "80%", textAlign: "center","margin":"auto" }}
            >
              {/* SubItems */}
              <div
                className="kf-f-gallery element-anim-1 scroll-animate"
                data-animate="active"
              >
            <div className="sub-items" style={{"display":"flex","flexWrap":"wrap", "justifyContent":"space-around","marginTop":"3rem"}}>
            {accessory.subitems?.length > 0 && accessory.subitems.map((subItem) => (
              <div key={subItem.item_id} className="sub-item" style={{"width":"16rem","paddingBottom":"20px"}}>
                <img
                  src={subItem.image_url}
                  alt={subItem.title}
                  className="sub-image"
                  style={{marginBottom:"1rem"}}
                />
                <div>
                  <strong >{subItem.title}</strong>
                  <p  style={{marginTop:"0rem"}}>{subItem.description}</p>
                </div>
              </div>
            ))}
            </div>

            </div>
              </div>
            </div>
          </div>
        </div>
      ))}
          {/* Pagination */}
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
          
    </>
  );
};

export default AccessoriesComponent;
