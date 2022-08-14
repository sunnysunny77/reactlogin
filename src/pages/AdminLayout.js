import { Outlet } from "react-router-dom";
import AdminNavigation from "./AdminNavigation"

const AdminLayout = (props) => {
  const { logOut } = props;
  return (
    <>
      <AdminNavigation logOut={logOut}/>
      <main>
        <Outlet />
      </main>
    </>
  )
};

export default AdminLayout;