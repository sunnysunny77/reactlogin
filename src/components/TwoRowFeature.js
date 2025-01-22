import React from "react";
import { Check } from 'react-bootstrap-icons';

const TwoRowFeature = (props) => {

  const { heading_top, heading_bottom, paragraph, children, items } = props;

  return (

    <>  

      <div className="two-row-feature">

          <div className="row position-relative g-0">

            <div className="d-none d-lg-block col-lg-1"></div>

            <div className="col-12 col-lg-11 px-4 px-sm-5 pe-lg-0 pe-xxl-5">

              <div className="row justify-content-end justify-content-lg-between align-items-stretch pe-lg-5 mb-5 g-0">

                <div className="col-12 position-relative pt-5 py-lg-5 z-0 order-1">
                  
                  <h2 className="mb-0 mt-2 mt-sm-5 mb-lg-5">

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

                <div className="col-12 col-lg-9 col-xl-8 order-3 order-lg-1 pt-lg-5">

                  <div className="row justify-content-center g-0">

                    <div className="col-11 col-xl-12 order-3 order-lg-1">

                      <p className="mb-0 text-center text-md-start">

                        {paragraph}

                      </p>

                    </div>

                    <div className="points col-12 col-lg-12 col-xxl-9 py-4 px-3 mt-lg-5 mb-5 order-1 order-lg-3">

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

                <div className="col-5 col-md-3 position-relative z-1 order-2 order-lg-3">

                  {children}

                </div>

              </div>

            </div>

          </div>

      </div>
      
    </>
    
  );
};

export default TwoRowFeature;