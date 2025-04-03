import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Post from "./Post";
import { useState, useEffect } from "react";

interface Posts {
  id: string;
  title: string;
  category: string;
  description: string;
  filePath: string;
  fileName: string;
  username: string;
}

const PostView = () => {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [show, setShow] = useState<boolean>(false);

  const style = {
    overflow: "auto",
  };

  const handleGetPosts = async () => {
    try {
      const response = await fetch("http://localhost:3001/posts/last");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetPosts();
    setShow(true);
  }, []);

  return (
    <div>
      <Container fluid={"sm"} style={style}>
        <Row>
          <Col className="">
            {show
              ? posts.map((post, index) => (
                  <Post
                    file=""
                    key={index}
                    username={post.username}
                    description={post.description}
                    title={post.title}
                    category={post.category}
                  ></Post>
                ))
              : ""}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PostView;
