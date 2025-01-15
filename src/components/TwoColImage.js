import React from "react";

const TwoColImage = (props) => {

  const { heading, paragraph, children } = props;
  
  return (
    
    <section className="two-col-image py-5 ps-md-0 pt-md-0 pb-md-0 pe-md-0 ps-xl-5 g-0" >

      <div className="row justify-content-center justify-content-md-between g-0">
    
        <div className="col-10 col-md-7 col-xl-6 pt-md-5 pb-md-5 mt-md-5 g-0">

          <div className="row h-100 justify-content-center g-0">

              <div className="col-12 col-md-9 col-lg-8">

                <h2 className="pb-1 mt-lg-5 mb-0">
                  
                  {heading}

                </h2>

                <hr className="pb-md-2"/>

                <p className="mb-4 mt-2 mb-md-5 pe-md-3">

                  {paragraph}

                </p>

              </div>

            </div>
            
        </div>

        <div className="col-10 col-md-5 col-xl-6 mx-auto mt-3 m-md-0">

          {children}
                    
        </div>

      </div>

    </section>

  );
};

export default TwoColImage;