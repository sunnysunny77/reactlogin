import React from "react";
import Alert from 'react-bootstrap/Alert';

const Output = (props) => {
  const { load } = props;
  return (
    <React.Fragment>
      <br />
      <Alert variant="light">
        <h1>{load}</h1>
      </Alert>
    </React.Fragment>
  );
}

export default Output;