import React from "react";
import stationary from "../images/stationary.webp";

const Home = () => {
    return (
        <div className="row g-0 p-3 align-items-center  justify-content-around justify-content-xl-between align-items-xl-end flex-column flex-sm-row">
            <p className="col-11 mb-5 mt-3 my-md-0 col-md-4">  
                <img src={stationary} alt="stationary"/> 
                <b className="d-block px-3 pb-4 pt-5"> 
                   Ut enim ad minim veniam quis nostrud exercitation ullamco laboris. 
                </b>   
            </p>
            <section className="col-12 col-md-7 row d-flex flex-column flex-sm-row g-0 text-end justify-content-end">
                <p className="col-11 col-md-12 mx-auto mb-0 p-5 p-lg-3 row g-0 align-items-center justify-content-between">
                    <h1 className="col-12 col-lg-4 text-start text-lg-center mb-3">
                      Adipiscing elit
                    </h1>
                    <span className="col-12 col-lg-7">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    </span>
                </p>
                <div className="col-11 col-md-12 mx-auto position-relative overflow-hidden">
                </div>
            </section>
        </div>
    );
}

export default Home;
