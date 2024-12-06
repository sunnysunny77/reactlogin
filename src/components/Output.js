import React from "react";
import Alert from 'react-bootstrap/Alert';

const Output = (props) => {

  const { load } = props;
  
  return (
    <React.Fragment>

      <Alert variant="light" >

        {load}
        
      </Alert>

    </React.Fragment>
  );
}

export default Output;