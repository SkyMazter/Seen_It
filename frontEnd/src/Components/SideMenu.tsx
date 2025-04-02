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
//import { Link } from "react-router-dom";

const SideMenu = () => {
  return (
    <div>
      <Container className="side-menu py-2 my-1">
        <Row>
          <Col className="side-menu-item">Home</Col>
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
        <DropdownItem title="Mapping">
          {/* icon */}
          <CiMap />
        </DropdownItem>

        <DropdownItem title="Networking">
          {/* icon */}
          <CiRouter />
        </DropdownItem>

        <DropdownItem title="Software">
          {/* icon */}
          <CiUsb />
        </DropdownItem>

        <DropdownItem title="Health">
          {/* icon */}
          <CiMedicalCross />
        </DropdownItem>

        <DropdownItem title="Environmental">
          {/* icon */}
          <CiWheat />
        </DropdownItem>

        <DropdownItem title="Entertainment">
          {/* icon */}
          <CiMonitor />
        </DropdownItem>
      </Dropdown>
      <Dropdown title="Other"></Dropdown>
    </div>
  );
};

export default SideMenu;
