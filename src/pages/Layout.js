import { Outlet } from "react-router-dom";
import Navigation from "./Navigation"

const Layout = (props) => {

  const { logOut, log } = props;
  
  return (
    <>
      <Navigation log={log} logOut={logOut}/>
      <main>
        <Outlet />
      </main>
    </>
  )
};

export default Layout;