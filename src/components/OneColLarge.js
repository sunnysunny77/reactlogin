import React from "react";

const OneColLarge = (props) => {

  const { heading, paragraph, bold, children } = props;
  
  return (
    
    <div className="one-col-large container-fluid position-relative overflow-hidden px-4 px-sm-5 pb-5 g-0">

      <div className="shpaes-top position-absolute">

        <div className="shapes-1 position-absolute"></div>

        <div className="shapes-2 position-absolute"></div>

      </div>

      <div className="row flex-column pt-md-4 ps-lg-4 mt-lg-4 ms-xl-5 g-0">

        <div className="col-12 pt-4 mt-4 mb-3">

          {children}

        </div>

        <div className="decoration col-10 col-md-8 col-lg-7 ps-4">

          <h2 className="my-2">

            {heading}

          </h2>

          <p className="my-2">
            
            {paragraph}
            
          </p>

        </div>

        <div className="col-10 col-md-8 col-lg-7 pt-4 mt-4">

          <b className="d-block my-5 pb-md-5"> 
            
            {bold}
            
          </b>

        </div>

      </div>

    </div>

  )
}

export default OneColLarge;