import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface Props {
  username: string;
  description: string;
  title: string;
  category: string | undefined;
  file: string | undefined;
}

const Post = ({ username, description, category, title }: Props) => {
  return (
    <div className="outer-post">
      <Container fluid className="my-1 py-3 post">
        <Row>
          <Col className="d-flex justify-content-start align-items-center">
            @{username}
          </Col>
          <Col className="d-flex justify-content-end align-items-center">
            <Badge pill bg="danger">
              {category}
            </Badge>
          </Col>
        </Row>
        <Row>
          <Col className="post-title">{title}</Col>
        </Row>
        <Row>
          <Col className="post-description">{description}</Col>
        </Row>
        <Row>
          <Col>
            <Button variant="outline-success" className="me-2">
              {" "}
              Download{" "}
            </Button>
            <Button variant="outline-dark"> Preview </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Post;
