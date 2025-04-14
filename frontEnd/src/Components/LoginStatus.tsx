import { Button, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

interface Props {
  isLoggedIn: boolean;
}

const LoginStatus = ({ isLoggedIn }: Props) => {
  const currentUsrn: string = useAppSelector((state) => state.user.username);
  if (isLoggedIn == false)
    return (
      <Link to="/Login">
        <Button variant={"outline-dark"}>Login</Button>
      </Link>
    );
  return <Navbar.Text>@{currentUsrn}</Navbar.Text>;
};

export default LoginStatus;
