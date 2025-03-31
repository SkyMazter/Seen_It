import { useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { CiSquareChevUp } from "react-icons/ci";

interface props {
  children?: React.ReactNode;
  title: string;
}

const Dropdown = ({ children, title }: props) => {
  const [dropdown, setDropdown] = useState<string>("dropdown-closed");
  const handleDropdown = () => {
    if (dropdown == "dropdown-closed") {
      setDropdown("dropdown-open");
    } else {
      setDropdown("dropdown-closed");
    }
  };
  return (
    <Container fluid className={dropdown}>
      <Row
        style={{
          position: "static",
        }}
      >
        <Col className="dropdown-title d-flex justify-content-start align-items-center">
          {title}
        </Col>
        <Col className=" d-flex justify-content-end align-items-center">
          <CiSquareChevUp
            onClick={handleDropdown}
            className={
              dropdown == "dropdown-open"
                ? "dropdown-icon-rotate"
                : "dropdown-icon-center"
            }
          />
        </Col>
      </Row>
      <div
        style={{
          height: "80%",
          overflowY: "scroll",
          marginTop: "5px",
        }}
      >
        {children}
      </div>
    </Container>
  );
};

export default Dropdown;
