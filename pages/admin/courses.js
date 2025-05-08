// import node module libraries
import { Col, Row, Container } from 'react-bootstrap';
import withAdminAuth from '@/utils/withAdminAuth';
// import widget as custom components
import PageHeading from '@/admin/widgets/PageHeading';

// import sub components

import ShowCoursesPage from '@/admin/sub-components/courses/showCourses';
import AddCourse from '@/admin/sub-components/courses/addCourse';
const Billing = () => {
  const theme = {
    blue: "#134E97", // Dodger Blue
    white: "#F1F1F1", // Pure white
    orange: "#F57B35", // Classic orange
  };

  return (
    <Container  className="p-6" style={{backgroundColor:theme.blue}} >
      {/* Page Heading */}
      <PageHeading heading="Courses"/>

   
      {/* content */}
      <div className="py-6"   >
      
        <Row >
       <Col style={{margin:"auto"}}  xl={9}>
          {/* About Me */}
          <AddCourse />
          </Col>
        <hr style={{width:"50%",margin:" auto "}}/>
        <Col style={{margin:"auto"}}  xl={11} >
          <ShowCoursesPage />
          </Col>
        </Row>
      </div>

    </Container>
  )
}

export default withAdminAuth(Billing);