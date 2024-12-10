import { Outlet } from "react-router-dom";
import Navigation from "./Navigation"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Layout = (props) => {

  const { auth, setAuth } = props;

  const navigate = useNavigate();

  useEffect(() => {

    const date = new Date();
    const year = date.getFullYear();
    document.getElementById("year").innerHTML = year;

    const navbar_toggler = document.querySelector(".navbar-toggler");
    const navbar_collapse = document.querySelector(".navbar-collapse");

    if (!navbar_toggler.classList.contains("has-collapsed")) {

      navbar_collapse.style.maxHeight = "0px";
      navbar_toggler.classList.add("has-collapsed");
    }

    window.scrollTo(0,0);
  }, [navigate])

  return (
    <>
      <Navigation id="top" auth={auth} setAuth={setAuth} />

      <main className="d-flex flex-column">

        <Outlet />

      </main>

      <footer className="row g-0 justify-content-center align-items-center text-center">

        <ul className="col-6 m-0 py-4">

            <li className="top">

              <a aria-label="Return to top" href="#top">&#8593;</a>

            </li>

            <li className="py-3">

              &copy;&nbsp;<span id="year"></span>

            </li>

        </ul>

      </footer>
    </>
  )
};

export default Layout;
