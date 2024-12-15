import React from "react";
import Alert from 'react-bootstrap/Alert';

const NotFound = () => {
  return (
    <> 

      <Alert variant="light">

        <h1 className="my-3">4
          
          04 Not Found
          
        </h1>

        <Alert.Link href="./">
        
          Return
        
        </Alert.Link>

      </Alert>
        
    </>
  );
}

export default NotFound;