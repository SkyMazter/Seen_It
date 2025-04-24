import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";
import Modal from "react-bootstrap/Modal";

import {
  CiMap,
  CiRouter,
  CiUsb,
  CiMedicalCross,
  CiWheat,
  CiMonitor,
} from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SideMenu = () => {
  const [active, setActive] = useState<string>("home");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  // const [input, setInput] = useState<string>("");

  const navigate = useNavigate();

  const handleShowSearch = (): void => {
    setShowSearch(!showSearch);
  };

  // const handleInput = (): void => {};

  return (
    <div>
      <Container className="side-menu py-2 my-1">
        <Row>
          <Col
            className={
              active == "home" ? "side-menu-item " + "active" : "side-menu-item"
            }
            onClick={() => {
              setActive("home");
              navigate("/");
            }}
          >
            <Link to="/" className="side-menu-text">
              Home
            </Link>
          </Col>
        </Row>
        <Row>
          <Col className="side-menu-item side-menu-text">Popular</Col>
        </Row>
        <Row>
          <Col
            className="side-menu-item side-menu-text"
            onClick={handleShowSearch}
          >
            Search
          </Col>
        </Row>
        <Row></Row>
      </Container>

      <Dropdown title="Categories" openOnLoad={true}>
        <Link to="/mapping" className="side-menu-text">
          <DropdownItem title="Mapping">
            {/* icon */}
            <CiMap />
          </DropdownItem>
        </Link>

        <Link to="/networking" className="side-menu-text">
          <DropdownItem title="Networking">
            {/* icon */}
            <CiRouter />
          </DropdownItem>
        </Link>

        <Link to="/software" className="side-menu-text">
          <DropdownItem title="Software">
            {/* icon */}
            <CiUsb />
          </DropdownItem>
        </Link>

        <Link to="health" className="side-menu-text">
          <DropdownItem title="Health">
            {/* icon */}
            <CiMedicalCross />
          </DropdownItem>
        </Link>

        <Link to="environmental" className="side-menu-text">
          {" "}
          <DropdownItem title="Environmental">
            {/* icon */}
            <CiWheat />
          </DropdownItem>
        </Link>

        <Link to="entertainment" className="side-menu-text">
          {" "}
          <DropdownItem title="Entertainment">
            {/* icon */}
            <CiMonitor />
          </DropdownItem>
        </Link>
      </Dropdown>
      <Dropdown title="Other"></Dropdown>

      <Modal size="lg" show={showSearch} onHide={handleShowSearch} centered>
        <div
          className="d-flex"
          style={{
            padding: "1rem",
          }}
        >
          <input
            type="text"
            placeholder="What are you looking for?"
            style={{
              width: "100%",
              padding: "0.5rem",
            }}
          />
          <button type="submit" onClick={handleShowSearch}>
            Go
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SideMenu;
