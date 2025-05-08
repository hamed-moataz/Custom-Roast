import Layouts from "@/src/layouts/Layouts";
import { Fragment, useState } from "react";
import Accordion from "react-bootstrap/Accordion";

const faqsData = [
  { 
    id: 1, 
    title: "What is Custom Roast?",
    content: "<p>Custom Roast is a specialty coffee company offering wholesale coffee supply, consultancy services, and a coffee training academy. We specialize in sourcing, roasting, and brewing high-quality coffee, along with providing coffee accessories and worldwide shipping.</p>"
  },
  { 
    id: 2, 
    title: "Where are you located?",
    content: "<p>We operate globally, with a focus on sourcing and delivering premium coffee solutions for businesses and individuals.</p>" 
  },
  { 
    id: 3, 
    title: "Do you have a physical store or café?",
    content: "<p>No, we focus on wholesale supply, consultancy, and training rather than operating a retail café.</p>"
  },
  { 
    id: 4, 
    title: "Do you supply coffee beans for businesses?",
    content: "<p>Yes! We provide high-quality coffee beans for cafes, restaurants, hotels, and offices. Our team can help you select the best beans for your business needs.</p>"
  },
  {
    id: 5, 
    title: "Can I order coffee beans in bulk?",
    content: "<p>Absolutely! We offer bulk coffee bean orders with competitive pricing for wholesale clients. Contact us for a custom quote.</p>"
  },
  {
    id: 6, 
    title: "Do you provide private labeling or white-label coffee?",
    content: "<p>Yes, we offer private-label solutions, allowing businesses to sell coffee under their own brand. We can assist with sourcing, roasting, and packaging.</p>"
  },
  {
    id: 7, 
    title: "Do you ship internationally?",
    content: "<p>Yes, we provide worldwide shipping. Shipping costs and delivery times depend on your location.</p>"
  },
  {
    id: 8, 
    title: "What consultancy services do you offer?",
    content: 
      `<p>We help businesses set up and improve their coffee operations, covering:</p>
      <ul>
        <li>Coffee menu development</li>
        <li>Equipment selection and setup</li>
        <li>Barista training and workflow optimization</li>
        <li>Quality control and sourcing guidance</li>
      </ul>`
    
  },
  {
    id: 9, 
    title: "Can you help me start my own coffee business?",
    content: "<p>Yes! We offer full consultancy services to help you establish and scale your coffee brand, whether it’s a café, roastery, or online coffee business.</p>"
  },
  {
    id: 10, 
    title: "What types of training do you offer?",
    content: `
      <p>Our training academy covers:</p>
      <ul>
        <li>Barista skills (beginner to advanced)</li>
        <li>Brewing techniques (pour-over, espresso, etc.)</li>
        <li>Roasting fundamentals</li>
        <li>Latte art</li>
        <li>Sensory training & coffee tasting</li>
      </ul>
    `
  },
  {
    id: 11, 
    title: "Who can join the training programs?",
    content: "<p>Our training is open to coffee enthusiasts, aspiring baristas, and business owners looking to enhance their team’s skills.</p>"
  },
  {
    id: 12, 
    title: "Do you offer on-site training for businesses?",
    content: "<p>Yes! We can train your staff at your location or provide customized training sessions at our facility.</p>"
  },
  {
    id: 13, 
    title: "Do you sell coffee machines and brewing equipment?",
    content: "<p>Yes, we offer a range of high-quality coffee machines, grinders, and accessories for both home and commercial use.</p>"
  },
  {
    id: 14, 
    title: "Can I order coffee beans in bulk?",
    content: "<p>Absolutely! We offer bulk coffee bean orders with competitive pricing for wholesale clients. Contact us for a custom quote.</p>"
  },
  {
    id: 15, 
    title: "Can I order coffee beans in bulk?",
    content: "<p>Absolutely! We offer bulk coffee bean orders with competitive pricing for wholesale clients. Contact us for a custom quote.</p>"
  },
  {
    id: 16, 
    title: "Can I order coffee beans in bulk?",
    content: "<p>Absolutely! We offer bulk coffee bean orders with competitive pricing for wholesale clients. Contact us for a custom quote.</p>"
  },
  {
    id: 17, 
    title: "Can I order coffee beans in bulk?",
    content: "<p>Absolutely! We offer bulk coffee bean orders with competitive pricing for wholesale clients. Contact us for a custom quote.</p>"
  },
 
];

const ITEMS_PER_PAGE = 5;

const Faq = () => {
  const [toggle, setToggle] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(faqsData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedFaqs = faqsData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      {/* Section Title */}
      <section className="section kf-started-inner">
        <div className="kf-parallax-bg js-parallax" style={{ backgroundImage: "url(images/faq_inner_bg.jpg)" }} />
        <div className="container">
          <h1 className="kf-h-title text-anim-1 scroll-animate" data-splitting="chars" data-animate="active">
            Faq
          </h1>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section kf-faq">
        <div className="container">
          <div className="kf-titles align-center"  style={{ display: "grid",
              placeItems: "center"}}>
            <div className="kf-subtitle element-anim-1 scroll-animate" data-animate="active" style={{textAlign:"center"}}>Have Any Questions?</div>
            <h3 className="kf-title element-anim-1 scroll-animate" data-animate="active" style={{textAlign:"center"}}>Frequently Asked Questions</h3>
          </div>

          <Accordion activeKey={toggle.toString()}>
  <div className="kf-faq-items row">
    {displayedFaqs.map((faq) => (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" key={faq.id}>
        <div className="kf-faq-item element-anim-1 scroll-animate" data-animate="active">
          <Accordion.Item
            as="div"
            eventKey={faq.id.toString()}
            className={`name collapse-btn ${faq.id.toString() === toggle.toString() ? "active" : ""}`}
          >
            <div
              className="accordion-header"
              onClick={() => setToggle(faq.id === toggle ? 0 : faq.id)}
              style={{ cursor: "pointer" }}
            >
              {faq.title}
              <i className="las la-arrow-circle-right" />
            </div>
            <Accordion.Collapse eventKey={faq.id.toString()}>
              <div className="text blueColor" dangerouslySetInnerHTML={{ __html: faq.content }} />
            </Accordion.Collapse>
          </Accordion.Item>
        </div>
      </div>
    ))}
  </div>
</Accordion>


             {/* Pagination Controls */}
             <div className="pagination-container" style={{margin:"30px auto ",width:"100%",display:"flex",flexWrap:"wrap", justifyContent:"space-around"}}>
            <button onClick={prevPage} disabled={currentPage === 1} className="pagination-btn">Previous</button>
            <span className="pagination-info whiteText" style={{marginTop:"11px"}}>{currentPage} / {totalPages}</span>
            <button onClick={nextPage} disabled={currentPage === totalPages} className="pagination-btn">Next</button>
          </div>
        
      
          
        </div>
        
      </section>

      {/* Section CTA */}
      <section className="section kf-cta kf-parallax"  style={{ backgroundImage: "url(images/cta_bg.jpg)" }}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
              <div className="kf-titles">
                <div className="kf-subtitle element-anim-1 scroll-animate" data-animate="active">Get In Touch</div>
                <h3 className="kf-title element-anim-1 scroll-animate" data-animate="active">Have Any Questions</h3>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 align-self-center align-right">
              <a href="contacts" className="kf-btn element-anim-1 scroll-animate blueHover" data-animate="active">
                <span>Submit request</span>
                <i className="fas fa-chevron-right" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;
