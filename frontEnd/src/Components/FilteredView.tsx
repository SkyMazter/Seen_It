import { useParams } from "react-router";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Post from "./Post";

interface Posts {
  id: string;
  title: string;
  category: string;
  description: string;
  filePath: string;
  fileName: string;
  username: string;
}

const FilteredView = () => {
  const [show, setShow] = useState<boolean>(false);
  const [posts, setPosts] = useState<Posts[]>([]);
  const param = useParams();

  const handleGetFilteredPosts = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/posts/filter?category=${param.category}`
      );
      const data = await response.json();

      setPosts(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  const style = {
    overflow: "auto",
  };
  useEffect(() => {
    handleGetFilteredPosts();
    setShow(true);
  }, [param]);

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
      </Container>
    </div>
  );
};

export default FilteredView;
