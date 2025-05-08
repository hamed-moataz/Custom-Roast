// import node module libraries
import { Row, Col } from 'react-bootstrap';
const theme = {
  blue: "#134E97",
  white: "#F1F1F1",
  orange: "#F57B35",
};
const PageHeading = props => {
  const { heading } = props;
  return (
    <Row>
      <Col lg={12} md={12} xs={12}>
        {/* Page header */}
        <div className="border-bottom pb-4 mb-4 ">
          <h3 className="mb-0 fw-bold"  style={{color:theme.white}}>{heading}</h3>
        </div>
      </Col>
    </Row>
  )
}

export default PageHeading