import { Button, Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginStatus from "./LoginStatus";
import { useAppSelector } from "../hooks/hooks";




const NavBar = () => {
  const logged_in: boolean = useAppSelector((state) => state.login.isActive)
  return (
    <Navbar expand="lg" className="bg-body-tertiary bg-info-subtle">
      <Container>
        <Link
          to={"/"}
          className="my-auto link-secondary link-offset-2 link-underline-opacity-0 "
        >
          <Navbar.Brand>EPNK Archive</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-between">
          <Nav className="me-auto">
            <Link to={"http://epnk"} className="my-auto">
              <Button
                variant={"link"}
                className="my-auto link-success link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover"
              >
                Home
              </Button>
            </Link>
            <Link to={"/Submit"} className="my-auto">
              <Button
                variant={"link"}
                className="my-auto link-success link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover"
              >
                Submit
              </Button>
            </Link>
            <Link to={"http://epnk"} className="my-auto">
              <Button
                variant={"link"}
                className="my-auto link-secondary link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover"
              >
                About
              </Button>
            </Link>
            <NavDropdown title="Useful Resources" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">How to Use</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">EPNK</NavDropdown.Item>
              <NavDropdown.Item href="/Exp">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Community Rules
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <LoginStatus isLoggedIn={logged_in} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
