import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";
import {
  CiMap,
  CiRouter,
  CiUsb,
  CiMedicalCross,
  CiWheat,
  CiMonitor,
} from "react-icons/ci";
import { Link } from "react-router-dom";

const SideMenu = () => {
  return (
    <div>
      <Container className="side-menu py-2 my-1">
        <Row>
          <Col className="side-menu-item">
            {" "}
            <Link to="/"> Home</Link>
          </Col>
        </Row>
        <Row>
          <Col className="side-menu-item">Popular</Col>
        </Row>
        <Row>
          <Col className="side-menu-item">Search?</Col>
        </Row>
        <Row></Row>
      </Container>

      <Dropdown title="Categories" openOnLoad={true}>
        <Link to="/mapping">
          <DropdownItem title="Mapping">
            {/* icon */}
            <CiMap />
          </DropdownItem>
        </Link>

        <Link to="/networking">
          <DropdownItem title="Networking">
            {/* icon */}
            <CiRouter />
          </DropdownItem>
        </Link>

        <Link to="/software">
          <DropdownItem title="Software">
            {/* icon */}
            <CiUsb />
          </DropdownItem>
        </Link>

        <Link to="health">
          <DropdownItem title="Health">
            {/* icon */}
            <CiMedicalCross />
          </DropdownItem>
        </Link>

        <Link to="environmental">
          {" "}
          <DropdownItem title="Environmental">
            {/* icon */}
            <CiWheat />
          </DropdownItem>
        </Link>

        <Link to="entertainment">
          {" "}
          <DropdownItem title="Entertainment">
            {/* icon */}
            <CiMonitor />
          </DropdownItem>
        </Link>
      </Dropdown>
      <Dropdown title="Other"></Dropdown>
    </div>
  );
};

export default SideMenu;
