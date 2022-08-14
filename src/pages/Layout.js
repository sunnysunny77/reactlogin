import { Outlet } from "react-router-dom";
import Navigation from "./Navigation"


const Layout = (props) => {

  const { bool, logOut } = props; 

  return (
    <>
     <Navigation bool={bool} logOut={logOut}  />
      <main>
       
        <Outlet />
      </main>
    </>
  )
};

export default Layout;