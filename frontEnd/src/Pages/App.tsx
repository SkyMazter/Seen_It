import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../Components/NavBar";
import PostView from "../Components/PostView";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SideMenu from "../Components/SideMenu";

const App = () => {
  return (
    <>
      <NavBar />
      <Container fluid style={{ height: "93vh" }}>
        <Row>
          <Col lg={2} className="d-none d-sm-block">
            <SideMenu />
          </Col>
          <Col style={{ height: "93vh", overflow: "scroll" }}>
            <PostView />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
