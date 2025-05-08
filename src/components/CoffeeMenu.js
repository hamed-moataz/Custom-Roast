import { useEffect, useRef, useState } from "react";
import Isotope from "isotope-layout";
import { getCoffees } from "@/pages/api/api";
import Preloader from "../layouts/Preloader";
const itemsPerPage = 12;

const CoffeeMenu = () => {
  const isotope = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [specialtyCoffees, setSpecialtyCoffees] = useState([]);
  useEffect(() => {
    const fetchCoffees = async () => {
      try {
        const data = await getCoffees();
        setSpecialtyCoffees(data);
      } catch (err) {
        console.log('Failed to fetch coffee ☕ data!');
      } finally {
        setLoading(false);
      }
    };

    fetchCoffees();
  }, []);

  
  if (loading) return <Preloader />;
  else {
    const totalPages = Math.ceil(specialtyCoffees.length / itemsPerPage);
  
    const currentCoffees = specialtyCoffees.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  
  return (
    <section className="section kf-menu kf-menu-tabs">
      <div className="container">
        <div className="kf-titles align-center"  style={{ display: "grid",
              placeItems: "center"}}>
          <div className="kf-subtitle element-anim-1 scroll-animate" style={{textAlign:"center"}}>Choose Best of</div>
          <h3 className="kf-title element-anim-1 scroll-animate" style={{textAlign:"center"}}>Custom Roast Coffee Menu</h3>
        </div>cb

        <div className="kf-menu-items" style={{ backgroundImage: "url(images/menu_logo.png)" }} >
          <div className="row all-menu-items">
            {currentCoffees.map((spCoffee, index) => (
              <div key={`${spCoffee.name}-${currentPage}`} className="kf-menu-item-col col-xs-6 col-sm-6 col-md-4 col-lg-3" >
                <div className="kf-menu-item element-anim-1 scroll-animate " style={{  display:'grid' , justifyContent:'center' , alignItems:'center', padding:'4px'}}>
                  <div className="image kf-image-hover image-coffee" >
                    <a href={spCoffee.image} className="has-popup-image">
                    <img src={spCoffee.image_url} alt={spCoffee.name} />

                    </a>
                  </div>
                  <div className="desc ">
                    <h5 className="name orangeColor" style={{fontSize:"1.2rem"}}>{spCoffee.name}</h5>
                    <div className="subname" style={{marginTop:"-1px"}}>Country: {spCoffee.country}</div>
                    <div className="subname"style={{marginTop:"-1px"}}>Process: {spCoffee.process}</div>
                    <div className="subname" style={{display:"flex", flexWrap:"wrap", marginTop:"-1px"}}>
                      {spCoffee.weTaste.join(", ")}
                    </div>
                    <div className="price" style={{marginTop:"-10px"}}>{spCoffee.score}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination" style={{"margin":"auto", "width":"60vh","justifyContent":"space-between"}}>
              <button onClick={() => {setCurrentPage((prev) => Math.max(prev - 1, 1)),console.log("current page:", currentPage);}} disabled={currentPage === 1}>
                Previous
              </button>
              <span style={{"margin":" auto 10px"}}> Page {currentPage} of {totalPages} </span>
              <button onClick={() => {setCurrentPage((prev) => Math.min(prev + 1, totalPages)),console.log("current page:", currentPage);}} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
};

export default CoffeeMenu;
