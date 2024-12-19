import React from "react";
import Alert from 'react-bootstrap/Alert';
import Header from "./Header";
import Lost from "../images/404.webp";

const NotFound = () => {

  return (
    
    <>

      <Header heading="Not found" /> 

      <Alert className="w-100 py-5 d-flex flex-wrap align-items-center justify-content-center" variant="light">

        <div className="w-100">

          <Alert.Link href="./">
            
            Return
          
          </Alert.Link>

          <img src={Lost} alt="Finance" width="360" height="360" />
        
        </div>

      </Alert>
  
    </>
    
  );
}

export default NotFound;