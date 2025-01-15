import React, { useEffect, useRef } from "react";
import Alert from 'react-bootstrap/Alert';

const Output = (props) => {

  const { load } = props;

  const ref = useRef();
  
  useEffect(() => {

    if(load !== true) ref.current.innerHTML = load;
  }, [load]);

  return (

    <>

      <Alert className="mt-3" ref={ref} variant="light" />

    </>
    
  );
};

export default Output;