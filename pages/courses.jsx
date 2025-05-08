import Layouts from "@/src/layouts/Layouts";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Preloader from "@/src/layouts/Preloader";
import { getCourseById } from "./api/api";

const BlogSingle = () => {
  const router = useRouter();
  const { _id } = router.query;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCourse = async () => {
      if (!_id) return; // wait until _id is defined
      try {
        const data = await getCourseById(_id);
        setCourse(data);
      } catch (err) {
        console.error("Failed to fetch course data!", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [_id]);
  
  if (loading) return <Preloader />;
  else {
    return (
      <>
      
        <section className="section kf-archive-started">
          <div
            className="kf-archive-image element-anim-1 scroll-animate"
            data-animate="active"
            style={{
              backgroundImage: `url(${course.image_url})`,
              marginTop: "-8rem",
            }}
          />
        </section>

        {/* Section Quote */}
        <div
          className="kf-titles align-center"
          style={{
            marginTop: "5rem",
            display: "grid",
            placeItems: "center",
            marginBottom: "3rem",
            textAlign: "center",
          }}
        >
          <div
            className="kf-subtitle element-anim-1 scroll-animate"
            data-animate="active"
            style={{ textAlign: "center" }}
          >
            {course.title}
          </div>
          <h3
            className="kf-title element-anim-1 scroll-animate"
            data-animate="active"
            style={{ textAlign: "center" }}
          >
            {course.subtitle}
          </h3>
        </div>
        {/* Section Archive */}
        <section
          className="section kf-archive archive-section-courseInfo"
          style={{ marginTop: "-22vh" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 offset-lg-2">
                <div
                  className="post-content element-anim-1 scroll-animate whiteText"
                  data-animate="active"
                >
                  <p>{course.overview}</p>
                  <blockquote className="block-quote-objectives">
                    <p>Objectives:</p>
                    {course.objectives.map((objective) => (
                      <cite className="blueColor">{objective}</cite>
                    ))}
                  </blockquote>
                  <div
                    className="kf-subtitle element-anim-1 scroll-animate"
                    data-animate="active"
                    style={{ marginTop: "2rem" }}
                  >
                    {" "}
                    Topics Covered:
                  </div>
                  <ul className=" element-anim-1 scroll-animate">
                    {course.topics.map((topic) => (
                      <li>{topic}</li>
                    ))}
                  </ul>
                  <br />
                  <div
                    className="kf-subtitle element-anim-1 scroll-animate"
                    data-animate="active"
                  >
                    {" "}
                    Program Structure:
                  </div>
                  <ul className=" element-anim-1 scroll-animate">
                    {course.structure.map((struct) => (
                      <li>{struct}</li>
                    ))}
                  </ul>
                  <br />
                  <div
                    className="kf-subtitle element-anim-1 scroll-animate"
                    data-animate="active"
                  >
                    {" "}
                    Who should attend this Course?
                  </div>
                  <ul className=" element-anim-1 scroll-animate">
                    {course.target_audience.map((target) => (
                      <li>{target}</li>
                    ))}
                  </ul>
                </div>
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
export default BlogSingle;
