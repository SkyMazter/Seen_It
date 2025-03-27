import Alert from 'react-bootstrap/Alert';
// import { useState } from 'react';

interface Props {
    isActive: boolean;
    text: string;
}

const PopUp = ({isActive, text}:Props) => {
 // const [show, setShow] = useState(isActive);

  if(isActive) {
    return (
        <Alert variant='danger'  dismissible>
            <Alert.Heading>{text}</Alert.Heading>
        </Alert>
      )
  }
}

export default PopUp
