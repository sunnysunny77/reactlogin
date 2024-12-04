import React from "react";
import Store from "../images/store.webp";
import Finance from "../images/finance.webp";
import Transport from "../images/transport.webp";
import Warehouse from "../images/warehouse.webp";
import Carousel from 'react-bootstrap/Carousel';

const Home = () => {
    return (
    <>

        <header className="container-fluid row g-0">

            <div className="row position-relative overflow-hidden g-0">

                <div className="col-12 bg-1">

                    <h1 className="py-3 px-4 m-0">HOME</h1>

                </div>

                <div className="shunt"></div>

            </div>

            <div className="col-12 row justify-content-between bg-11 g-0 p-4 p-sm-5">

                <p className="col-12 col-sm-8 col-lg-7 col-xl-5 d-flex align-items-center p-4">

                    Ut enim ad ed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.

                </p>

                <Carousel pause={false} interval={1000} controls={false} className="col-12 col-sm-4 ps-sm-5">

                    <Carousel.Item>

                        <img src={Finance} alt="Finance" />

                    </Carousel.Item>

                    <Carousel.Item>

                        <img src={Transport} alt="Transport" />

                    </Carousel.Item>

                    <Carousel.Item>

                        <img src={Warehouse} alt="Warehouse" />

                    </Carousel.Item>

                </Carousel>

            </div>

        </header>

        <div className="container py-sm-5 my-5">

            <div className="row g-0 align-items-center justify-content-around flex-column flex-sm-row">

                <div className="blend col-11 col-md-5 mb-5 my-md-0">

                    <img  src={Store} alt="store"/> 

                    <p className="m-0">  

                        <b className="d-block px-3 pb-4 pt-5"> 

                            Ut enim ad minim veniam quis nostrud exercitation ullamco laboris. 

                        </b>   
                    </p>

                </div>

                <div className="homeLeft col-11 col-md-6 row d-flex flex-column flex-sm-row g-0 text-end justify-content-end">

                    <p className="col-12 mx-auto mb-0 px-3 py-5 p-md-3 row g-0 align-items-center justify-content-between">

                        <span className="col-12 col-xl-4 text-start text-xl-center mb-3">

                            Adipiscing elit

                        </span>

                        <span className="col-12 col-xl-7">

                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation.
                            
                        </span>

                    </p>

                    <div className="col-12 col-md-12 mx-auto position-relative overflow-hidden"></div>

                </div>

            </div>

        </div> 

    </>
    );
}

export default Home;
