import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../Components/NavBar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SideMenu from "../Components/SideMenu";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <NavBar />
      <Container fluid style={{ height: "90vh" }}>
        <Row>
          <Col
            lg={2}
            className="d-none d-lg-block border-end border-secondary-subtle"
          >
            <SideMenu />
          </Col>
          <Col style={{ height: "90vh", overflow: "scroll" }}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
