import React from "react";
import { HouseDoor } from 'react-bootstrap-icons';
import stationary from "../images/stationary.webp";
import stationaryLandscape from "../images/stationary-landscape.webp";

const Home = () => {
    return (
        <div className="row g-0 p-3 align-items-center align-items-lg-end justify-content-between flex-column-reverse flex-sm-row">
            <p className="col-12 col-sm-4 mb-0 ">  
                <img src={stationary} alt="stationary"/> 
                <b className="d-block p-3"> 
                    Ut enim ad minim veniam quis nostrud exercitation ullamco laboris. 
                </b>   
            </p>
            <section className="col-12 col-sm-7 row g-0 text-end justify-content-end">
                <h1>Lorem ipsum dolor</h1>
                <HouseDoor className="col-1"/> 
                <p className="mt-3 mb-sm-0 p-3 order-4 order-sm-3 row g-0 align-items-center justify-content-between">
                    <b className="col-12 col-lg-4 text-start text-lg-center mb-3">
                        Adipiscing elit
                    </b>
                    <span className="col-12 col-lg-7">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    </span>
                </p>  
                <img className="mt-3 order-3 order-sm-4"  src={stationaryLandscape} alt="stationary-landscape"/>
            </section>
        </div>
    );
}

export default Home;