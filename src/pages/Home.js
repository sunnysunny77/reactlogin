import React from "react";
import stationary from "../images/stationary.webp";
import stationaryLandscape from "../images/stationary-landscape.webp";

const Home = () => {
    return (
        <div className="row g-0 p-3 align-items-center align-items-lg-end justify-content-between flex-column flex-sm-row">
            <p className="order-2 order-sm-1 col-10 m-0 col-sm-4">  
                <img src={stationary} alt="stationary"/> 
                <b className="d-block p-3"> 
                   Ut enim ad minim veniam quis nostrud exercitation ullamco laboris. 
                </b>   
            </p>
            <section className="order-1 order-sm-2 col-12 col-sm-7 row d-flex flex-column flex-sm-row g-0 text-end justify-content-end">
                <p className="col-11 col-sm-12 mx-auto mb-5 mb-sm-0 p-5 p-lg-3 order-4 order-sm-3 row g-0 align-items-center justify-content-between">
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
                <img className="col-11 col-sm-12 mx-auto order-3 order-sm-4"  src={stationaryLandscape} alt="stationary-landscape"/>
            </section>
        </div>
    );
}

export default Home;
