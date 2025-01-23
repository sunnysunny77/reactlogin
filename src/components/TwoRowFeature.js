import React from "react";
import { Check } from 'react-bootstrap-icons';

const TwoRowFeature = (props) => {

  const { heading_top, heading_bottom, paragraph, children, items } = props;

  return (

    <>  

      <div className="two-row-feature">

          <div className="row position-relative g-0">

            <div className="d-none d-lg-block col-lg-1"></div>

            <div className="col-12 col-lg-11 px-4 py-5 px-sm-5 ps-lg-5 my-3 my-md-5">

              <div className="row align-items-start justify-content-around justify-content-md-between pe-xl-5 g-0">

                <div className="col-6 col-md-9 position-relative  pb-4 pb-xxl-5 mb-xxl-5 z-0">
                  
                  <h2 className="mb-0">

                    <div className="row g-0">

                      <div className="col-12">

                        {heading_top}

                      </div>

                      <div className="lower col-7 col-md-8">

                        {heading_bottom}

                      </div>

                    </div>

                  </h2>

                </div>

                <div className="col-4 col-md-3 order-xxl-3 pb-4 pb-xxl-0">

                  {children}

                </div>

                <div className="col-12 col-lg-11 col-xxl-8 pt-5 order-xxl-2">

                  <div className="row justify-content-center g-0">

                    <div className="col-11 col-lg-12 col-xxl-12 order-3 order-lg-1">

                      <p className="mb-0 text-center text-md-start">

                        {paragraph}

                      </p>

                    </div>

                    <div className="points col-12 col-xl-10 py-4 px-3 mt-lg-5 mb-5 order-1 order-lg-3">

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

                    <div className="col-12 order-2 pt-3 pt-lg-5 mt-lg-3 mt-xxl-5">

                      <div className="row justify-content-center justify-content-sm-start g-0">

                        {items.map((index, i) => { 
                                            
                            const { heading, content } = index; 

                            return (

                              <div key={i} className="col-11 col-sm-6 col-xl-4 px-3">

                                <h3 className="py-2 px-4 mb-4 text-center">

                                  { heading }

                                </h3>

                                <ul className="row justify-content-center list-unstyled ms-0 mb-4 p-0 g-0">

                                  {content.map((index, i) => {
                                    
                                    const { item } = index;
                                        
                                    return (

                                      <li className="col-10 col-md-11 d-flex mb-3" key={i}>

                                        <div>

                                          <Check className="me-3" />

                                        </div>
                                      
                                        <div>

                                          { item }

                                        </div>

                                      </li>

                                    );

                                  })}

                                </ul>

                              </div>

                            ); 

                        })}

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

      </div>
      
    </>
    
  );
};

export default TwoRowFeature;