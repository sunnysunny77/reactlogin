import React, { useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Linkedin } from 'react-bootstrap-icons';

const Footer = (props) => {

  const year = useRef();

  const { auth, setAuth, setIsScrolling } = props;

  const scroll_to = () => {

    window.scrollTo(0, 0);
    setIsScrolling(0);
  }

  useEffect(() => {

    const date = new Date();
    const year_date = date.getFullYear();
    year.current.innerHTML = year_date;
  }, [])  

  return (
    
    <>  

      <footer>

        <div className="container-lg py-3 py-lg-5 g-0">

          <div className="row justify-content-xxl-center px-4 py-4 py-md-5 g-0">

            <div className="col-12 col-xxl-11 pb-2 pb-md-4">

              <div className="row d-flex flex-column-reverse flex-md-row justify-content-md-between g-0">

                <div className="col-12 col-md-7 pt-3 pt-md-0">

                  <hr className="w-100"/>

                  <div className="row justify-content-between justify-content-sm-around g-0 mt-4 mt-md-0">

                    <div className="col-auto pb-3 ps-1 pe-3">

                      <Link to="/">
                      
                        <svg aria-label="Super Foods" viewBox="0 0 100 100" width="40" height="40">

                          <defs>

                              <path 

                                  id="circle" 
                                  d="M 50, 50
                                  m -37, 0
                                  a 37,37 0 1,1 74,0
                                  a 37,37 0 1,1 -74,0" 
                                  
                              />

                          </defs>

                          <text className="font">

                              <textPath href="#circle">

                                Super --- Food ----------

                              </textPath>

                          </text>

                        </svg>

                      </Link>

                    </div>

                    <div className="col-9">

                      <p className="m-0">

                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation.

                      </p>

                    </div>

                  </div>

                </div>

                <div className="col-4 col-md-2">

                  <hr className="w-100"/>

                  <ul className="list-unstyled text-md-end m-0 p-0">

                    <li>

                      <NavLink to="/"> 
                      
                        Home 
                      
                      </NavLink>

                    </li>

                    <li>

                      <NavLink to="store"> 
                      
                        Store 
                        
                      </NavLink>

                    </li>

                    <li>

                      {auth ? 

                        ( 
                          
                          <Link onClick={setAuth}> 
                          
                            Sign out 
                            
                          </Link>

                        ) : (

                          <Link to="store"> 
                          
                            Sign in 
                            
                          </Link>

                        )

                      }

                    </li>

                  </ul>

                </div>

              </div>

            </div>

            <div className="col-12 col-xxl-11">

              <hr className="w-100" />  

              <div className="row w-100 g-0">

                <div className="col-8">

                  <address>
    
                    7c Yander Drive Eeast Welsbrough

                  </address>

                  <a href="tel:+61435987875">+61 435 987 875</a>

                </div>

                <div className="col-8 d-flex mt-3">

                  <Link aria-label="LinkedIn" to="/"> 
                          
                    <Linkedin />
          
                  </Link>

                </div>

                <div className="col-12">

                  <p className="mb-0 text-end">

                    &copy;&nbsp;<span ref={year} id="year"></span>

                  </p>

                </div>

                <div className="col-12 d-flex flex-wrap justify-content-end mt-3">

                  <Link onClick={scroll_to} className="top" aria-label="Return to top">
                    
                    &#8593;
                    
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>
              
      </footer>
          
    </> 

  );
}

export default Footer;