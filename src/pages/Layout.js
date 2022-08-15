import { Outlet } from "react-router-dom";
import Navigation from "./Navigation"


const Layout = (props) => {

  const { logOut } = props; 

  return (
    <>
    <a className="d-none" href="#main">skip navigation</a>
     <Navigation logOut={logOut}  />
      <main id="main">
       
        <Outlet />
      </main>
    </>
  )
};

export default Layout;