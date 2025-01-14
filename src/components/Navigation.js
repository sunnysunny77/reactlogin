import React, { useRef, useEffect, useState, useCallback } from "react";
import { NavLink, Link,  useLocation } from "react-router-dom";

const Navigation = (props) => {

  const { isScrolling, auth, setIsScrolling, setAuth } = props;

  const height = 83;

  const body = document.body;

  const navbar = useRef();
  const navbar_toggler = useRef();
  const navbar_collapse = useRef();

  const location =  useLocation();

  const [scrollY, setScrollY] = useState(0);
  const [positive, setPositive] = useState(true);
  const [collapse, setCollapse] = useState(82);
  const [top, setTop] = useState(null);
  
  const toogle = () => {

    let max_height;

    navbar_toggler.current.classList.toggle("has-collapsed");

    if (navbar_toggler.current.classList.contains("has-collapsed")) {

      max_height = height;
    }  else {
      
      max_height = navbar.current.scrollHeight;
    }

    navbar.current.style.maxHeight = `${max_height}px`;
    
    setCollapse(max_height);
  }

  const handle_collapse = useCallback((transition, height_param) => {

    navbar_toggler.current.classList.add("has-collapsed");

    Object.assign(navbar.current.style, {

      transition: transition,
      maxHeight: `${height_param}px`
    });

    setCollapse(height);
  },[]);

  useEffect(() => {

    if (!navbar_toggler.current.classList.contains("has-collapsed")) {

      handle_collapse("top 0.375s, max-height 0.375s", height);
    }
  }, [handle_collapse, location]);

  const handle_navigationigation = useCallback(() => {

    let obj = {};

    let scroll_pos = window.scrollY; 

    if (Number.isInteger(isScrolling)) {

      if (scroll_pos === isScrolling) {

        setIsScrolling(null);
      } else if (scroll_pos < top) {  

        obj.zIndex = 1001;
        obj.position = window.innerWidth >= 768 ? "absolute" : "static";
        obj.top = window.innerWidth >= 768 ? "0px" : "initial";
        obj.width = window.innerWidth >= 768 ? "300px" : "100%";
        obj.borderBottom = window.innerWidth >= 768 ? "none" : "1px solid #dee2e6";
        handle_collapse("nonw", height);
        body.style.paddingTop = "";
      } else if (scroll_pos > top && !positive) { 

        obj.zIndex = 999;
        obj.position = "fixed";
        obj.top = `-${height}px`;
        obj.width = "100%";
        obj.borderBottom = "1px solid #dee2e6";
        handle_collapse("top 0.375s, max-height 0.375s", 0);
        body.style.paddingTop = window.innerWidth >= 768 ? "" : `${height}px`;
      }  else if (scroll_pos > top && positive) { 

        obj.zIndex = 999;
        obj.position = "fixed";
        obj.top = `-${height}px`;
        obj.width = "100%";
        obj.borderBottom = "1px solid #dee2e6";
        handle_collapse("none", 0);
        body.style.paddingTop = window.innerWidth >= 768 ? "" : `${height}px`;
      }  

      if (obj !== navbar.current.style) Object.assign(navbar.current.style, obj);

      return;
    }

    if (scroll_pos < height) {  

      obj.zIndex = 1001;
      obj.position = window.innerWidth >= 768 ? "absolute" : "static";
      obj.top = window.innerWidth >= 768 ? "0px" : "initial";
      obj.width = window.innerWidth >= 768 ? "300px" : "100%";
      obj.borderBottom = window.innerWidth >= 768 ? "none" : "1px solid #dee2e6";
      handle_collapse("max-height 0.375s", height);
      body.style.paddingTop = "";
    } else if (scroll_pos > top && scroll_pos < top + height && !positive) {

      obj.zIndex = 999;
      obj.position = "fixed";
      obj.top = `-${height}px`;
      obj.width = "100%";
      obj.borderBottom = "1px solid #dee2e6";
      handle_collapse("top 0.375s, max-height 0.375s", height);
      body.style.paddingTop = window.innerWidth >= 768 ? "" : `${height}px`;
    } else if (scroll_pos > height && scroll_pos < top + height) {  

      obj.zIndex = 999;
      obj.position = "fixed";
      obj.top = `-${height}px`;
      obj.width = "100%";
      obj.borderBottom = "1px solid #dee2e6";
      handle_collapse(positive ? "none" : "top 0.375s, max-height 0.375s", height);
      body.style.paddingTop = window.innerWidth >= 768 ? "" : `${height}px`;
    } else if (scroll_pos > top + height && positive) {

      obj.zIndex = 999;
      obj.position = "fixed";
      obj.top = `-${height}px`;
      obj.width = "100%";
      obj.borderBottom = "1px solid #dee2e6";
      handle_collapse("top 0.375s, max-height 0.375s", 0);
      body.style.paddingTop = window.innerWidth >= 768 ? "" : `${height}px`;
    } else {
  
      obj.zIndex = 999;
      obj.position = "fixed";
      obj.top = "0px";
      obj.width = "100%";
      obj.borderBottom = "1px solid #dee2e6";
      obj.transition = "top 0.375s, max-height 0.375s";
      obj.maxHeight = `${collapse}px`;
      body.style.paddingTop = window.innerWidth >= 768 ? "" : `${height}px`;
    };

    if (obj !== navbar.current.style) Object.assign(navbar.current.style, obj);

    if (scroll_pos > scrollY) {

      setPositive(true);
    } else if (scroll_pos < scrollY) {

      setPositive(false);
    }

    setScrollY(scroll_pos);
  },[body.style, collapse, handle_collapse, isScrolling, positive, scrollY, setIsScrolling, top]);

  useEffect(() => {

    setTop(document.querySelector("header").scrollHeight + height);
    window.addEventListener("scroll", handle_navigationigation, { passive: true });
    window.addEventListener("wheel", handle_navigationigation, { passive: true });
    window.addEventListener("resize", handle_navigationigation, { passive: true });

    return () => {

      window.removeEventListener("scroll", handle_navigationigation, { passive: true });
      window.removeEventListener("wheel", handle_navigationigation, { passive: true });
      window.removeEventListener("resize", handle_navigationigation, { passive: true });
    };
  }, [handle_navigationigation]);

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
