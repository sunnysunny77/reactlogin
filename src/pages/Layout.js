import { Outlet } from "react-router-dom";
import Navigation from "./Navigation"


const Layout = (props) => {

  const { logOut } = props;

  return (
    <>
      <a className="d-none" accessKey="s" href="#main">skip navigation</a>
      <Navigation logOut={logOut} />
      <main id="main" className="py-sm-4 d-flex flex-wrap align-items-center">
        <Outlet />
      </main>
      <footer className="row g-0 justify-content-center align-items-center text-center">
        <ul className="col-6">
            <li>
                &copy;
            </li>
            <li className="d-sm-none">
                <a href="#">Return to top</a>
            </li>
        </ul>
      </footer>
    </>
  )
};

export default Layout;
