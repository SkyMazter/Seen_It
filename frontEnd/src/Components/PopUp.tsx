import Alert from "react-bootstrap/Alert";

interface Props {
  isActive: boolean;
  text: string;
}

const PopUp = ({ isActive, text }: Props) => {
  if (isActive) {
    return (
      <Alert variant="danger" dismissible>
        <Alert.Heading>{text}</Alert.Heading>
      </Alert>
    );
  }
};

export default PopUp;
