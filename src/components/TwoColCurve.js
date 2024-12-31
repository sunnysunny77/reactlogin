import React from "react";

const TwoColCurve = (props) => {

  const { heading, paragraph, children } = props;
  
  return (
    
    <div className="two-col-curve container-fluid position-relative overflow-hidden g-0">

      <div className="row flex-column flex-sm-row justify-content-end g-0">

        <div className="curve col-12 col-md-9 col-lg-8 d-flex justify-content-end px-3 px-md-4 py-sm-5 px-lg-5">

          <div className="inner-curve col-11 d-flex flex-column g-0 ">  

            <div className="row justify-content-end mb-0 px-3 py-5 p-md-3 g-0">

              <b className="col-12 col-xxl-11 mb-3 mb-md-4">

                {heading}

              </b>

              <p className="col-12 col-xxl-11 text-end ps-md-4 m-0">

                {paragraph}

              </p>

            </div>

          </div>

        </div>

        {children}

      </div>

    </div> 

  )
}

export default TwoColCurve;