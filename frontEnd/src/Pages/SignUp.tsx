import { Button, Container, Form, InputGroup, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import PopUp from "../Components/PopUp";
import { useNavigate } from "react-router-dom";

interface signUpFormat {
  username: string;
  password: string;
  confirmation: string;
}

const SignUp = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState<signUpFormat>({
    username: "",
    password: "",
    confirmation: "",
  });

  const [error, setError] = useState<string>();
  const [isError, setIsError] = useState<boolean>(false);

  const handleInputField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setIsError(false);
    setCredentials((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSignUp = (): void => {
    setIsError(false);
    if (
      credentials.password == credentials.confirmation &&
      (credentials.password != "" || credentials.confirmation != "")
    ) {
      callSignUp();
    } else {
      setIsError(true);
      if (credentials.password != credentials.confirmation) {
        setError("Passwords do not match, please correct this error.");
      } else if (credentials.password == "" || credentials.confirmation == "") {
        setError("Cannot leave password fields empty.");
      } else {
        setError("Unknown Error, Please try Again.");
      }
    }
  };
  const callSignUp = async () => {
    try {
      const response = await fetch("http://localhost:3001/users/signup", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      });

      const res = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setIsError(true);
        setError(res.error);
        console.log({
          error: res.error,
        });
      }
    } catch (error) {
      console.log({
        error: error,
      });
    }
  };

  return (
    <Container
      fluid={"md"}
      className="position-absolute top-50 start-50 translate-middle"
    >
      <Row className="h-auto py-2 justify-content-around">
        <Col xs={10} lg={4}>
          <h1>Sign Up</h1>
          <PopUp
            isActive={isError}
            text={error || "Unknown issue, Please try again"}
          ></PopUp>
          <Form>
            <InputGroup className="my-3">
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              <Form.Control
                type="Username"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                autoComplete="off"
                name="username"
                value={credentials.username}
                onChange={handleInputField}
              />
            </InputGroup>
            <InputGroup className="my-3">
              <InputGroup.Text id="basic-addon1">={">"}</InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="basic-addon1"
                name="password"
                value={credentials.password}
                onChange={handleInputField}
              />
            </InputGroup>
            <InputGroup className="my-3">
              <InputGroup.Text id="basic-addon1">={">"}</InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                aria-label="Password"
                aria-describedby="basic-addon1"
                name="confirmation"
                value={credentials.confirmation}
                onChange={handleInputField}
              />
            </InputGroup>
            <Link to="/Login">
              <Button variant="link">Already have an account?</Button>
            </Link>
          </Form>
        </Col>
      </Row>

      {/* submit button */}
      <Row className="h-auto py-2 justify-content-center">
        <Col xs={5} lg={2}>
          <div className=" d-flex justify-content-start">
            <Button variant="success" type="submit" onClick={handleSignUp}>
              Submit
            </Button>
          </div>
        </Col>

        <Col xs={5} lg={2}>
          <div className=" d-flex justify-content-end">
            <Link to="/">
              <Button variant={"outline-danger"}>Cancel</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
