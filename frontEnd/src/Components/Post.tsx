import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { CiSaveDown1, CiShare1 } from "react-icons/ci";

interface Props {
  username: string;
  description: string;
  title: string;
  category: string | undefined;
  fileName: string;
  filePath: string;
}

const Post = ({
  username,
  description,
  category,
  title,
  fileName,
  filePath,
}: Props) => {
  const handlePreview = () => {
    const downloadUrl = `http://localhost:3001${filePath}`; // Construct the file URL
    console.log(downloadUrl);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName; // Suggest a filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleDownload = async () => {
    try {
      const downloadUrl = `http://localhost:3001${filePath}`; // Construct the file URL
      console.log(downloadUrl);
      // Fetch the file as a Blob
      const response = await fetch(downloadUrl);
      if (!response.ok) throw new Error("Failed to fetch file");

      const blob = await response.blob(); // Convert response to Blob

      // Create a temporary link
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName; // Set the download filename
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

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
            <Button
              variant="outline-success"
              className="me-2"
              onClick={handleDownload}
            >
              Download
              <CiSaveDown1 className="ms-1" />
            </Button>
            <Button variant="outline-dark" onClick={handlePreview}>
              Preview <CiShare1 className="ms-1" />
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Post;
