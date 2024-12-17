import React from "react";

const TwoColImage = (props) => {

  const { heading, paragraph } = props;
  
  return (
    
    <section className="two-col-image py-5 ps-md-0 pt-md-0 pb-md-0 pe-md-0 ps-xl-5 g-0" >

      <div className="row justify-content-center g-0">
    
        <div className="col-10 col-md-6 ps-lg-5 pt-md-5 pb-md-5 ps-md-5 g-0">

          <div className="row h-100">

              <h2 className="pb-3 mt-lg-5">
              
                {heading}

              </h2>

              <hr className="pb-2"/>

              <div className="col-12 col-md-10 col-xl-9">

                <p className="mb-md-5">

                  {paragraph}

                </p>

              </div>

            </div>
            
        </div>

        <div className="col-10 col-md-6 mx-auto mt-3 mt-md-0">

          {props.children}
                    
        </div>

      </div>

    </section>

  )
}

export default TwoColImage;