import React from "react";
import Store from "../images/store.webp";
import { House } from 'react-bootstrap-icons';

const Home = () => {
    return (
        <div className="row g-0 align-items-center justify-content-around flex-column flex-sm-row">
            <h1 className="col-11 py-5 m-0"><House />Home</h1>
            <div className="blend col-10 col-md-6 mb-5 my-md-0">
                <img  src={Store} alt="store"/> 
                <p className="m-0">  
                    <b className="d-block px-3 pb-4 pt-5"> 
                    Ut enim ad minim veniam quis nostrud exercitation ullamco laboris. 
                    </b>   
                </p>
            </div>
            <section className="col-10 col-md-5 row d-flex flex-column flex-sm-row g-0 text-end justify-content-end">
                <p className="col-12 mx-auto mb-0 px-3 py-5 p-md-3 row g-0 align-items-center justify-content-between">
                    <span className="col-12 col-xl-4 text-start text-xl-center mb-3">
                    Adipiscing elit
                    </span>
                    <span className="col-12 col-xl-7">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                        nisi ut.
                    </span>
                </p>
                <div className="col-12 col-md-12 mx-auto position-relative overflow-hidden">
                </div>
            </section>
        </div>
    );
}

export default Home;
