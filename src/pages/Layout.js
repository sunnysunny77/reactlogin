import { Outlet } from "react-router-dom";
import Navigation from "./Navigation"

const Layout = (props) => {
  const { logOut } = props;
  return (
    <>
      <Navigation logOut={logOut}/>
      <main>
        <Outlet />
      </main>
    </>
  )
};

export default Layout;