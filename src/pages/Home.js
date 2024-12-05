import React from "react";
import Store from "../images/store.webp";
import Finance from "../images/finance.webp";
import Transport from "../images/transport.webp";
import Warehouse from "../images/warehouse.webp";
import Vegies from "../images/vegies.webp";
import Day from "../images/day.webp";
import Greens from "../images/greens.webp";
import Carousel from 'react-bootstrap/Carousel';
import Header from "./Header";
import Slider from "./Slider";
import { Link } from "react-router-dom";

const Home = (props) => {

  const { logOut } = props;

  return (
  <>
    <Header heading="HOME" >

      <div className="col-12 row justify-content-between bg-11 g-0 p-4 p-sm-5">

        <p className="row col-12 col-sm-8 col-lg-7 col-xl-5 d-flex align-items-center justify-content-between p-4 g-0">

          <span className="col-11 col-md-9">Ut enim ad ed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</span>

          {logOut ? (

            <Link to="store" className="col-auto align-self-md-end border rounded mt-4 mb-3 px-2 py-1" > store </Link>

          ) : (

            <Link to="auth" className="col-auto align-self-md-end border rounded mt-4 mb-3 px-2 py-1" > store </Link>

          )}

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

    </Header>

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

    <Slider>

      <img className="has-current counters" src={Day} width="950" height="574" alt="Day" />

      <img className="counters" src={Vegies} width="950" height="574" alt="Vegies" />

      <img className="counters" src={Greens} width="950" height="574" alt="Greens" />

    </Slider>

  </>);
}

export default Home;
