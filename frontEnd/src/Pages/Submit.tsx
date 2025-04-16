import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";

import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import { useState } from "react";

const Submit = () => {
  const currentUsrn: string = useAppSelector((state) => state.user.username);
  const currentUsrId: number = useAppSelector((state) => state.user.user_id);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: currentUsrId,
    title: "",
    username: currentUsrn,
    category: "",
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleShow = () => {
    if (show) setShow(false);
    else setShow(true);
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]); // Store the selected file
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const postData = new FormData();

    postData.append("userId", String(formData.userId));
    postData.append("title", formData.title);
    postData.append("username", formData.username);
    postData.append("category", formData.category);
    postData.append("description", formData.description);

    if (!file) {
      setErrorMessage("There is no file attached, Please attach a file!");
      handleShow();
      return;
    } else {
      postData.append("file", file);
    }

    try {
      const response = await fetch("http://localhost:3001/posts/new", {
        method: "POST",
        body: postData,
      });

      if (response.ok) {
        alert("File uploaded successfully!");
        navigate("/");
      } else {
        setErrorMessage("File upload failed due to missing information!");
        console.error("Error uploading file:", postData);
        handleShow();
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

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
                placeholder="My New Post"
                aria-describedby="basic-addon2"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              ></Form.Control>
            </InputGroup>

            <InputGroup className="my-3">
              <InputGroup.Text>Category</InputGroup.Text>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option> Please Select a Category...</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Networking">Networking</option>
                <option value="Software">Software</option>
                <option value="Health">Health</option>
                <option value="Environmental">Environmental</option>
                <option value="Mapping">Mapping</option>
              </Form.Select>
            </InputGroup>

            <Form.Label>File</Form.Label>
            <InputGroup className="">
              <InputGroup.Text>{"=>"}</InputGroup.Text>
              <Form.Control
                type="file"
                onChange={handleFileChange}
                required
              ></Form.Control>
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
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row className="h-auto py-2 ">
        <Col className="d-flex justify-content-start align-items-center">
          <Button variant="success" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
          <Link to="/">
            <Button variant={"outline-danger"} className="ms-3">
              Cancel
            </Button>
          </Link>
        </Col>
      </Row>

      <Modal size="lg" show={show} onHide={handleShow} centered>
        <div className="bg-danger-subtle rounded-2">
          <h3 className="p-3 text-center m-3">{errorMessage}</h3>
        </div>
      </Modal>
    </Container>
  );
};

export default Submit;
