// import node module libraries
import { Col, Row, Container } from 'react-bootstrap';
import withAdminAuth from '@/utils/withAdminAuth';
// import widget as custom components
import PageHeading from '@/admin/widgets/PageHeading';

// import sub components

import ShowWorkshopsPage from '@/admin/sub-components/workshops/showWorkshops';
import AddWorkshop from '@/admin/sub-components/workshops/addWorkshop';

const Workshops = () => {
  const handleGrinderInsert = (grinderData) => {
    console.log("Grinder received in parent:", grinderData);
    // You can now send this data to an API or update state
  };
  const theme = {
    blue: "#134E97", // Dodger Blue
    white: "#F1F1F1", // Pure white
    orange: "#F57B35", // Classic orange
  };

  return (
    <Container  className="p-6" style={{backgroundColor:theme.blue}} >
      {/* Page Heading */}
      <PageHeading heading="Workshops"/>

   
      {/* content */}
      <div className="py-6"   >
      
        <Row >
       <Col style={{margin:"auto"}}  xl={9}>
          {/* About Me */}
          <AddWorkshop onInsert={handleGrinderInsert} />
          </Col>
        <hr style={{width:"50%",margin:" auto "}}/>
        <Col style={{margin:"auto"}}  xl={11} >
          <ShowWorkshopsPage />
          </Col>
        </Row>
      </div>

    </Container>
  )
}

export default withAdminAuth(Workshops);