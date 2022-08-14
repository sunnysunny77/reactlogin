import { Outlet } from "react-router-dom";
import AuthNavigation from "./AuthNavigation"

const AuthLayout = () => {

  return (
    <>
      <AuthNavigation />
      <main>
        <Outlet />
      </main>
    </>
  )
};

export default AuthLayout;