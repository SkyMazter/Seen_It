import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

const Submit = () => {
  const currentUsrn: string = useAppSelector((state) => state.user.username);
  return (
    <Container className="min-vh-100 my-5" fluid="sm">
      <Row className="justify-content-center">
        <Col>
          <h2>Submit New Post</h2>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col>
          <Form>
            <InputGroup className="my-3">
              <InputGroup.Text>@</InputGroup.Text>
              <Form.Control
                placeholder={currentUsrn}
                aria-describedby="basic-addon2"
                disabled
                readOnly
              ></Form.Control>
            </InputGroup>

            <InputGroup className="my-3">
              <InputGroup.Text>Post Title</InputGroup.Text>
              <Form.Control
                placeholder="My Document"
                aria-describedby="basic-addon2"
              ></Form.Control>
            </InputGroup>

            <InputGroup className="my-3">
              <InputGroup.Text>Category</InputGroup.Text>
              <Form.Select>
                <option> Tutorial/Instructions</option>
                <option value="1">Image</option>
                <option value="2">Document</option>
                <option value="3">Infographic</option>
                <option value="4">Other</option>
              </Form.Select>
            </InputGroup>

            <Form.Label>File</Form.Label>
            <InputGroup className="">
              <InputGroup.Text>={">"}</InputGroup.Text>
              <Form.Control type="file"></Form.Control>
            </InputGroup>

            <Form.Group
              className="my-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Give a short description of that you are uploading"
                rows={5}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row className="h-auto py-2 justify-content-evenly">
        <Col xs={3} md={1}>
          <Button variant="success" type="submit">
            Submit
          </Button>
        </Col>

        <Col xs={3} md={1}>
          <Link to="/">
            <Button variant={"outline-danger"}>Cancel</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Submit;
