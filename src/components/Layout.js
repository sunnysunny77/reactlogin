import React, { useRef } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer"
import Navigation from "./Navigation"

const Layout = (props) => {

  const { header, isScrolling, auth, setIsScrolling, setAuth } = props;

    const footer = useRef(null);

  return (

    <>

      <Navigation id="top" header={header} footer={footer} isScrolling={isScrolling} auth={auth} setIsScrolling={setIsScrolling} setAuth={setAuth} />

      <main className="d-flex flex-column">

        <Outlet />

      </main>

      <Footer ref={footer} auth={auth} setAuth={setAuth} setIsScrolling={setIsScrolling} />

    </>
    
  )
};

export default Layout;
