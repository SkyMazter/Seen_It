import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import PopUp from "../Components/PopUp";
import { useDispatch } from "react-redux";
import { setActive } from "../state/slices/loginSlice";
import { setUserID, setUsername } from "../state/slices/userSlice";

interface loginData {
  username: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState<loginData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>();

  //click handler
  const handleLogin = () => {
    setError(false);
    callLogin();
  };

  //input field handler
  const handleInputField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const callLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();

      if (response.ok) {
        dispatch(setActive());
        dispatch(setUsername(res.username));
        dispatch(setUserID(res.user_id));
        navigate("/");
      } else {
        setError(true);
        setErrorText(res.error);
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
          <h1>Login</h1>
          <PopUp
            isActive={error}
            text={errorText || "Unknown issue, Please try again"}
          ></PopUp>
          <Form>
            <InputGroup className="my-3">
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              <Form.Control
                type="Username"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                name="username"
                value={data.username}
                onChange={handleInputField}
              />
            </InputGroup>
            <InputGroup className="my-3">
              <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Input Here"
                aria-label="Password"
                aria-describedby="basic-addon1"
                name="password"
                value={data.password}
                onChange={handleInputField}
              />
            </InputGroup>
            <Link to="/SignUp">
              <Button variant="link">Don't have an account?</Button>
            </Link>
          </Form>
        </Col>
      </Row>

      <Row className="h-auto py-2 justify-content-center">
        <Col xs={5} lg={2}>
          <div className=" d-flex justify-content-start">
            <Button variant="success" type="submit" onClick={handleLogin}>
              Login
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

export default Login;
