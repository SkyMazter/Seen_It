import { Badge, Button } from "react-bootstrap";
interface Props {
  username: string;
  description: string;
  title: string;
  category: string | undefined;
  file: string | undefined;
}

const Post = ({ username, description, category, title }: Props) => {
  return (
    <div className="container-fluid bg-success-subtle my-3 p-3 shadow-sm rounded-4">
      <div className="row">
        <div className="col-5 col-md-3">
          <div className=" my-auto ">
            <h5>@{username}</h5>
          </div>
        </div>

        <div className="col-7 col-md-9 m-auto text-center">
          <h2>{title}</h2>
        </div>
      </div>

      <div className="row">
        <div className="col-auto">
          <h4>Description:</h4>
          <p className=" bg-body-secondary rounded p-2">{description}</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center my-auto">
            <div className=" bg-body-secondary rounded p-2">
              <strong>
                <p>Category:</p>
              </strong>
              <Badge pill bg="info">
                {category}
              </Badge>
            </div>
            <div className=" d-flex justify-content-evenly">
              <Button className="m-1">Download</Button>
              <Button variant="outline-info" className="m-1">
                Preview
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
