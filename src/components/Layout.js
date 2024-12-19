import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation"
import Footer from "./Footer"

const Layout = (props) => {

  const { auth, setAuth } = props;

  return (

    <>

      <Navigation id="top" auth={auth} setAuth={setAuth} />

      <main className="d-flex flex-column">

        <Outlet />

      </main>

      <Footer auth={auth} setAuth={setAuth} />

    </>
    
  )
};

export default Layout;
