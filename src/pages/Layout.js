import { Outlet } from "react-router-dom";
import Navigation from "./Navigation"


const Layout = (props) => {

  const { bool, logOut } = props; 

  return (
    <>
    <a className="d-none" href="#main">skip navigation</a>
     <Navigation bool={bool} logOut={logOut}  />
      <main id="main">
       
        <Outlet />
      </main>
    </>
  )
};

export default Layout;