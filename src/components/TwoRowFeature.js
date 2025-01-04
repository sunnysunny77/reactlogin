import React from "react";

const TwoRowFeature = (props) => {

  const { heading_top, heading_bottom, paragraph, children} = props;

  return (

    <>  

      <div className="two-row-feature">

          <div className="row position-relative g-0">

            <div className="d-none d-lg-block col-lg-1"></div>

            <div className="col-12 col-lg-11 px-4 px-sm-5 pe-lg-0 pe-xxl-5">

              <div className="down row justify-content-end justify-content-lg-between align-items-stretch pe-lg-5 g-0">

                <div className="col-12 up-thirds position-relative pt-5 py-lg-5 z-0 order-1">
                  
                  <h2 className="mb-0 mt-2 mt-sm-5">

                    <div className="row g-0">

                      <div className="col-10 col-xl-9 col-xxl-12">

                        {heading_top}

                      </div>

                      <div className="lower col-6">

                        {heading_bottom}

                      </div>

                    </div>

                  </h2>

                </div>

                <div className="col-12 col-lg-9 col-xl-8 order-last order-lg-2">

                  <div className="row justify-content-center mb-5 pb-xl-5 g-0">

                    <div className="col-11 col-xl-12 mb-5 order-2 order-lg-1">

                      <p className="mb-0 text-center text-md-start">

                        {paragraph}

                      </p>

                    </div>

                    <div className="points col-12 col-lg-12 col-xxl-9 py-4 px-3 mt-lg-5 mb-5 order-1 order-lg-2">

                      <div className="row text-center g-0">

                        <div className="col-12 col-md-4 p-3">

                          3K

                          <div className="tag">
                            
                            elit lectus
                            
                          </div>

                        </div>

                        <div className="col-12 col-md-4 p-3">

                          5K

                          <div className="tag">
                            
                            gravida dolor
                            
                          </div>

                        </div>

                        <div className="col-12 col-md-4 p-3">

                          10K
                          
                          <div className="tag">
                            
                            velit magna
                            
                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

                <div className="up col-5 col-md-3 position-relative z-1 order-2 order-lg-3">

                  {children}

                </div>

              </div>

            </div>

          </div>

      </div>
      
    </>
    
  );
}

export default TwoRowFeature;