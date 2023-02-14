import React from "react";
import { HouseDoor } from 'react-bootstrap-icons';
import stationary from "../images/stationary.webp";
import stationaryLandscape from "../images/stationary-landscape.webp";

const Home = () => {
    return (
        <div className="row g-0 p-3 align-items-center justify-content-around flex-column-reverse flex-sm-row">
            <img className="col-12 col-sm-6 col-md-4" src={stationary} alt="stationary"/>
            <section className="col-12 col-sm-5 row g-0 text-end justify-content-end">
                <h1 >Lorem ipsum dolor sit amet</h1>
                <HouseDoor className="col-1"/> 
                <p className="pt-3 order-4 order-sm-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                </p>  
                <img className="mt-3 mb-3 order-3 order-sm-4"  src={stationaryLandscape} alt="stationary-landscape"/>
            </section>
        </div>
    );
}

export default Home;