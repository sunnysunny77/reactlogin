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
            <li className="d-md-none">
                <a aria-label="Return to top" href="#top">&#8593;</a>
            </li>
        </ul>
      </footer>
    </>
  )
};

export default Layout;
