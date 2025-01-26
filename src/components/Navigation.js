import React, { useRef, useEffect, useState, useCallback } from "react";
import { NavLink, Link,  useLocation } from "react-router-dom";

const Navigation = (props) => {

  const { header, footer, isScrolling, auth, setIsScrolling, setAuth } = props;

  const navbar = useRef();
  const navbar_toggler = useRef();
  const navbar_collapse = useRef();

  const location =  useLocation();

  const body = document.body;

  const [height, setHeight] = useState(0);
  const [top, setTop] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [positive, setPositive] = useState(true);
  const [collapse, setCollapse] = useState(82);
  const [hasCollapse, setHasCollapse] = useState(true);
  const [style, setStyle] = useState(null);

  const handle_children = (has_collapsed) => {

    for (const index of navbar_collapse.current.children[0].children) {

      Object.assign(index.style, {

        transition: "transform 0.375s",
        transform: has_collapsed ? `translateY(-${navbar_collapse.current.children.length * 3}00%)` : "translateY(0)",
      });
    };

    Object.assign(navbar_toggler.current.children[0].children[0].style, {

      transition: "transform 0.375s",
      transform: has_collapsed ? "none" : "translate(0, 7px) rotate(-45deg)",
    });

    Object.assign(navbar_toggler.current.children[0].children[1].style, {

      transition: "opacity 0.375s",
      opacity: has_collapsed ? 1 : 0,
    });

    Object.assign(navbar_toggler.current.children[0].children[2].style, {

      transition: "transform 0.375s",
      transform: has_collapsed ? "none" : "translate(0, -7px) rotate(45deg)",
    });
  };
  
  const toogle = () => {

    const wins = window.innerWidth < 576;
    let max_height = !hasCollapse ? height : navbar.current.scrollHeight;
    
    Object.assign( navbar.current.style, {

      transition: wins ? "max-height 0.375s" : "top 0.375s, max-height 0.375s",
      maxHeight: `${max_height}px`,
    });

    setHasCollapse(!hasCollapse);
    setCollapse(max_height);
    handle_children(!hasCollapse);
  };

  const handle_collapse = useCallback((transition, height_param) => {

    Object.assign(navbar.current.style, {

      transition: transition,
      maxHeight: `${height_param}px`,
    });

    setHasCollapse(true);
    setCollapse(height);
    handle_children(true);
  },[height]);

  useEffect(() => {

    if (!navbar_toggler.current.classList.contains("has-collapsed")) {

      handle_collapse("top 0.375s, max-height 0.375s", height);
    }
  }, [handle_collapse, height, location]);

  const handle_navigationigation = useCallback(() => {

    let obj = {};

    let scroll_pos = window.scrollY; 

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
      handle_collapse("none", height);
      body.style.paddingTop = window.innerWidth >= 768 ? "" : `${height}px`;
    } else if ((scroll_pos > top + height && positive) || ( scroll_pos > footer.current.offsetTop - height)) {

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
      obj.top = Number.isInteger(isScrolling) ? `-${height}px` : "0px";
      obj.width = "100%";
      obj.borderBottom = "1px solid #dee2e6";
      obj.transition = "top 0.375s, max-height 0.375s";
      obj.maxHeight = `${collapse}px`;
      body.style.paddingTop = window.innerWidth >= 768 ? "" : `${height}px`;
    };

    if (obj !== style) Object.assign(navbar.current.style, obj);

    if (scroll_pos > scrollY) {

      setPositive(true);
    } else if (scroll_pos < scrollY) {

      setPositive(false);
    };

    if (Number.isInteger(isScrolling)) {

      if (scroll_pos === isScrolling) {

        setIsScrolling(null);
      };
    };

    setScrollY(scroll_pos);

    if (obj !== style) setStyle(obj);
  },[body.style, collapse, footer, handle_collapse, height, isScrolling, positive, scrollY, setIsScrolling, style, top]);

  useEffect(() => {

    setHeight(navbar.current.scrollHeight - navbar_collapse.current.scrollHeight);
    setTop(header.current.scrollHeight + (navbar.current.scrollHeight - navbar_collapse.current.scrollHeight));
    window.addEventListener("scroll", handle_navigationigation, { passive: true });
    window.addEventListener("wheel", handle_navigationigation, { passive: true });
    window.addEventListener("resize", handle_navigationigation, { passive: true });

    return () => {

      window.removeEventListener("scroll", handle_navigationigation);
      window.removeEventListener("wheel", handle_navigationigation);
      window.removeEventListener("resize", handle_navigationigation);
    };
  }, [handle_navigationigation, header]);

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

        <div ref={navbar_toggler} onClick={toogle} aria-label="menu" role="button" className="col-auto d-flex align-items-center slider_8-navbar-toggler navbar-toggler p-4" >

          <div>

              <div className="slider_8-bar"></div>

              <div className="slider_8-bar"></div>

              <div className="slider_8-bar"></div>

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
                
              )};

            </li>
        
          </ul>

        </div>

      </div>

    </nav>
    
  );
};

export default Navigation;
