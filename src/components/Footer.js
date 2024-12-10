import React, { useRef, useEffect } from "react";

const Footer = () => {

  const year = useRef();

  useEffect(() => {

    const date = new Date();
    const year_date = date.getFullYear();
    year.current.innerHTML = year_date;
  }, [])  

  return (
    <>  

      <footer className="row g-0 justify-content-center align-items-center text-center">

        <ul className="col-6 m-0 py-4">

          <li className="top">

          <a aria-label="Return to top" href="#top">&#8593;</a>

          </li>

          <li className="py-3">

          &copy;&nbsp;<span ref={year} id="year"></span>

          </li>

        </ul>

      </footer>
          
    </>
  );
}

export default Footer;