// import node module libraries
import { Col, Row, Container } from 'react-bootstrap';

// import widget as custom components
import PageHeading from '@/admin/widgets/PageHeading';

// import sub components
// import {
//   AboutMe,
//   RecentFromBlog
// } from 'sub-components'


import InsertCoffee from '@/admin/sub-components/coffees/addCoffee';
import { RecentFromBlog } from '@/admin/sub-components';

const Profile = () => {
  const theme = {
    blue: "#134E97", // Dodger Blue
    white: "#F1F1F1", // Pure white
    orange: "#F57B35", // Classic orange
  };

  return (
    <Container  className="p-6" style={{backgroundColor:theme.blue}} >
      {/* Page Heading */}
      <PageHeading heading="Coffees"/>

   
      {/* content */}
      <div className="py-6"   >
      
        <Row >
       <Col style={{margin:"auto"}}  xl={9}>
          {/* About Me */}
          <InsertCoffee />
          </Col>
        <hr style={{width:"50%",margin:" auto "}}/>
        <Col style={{margin:"auto"}}  xl={11} >
          <RecentFromBlog />
          </Col>
        </Row>
      </div>

    </Container>
  )
}

export default Profile