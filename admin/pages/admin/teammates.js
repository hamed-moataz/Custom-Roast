// import node module libraries
import { Col, Row, Container } from 'react-bootstrap';

// import widget as custom components
import PageHeading from '@/admin/widgets/PageHeading';

// import sub components

import AddTeammate from '@/admin/sub-components/teammates/addTeammate';
import ShowTeammatesMembers from '@/admin/sub-components/teammates/showTeammates';

const TeammatesPage = () => {
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
      <PageHeading heading="Teammates"/>

   
      {/* content */}
      <div className="py-6 "   >
      
        <Row >
       <Col style={{margin:"auto"}}  xl={9}>
          {/* About Me */}
          <AddTeammate onAdd={handleGrinderInsert} />

          </Col>
        <hr style={{width:"50%",margin:" auto "}}/>
        <Col style={{margin:"auto"}}  xl={11} >
          < ShowTeammatesMembers />
          </Col>
        </Row>
      </div>

    </Container>
  )
}

export default TeammatesPage;