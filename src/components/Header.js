import React from "react";

const Header = (props) => {

  const { heading, children } = props;
  
  return (
    
    <header className="container-fluid row g-0">
    
        <div className="row position-relative overflow-hidden g-0">

            <div className="col-12 bg-1">

                <h1 className="py-3 px-4 m-0">
                  
                  {heading}
                  
                </h1>

            </div>

            <div className="shunt"></div>

        </div>

        {children}

    </header>

  )
}

export default Header;