import { Link } from "react-router-dom";
import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navigation = (props) => {

  const { auth, setAuth } = props;

  const navigate = useNavigate();

  const navbar_toggler = useRef();
  const navbar_collapse = useRef();

  const toogle = () => {

    let max_height;

    navbar_toggler.current.classList.toggle("has-collapsed");

    if (navbar_toggler.current.classList.contains("has-collapsed")) {
      max_height = 0;
    }  else {
      max_height = navbar_collapse.current.scrollHeight;
    }

    navbar_collapse.current.style.maxHeight = `${max_height}px`;
  }

  useEffect(() => {

    if (!navbar_toggler.current.classList.contains("has-collapsed")) {

      navbar_collapse.current.style.maxHeight = "0px";
      navbar_toggler.current.classList.add("has-collapsed");
    }

    window.scrollTo(0,0);
  }, [navigate])

  return (  

    <nav className="container-fluid slider_8-navigation navigation d-flex align-items-center border-bottom p-0">

      <div className="row w-100 justify-content-between m-0 g-0">

        <Link className="col-auto m-2 me-3"  to="/" >

          <svg aria-label="Super Foods" viewBox="0 0 100 100" width="60" height="60">

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

        <div ref={navbar_toggler} onClick={toogle} 
          aria-label="menu" role="button" className="col-auto d-flex align-items-center slider_8-navbar-toggler navbar-toggler has-collapsed border-start p-4"
          >

          <div>

            <div className="slider_8-bar1"></div>

              <div className="slider_8-bar2"></div>

              <div className="slider_8-bar3"></div>

            </div>

          </div>

        {auth ? (

            <div ref={navbar_collapse} className="col-12 slider_8-navbar-collapse navbar-collapse border-top">

              <ul className="list-unstyled ms-3 my-3">

                <li className="mb-1"><Link to="/" > Home </Link></li>

                <li className="mb-1"><Link to="store" > Store </Link></li>

                <li><Link onClick={setAuth} > Sign out </Link></li>
            
              </ul>

            </div>

          ) : (

            <div ref={navbar_collapse} className="col-12 slider_8-navbar-collapse navbar-collapse border-top">

              <ul className="list-unstyled ms-3 my-3">

                <li className="mb-1"><Link to="/" > Home </Link></li>

                <li className="mb-1"><Link to="auth" > Store </Link></li>

                <li><Link to="auth"  > Sign in </Link></li>
                            
              </ul>

            </div>

          )}

      </div>

    </nav>
    
  )
  
}

export default Navigation;
