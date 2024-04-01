import React from "react";
import Alert from 'react-bootstrap/Alert';

const Output = (props) => {

  const { load } = props;
  
  function createMarkup() {
    return {__html: load};
  }

  return (
    <React.Fragment>
      <br />
      <Alert variant="light" >
        <span dangerouslySetInnerHTML={createMarkup()} />
      </Alert>
    </React.Fragment>
  );
}

export default Output;