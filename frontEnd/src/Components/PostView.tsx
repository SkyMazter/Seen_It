import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Post from "./Post";
import { useState, useEffect, useCallback } from "react";

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
  const [postCount, setPostCount] = useState<number>(30);

  const style = {
    overflow: "auto",
  };

  const handleGetPosts = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/posts/last?n=${postCount}`,
      );
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  }, [postCount]);

  const handleLoadMore = () => {
    setPostCount(postCount + 20);
  };

  useEffect(() => {
    handleGetPosts();
    setShow(true);
  }, [handleGetPosts]);

  return (
    <div>
      <Container fluid={"sm"} style={style}>
        <Row>
          <Col className="">
            {show
              ? posts.map((post, index) => (
                  <Post
                    fileName={post.fileName}
                    filePath={post.filePath}
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
        <Row>
          <Col>
            <button onClick={handleLoadMore}>Load More</button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PostView;
