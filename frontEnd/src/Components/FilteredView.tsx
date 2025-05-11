import { useParams } from "react-router";
import { useState, useEffect, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Post from "./Post";
import Button from "react-bootstrap/Button";
import missingLogo from "../assets/missing.png";

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
  const apiUrl = import.meta.env.VITE_API_URL;
  const [show, setShow] = useState<boolean>(false);
  const [posts, setPosts] = useState<Posts[]>([]);
  const [postCount, setPostCount] = useState<number>(30);

  const param = useParams();

  const handleGetFilteredPosts = useCallback(async () => {
    try {
      const response = await fetch(
        `${apiUrl}/posts/filter?category=${param.category}&n=${postCount}`,
      );
      const data = await response.json();

      setPosts(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }, [param, postCount, apiUrl]);

  const handleSearchResults = useCallback(async () => {
    try {
      const response = await fetch(
        `${apiUrl}/posts/search?search=${param.category}`,
      );
      const data = await response.json();

      setPosts(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }, [param, apiUrl]);

  const style = {
    overflow: "auto",
  };

  const handleLoadMore = () => {
    setPostCount(postCount + 20);
  };

  useEffect(() => {
    switch (param.category) {
      case "networking":
        handleGetFilteredPosts();
        setShow(true);
        break;
      case "entertainment":
        handleGetFilteredPosts();
        setShow(true);
        break;
      case "health":
        handleGetFilteredPosts();
        setShow(true);
        break;
      case "environmental":
        handleGetFilteredPosts();
        setShow(true);
        break;
      case "mapping":
        handleGetFilteredPosts();
        setShow(true);
        break;
      case "software":
        handleGetFilteredPosts();
        setShow(true);
        break;

      default:
        handleSearchResults();
        setShow(true);
    }
  }, [handleGetFilteredPosts, handleSearchResults, param]);

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
        <Row xs={12}>
          <Col className="d-flex justify-content-center py-1">
            {posts.length == 0 ? (
              <Container>
                <Row>
                  <Col className="d-flex justify-content-center">
                    <img className="logo" src={missingLogo}></img>
                  </Col>
                </Row>
                <Row>
                  <Col className="d-flex justify-content-center">
                    <h3>
                      It seems there are no posts for what you are looking for.
                      Be the first to post!
                    </h3>
                  </Col>
                </Row>
              </Container>
            ) : (
              <Button variant="light" onClick={handleLoadMore}>
                Load More
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FilteredView;
