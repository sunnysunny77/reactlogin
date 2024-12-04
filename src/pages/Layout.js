import { Outlet } from "react-router-dom";
import Navigation from "./Navigation"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Layout = (props) => {

  const { logOut } = props;

  const navigate = useNavigate();

  useEffect(() => {

    const navbar_toggler = document.querySelector(".navbar-toggler");
    const navbar_collapse = document.querySelector(".navbar-collapse");

    if (!navbar_toggler.classList.contains("has-collapsed")) {

      navbar_collapse.style.maxHeight = "0px";
      navbar_toggler.classList.add("has-collapsed");
    }

  }, [navigate])

  return (

    <>
    
      <Navigation id="top" logOut={logOut} />

      <main className="d-flex flex-column">

        <Outlet />

      </main>

      <footer className="row g-0 justify-content-center align-items-center text-center">

        <ul className="col-6 m-0 py-4">

            <li className="top">

                <a aria-label="Return to top" href="#top">&#8593;</a>

            </li>

            <li className="py-3">

              &copy;&nbsp;2024

            </li>


        </ul>

      </footer>

    </>

  )
};

export default Layout;
