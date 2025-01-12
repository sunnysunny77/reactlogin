import React, { useRef, useEffect, useState, useCallback } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

const Navigation = (props) => {

  const { auth, setAuth } = props;

  const navigate = useNavigate();

  const navbar_toggler = useRef();
  const navbar_collapse = useRef();
  const navbar = useRef();

  const [scrollY, setScrollY] = useState(0);

  const handle_collapse = (transition, height) => {

    navbar_toggler.current.classList.add("has-collapsed");

    Object.assign(navbar.current.style, {

      transition: transition,
      maxHeight: `${height}px`
    });
  };

  const toogle = () => {

    let max_height;

    navbar_toggler.current.classList.toggle("has-collapsed");

    if (navbar_toggler.current.classList.contains("has-collapsed")) {

      max_height = 83;
    }  else {
      
      max_height = navbar.current.scrollHeight;
    }

    navbar.current.style.maxHeight = `${max_height}px`;
  }

  const handle_navigationigation = useCallback(() => {
    
    let obj = {};

    let body = document.body;

    let height = 83;
  
    if (window.innerWidth >= 768) {

      obj.position = "absolute";
      obj.top = "0px";
      handle_collapse("max-height 0.375s", height);
      body.style.marginTop = "";
      Object.assign(navbar.current.style, obj);
      return;
    }

    height = 82;
    
    let positive = false;

    let scroll_pos = window.scrollY;

    const collapse = navbar_toggler.current.classList.contains("has-collapsed") ? height : height + navbar_collapse.current.getBoundingClientRect().height;

    const top = document.querySelector("header").getBoundingClientRect().height + height;

    if (scroll_pos > scrollY) {

      positive = true;
    } else if (scroll_pos < scrollY) {

      positive = false;
    }

    if (scroll_pos < collapse) {  

        obj.position = "static";
        obj.top = "initial";
        handle_collapse("max-height 0.375s", collapse);
        body.style.marginTop = "";
      } else if (scroll_pos > top && scroll_pos < top + height && !positive) {

        obj.position = "fixed";
        obj.top = `-${height}px`;
        handle_collapse("top 0.375s, max-height 0.375s", height);
        body.style.marginTop = `${height}px`;
      } else if (scroll_pos > collapse && scroll_pos < top + height) {  

        obj.position = "fixed";
        obj.top = `-${height}px`;
        handle_collapse("none", height);
        body.style.marginTop = `${height}px`;
      } else if (scroll_pos > top + height && positive) {

        obj.position = "fixed";
        obj.top = `-${height}px`;
        handle_collapse("top 0.375s, max-height 0.375s", 0);
        body.style.marginTop = `${height}px`;
      } else {
    
        obj.position = "fixed";
        obj.top = "0px";
        obj.transition = "top 0.375s, max-height 0.375s";
        obj.maxHeight = `${collapse}px`;
        body.style.marginTop = `${height}px`;
      }

      Object.assign(navbar.current.style, obj);

      setScrollY(scroll_pos);
  },[scrollY]);

  useEffect(() => {

    window.addEventListener("resize", handle_navigationigation, { passive: true });
    window.addEventListener("scroll", handle_navigationigation, { passive: true });
    window.addEventListener("wheel", handle_navigationigation, { passive: true });

    return () => { 
      
      window.removeEventListener("resize", handle_navigationigation);
      window.removeEventListener("scroll", handle_navigationigation);
      window.removeEventListener("wheel", handle_navigationigation);
    }
  }, [handle_navigationigation]);

  useEffect(() => {

    if (!navbar_toggler.current.classList.contains("has-collapsed")) {

      navbar.current.style.maxHeight = "83px";
      navbar_toggler.current.classList.add("has-collapsed");
    }

    window.scrollTo(0,0); 
  }, [navigate]);

  return (  

    <nav ref={navbar} className="container-fluid slider_8-navigation navigation d-flex align-items-start p-0">

      <div className="row w-100 justify-content-between m-0 g-0">

        <Link className="col-auto m-3"  to="/">

          <svg aria-label="Super Foods" viewBox="0 0 100 100" width="50" height="50">

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

        <div ref={navbar_toggler} onClick={toogle} aria-label="menu" role="button" className="col-auto d-flex align-items-center slider_8-navbar-toggler navbar-toggler has-collapsed p-4" >

          <div>

              <div className="slider_8-bar1"></div>

              <div className="slider_8-bar2"></div>

              <div className="slider_8-bar3"></div>

          </div>

        </div>

        <div ref={navbar_collapse} className="col-12 slider_8-navbar-collapse navbar-collapse">

          <ul className="list-unstyled ms-3 my-3">

            <li className="mb-1">
              
              <NavLink to="/"> 
              
                Home 
                
              </NavLink>
              
            </li>

            <li className="mb-1">
              
              <NavLink to="store"> 
              
                Store 
                
              </NavLink>
              
            </li>

            <li>

              {auth ? (

                <Link onClick={setAuth}> 
                
                  Sign out 
                  
                </Link>

              ) : (
                
                <Link to="store"> 
              
                  Sign in 
                  
                </Link>
                
              )}

            </li>
        
          </ul>

        </div>

      </div>

    </nav>
    
  )
  
}

export default Navigation;
