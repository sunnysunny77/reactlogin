import React from "react";

const TwoColText = (props) => {

  const { heading, paragraph } = props;
  
  return (
    
    <section className="two-col-text row justify-content-between justify-content-xxl-around mx-auto my-5 px-4 pb-4 p-lg-5 g-0">
    
      <div className="col-12 col-lg-3 my-xl-5">

        <h2 className="pt-4 ps-4">

          {heading}

        </h2>

      </div>
      
      <div className="row col-12 col-lg-8 my-xl-5">

        <div className="col-12 col-xxl-11 pt-4">

          <p className="m-0">

            {paragraph}
            
          </p>

        </div>

      </div>

    </section>

  )
}

export default TwoColText;