import { Outlet } from "react-router-dom";
import Navigation from "./Navigation"


const Layout = (props) => {

  const { logOut } = props;

  return (
    <>
      <a className="d-none" href="#main">skip navigation</a>
      <Navigation logOut={logOut} />
      <main id="main" className="px-3">
        <Outlet />
      </main>
      <footer className="bg-secondary text-white">
        <ul>
          <li> Login App
            <ul>
              <li>
                &copy;&nbsp;D.C
              </li>
            </ul>
          </li>
        </ul>
      </footer>
    </>
  )
};

export default Layout;