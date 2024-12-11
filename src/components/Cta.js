import React from "react";
import { ArrowRight } from 'react-bootstrap-icons';

const Cta = (props) => {

  return (
    <>  

      <div className="container my-lg-5 cta g-0">

        <a href="./" className="row justify-content-center justify-content-lg-between my-5 g-0">

            <div className="col-10 col-md-4 col-lg-12 d-flex align-items-xl-center">

                <h2 className="w-100 m-0 py-3 px-md-4 py-md-5 p-lg-5 text-center text-md-start">
                    
                    {props.heading}
                    
                </h2>

            </div>


            <div className="col-10 col-md-8 d-flex align-items-center">

                <p className="m-0 py-3 py-md-5 pe-md-5 ps-lg-5">

                    {props.paragraph} 
                    
                </p>

            </div>

            <div className="col-11 col-lg-3 d-flex align-items-end justify-content-md-center py-3 px-sm-2 py-sm-4 p-lg-4">

                <button className="w-100 text-start py-3 px-4">
                    
                    {props.button}  <ArrowRight className="ms-3" />
                    
                </button>

            </div>

        </a>
     
      </div>
          
    </>
  );
}

export default Cta;