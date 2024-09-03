import { Link } from "react-router-dom";

const Navigation = (props) => {

  const { logOut } = props;

  return (  

    <nav className="container-fluid slider_8-navigation navigation d-flex align-items-center border-bottom p-0">

      <div className="row w-100 justify-content-between m-0 g-0">

        <div onClick={ () => {

            const navbar_toggler = document.querySelector(".navbar-toggler");
            const navbar_collapse = document.querySelector(".navbar-collapse");

            let max_height;

            navbar_toggler.classList.toggle("has-collapsed");
        
            if (navbar_toggler.classList.contains("has-collapsed")) {
              max_height = 0;
            }  else {
              max_height = navbar_collapse.scrollHeight;
            }
        
            navbar_collapse.style.maxHeight = `${max_height}px`;
          }} 
          role="button" className="col-auto d-flex align-items-center slider_8-navbar-toggler navbar-toggler has-collapsed px-3 py-4"
          >

          <div>

            <div className="slider_8-bar1"></div>

            <div className="slider_8-bar2"></div>

            <div className="slider_8-bar3"></div>

          </div>

        </div>

        <Link className="col-auto m-2 me-3"  to="/" >

          <svg aria-label="Furniture Warehouse" viewBox="0 0 100 100" width="60" height="60">

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

                Lorem ..... Ipsum ..............

                </textPath>

            </text>

          </svg>

        </Link>

        {logOut ? (

            <div className="col-12 slider_8-navbar-collapse navbar-collapse">

              <ul className="list-unstyled ms-3 my-3">

                <li className="mb-3"><Link to="/" > Home </Link></li>

                <li className="mb-3"><Link to="store" > Store </Link></li>

                <li><Link onClick={logOut} > Sign out </Link></li>
            
              </ul>

            </div>

          ) : (

            <div className="col-12 slider_8-navbar-collapse navbar-collapse">

              <ul className="list-unstyled ms-3 my-3">

                <li className="mb-3"><Link to="/" > Home </Link></li>

                <li className="mb-3"><Link to="auth" > Store </Link></li>

                <li><Link to="auth"  > Sign in </Link></li>
                            
              </ul>

            </div>

          )}

      </div>

    </nav>

  )
  
}

export default Navigation;
