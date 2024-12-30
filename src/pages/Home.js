import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from 'react-bootstrap-icons';
import Carousel from 'react-bootstrap/Carousel';
import Cards from "../components/Cards";
import Cta from "../components/Cta";
import Enquiry from "../components/Enquiry";
import Header from "../components/Header";
import OneColLarge from "../components/OneColLarge";
import PreText from "../components/PreText";
import TwoColCurve from "../components/TwoColCurve";
import TwoColImage from "../components/TwoColImage";
import TwoColText from "../components/TwoColText";
import Slider from "../components/Slider";
import Finance from "../images/finance.webp";
import Greens from "../images/greens.webp";
import Platter from "../images/platter.webp";
import Roast from "../images/roast.webp";
import Store from "../images/store.webp";
import Transport from "../images/transport.webp";
import Vegies from "../images/vegies.webp";
import Warehouse from "../images/warehouse.webp";
import Aus from "../images/australian-made.svg";

const Home = (props) => {

  const { items, cartOrder, setLoad } = props;

  return (

    <>

      <Header heading="HOME" >

        <div className="col-12 row align-items-center justify-content-between bg-11 g-0 p-4 p-sm-5 pe-sm-0 pe-xl-5">

          <p className="row col-12 col-sm-7 col-lg-7 col-xl-5 d-flex align-items-center justify-content-between p-4 g-0">

            <span className="col-11 col-md-9">
              
              Ut enim ad ed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
              
            </span>

            <Link to="store" className="col-auto align-self-md-end border rounded mt-4 mb-3 px-2 py-1" > 
            
              store 
              
            </Link>

          </p>

          <Carousel pause={false} interval={1500} controls={false} className="col-6 col-sm-4 mx-auto mx-xl-0">

            <Carousel.Item>

              <img src={Finance} alt="Finance" width="150" height="150" />

            </Carousel.Item>

            <Carousel.Item>

              <img src={Transport} alt="Transport" width="150" height="120" />

            </Carousel.Item>

            <Carousel.Item>

              <img src={Warehouse} alt="Warehouse" width="150" height="150" />

            </Carousel.Item>

          </Carousel>   

        </div>  

      </Header>

      <TwoColText
      
        heading={<PreText text={
          `Lorem 
          ipsum dolor`
        } />}

        paragraph={<PreText text={
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tristique tincidunt dui, vel rhoncus sapien congue non. Aenean lobortis lorem eu commodo consequat. Etiam scelerisque mollis dui at suscipit. Donec ac diam rhoncus, porta velit at, faucibus velit. 
          
          Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris iaculis varius lectus auctor pharetra. Cras risus odio, dignissim et viverra non, aliquam eget ligula. Maecenas convallis eget felis sit amet commodo. 
          
          Integer euilgod eros ex, id posuere lorem aliquam eget. Lorem ipsum dolor sit amet.`
        } />}

      />

      <TwoColCurve

        heading={`Adipiscing elit`}

        paragraph={<PreText text={
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.

          Consectetur adipiscing elit, lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis nostrud exercitation.`
        } />}
      
      >

        <img src={Store} alt="store"  width="920" height="839" /> 

      </TwoColCurve>

      <Slider
      
        paragraph={<PreText text={
          `Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris iaculis varius lectus auctor pharetra. Cras risus odio, dignissim et viverra non, aliquam eget ligula. Maecenas convallis eget felis sit amet commodo.

          Integer euilgod eros ex, id posuere lorem aliquam eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tristique tincidunt dui, vel rhoncus sapien congue non.`
        } />}

      >

        <img className="has-current counters" src={Vegies} width="847" height="565" alt="Vegies" />

        <img className="counters" src={Greens} width="847" height="565" alt="Greens" />

        <img className="counters" src={Platter} width="847" height="565" alt="Platter" />

      </Slider>

      <TwoColImage

        heading={`Lorem ipsum`}

        paragraph={
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu gravida velit. Vestibulum eu posuere
          elit. Cras bibendum velit dui, eget tincidunt lectus eleifend eu. Mauris et dolor magna. In accumsan
          scelerisque lorem nec rutrum. Phasellus et turpis posuere.`
        }
      
      >

        <img src={Roast} alt="Roast" width="929" height="619"/>

      </TwoColImage>

      <OneColLarge
      
        heading={`Lorem Ipsum`}
        paragraph={`Ut enim ad ed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.`}
        bold={`Ut enim ad minim veniam quis nostrud exercitation.`}
      
      >

        <img src={Aus} alt="Australian Made" width="150" height="150" />

      </OneColLarge>

      <div className="container-fluid pt-5 mb-5 mb-5 mt-lg-5">

        <Cards
        
          heading={`Vestibulum eu`}
        
        >

          <Link

            to="store?ref=storeRef"
            
            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"
            
            onClick={cartOrder.cartOne}

          >

            <div className="card-inner h-100">

              <div className="overflow-hidden">

                <img src={items.cartOne.image} alt={items.cartOne.name} width="399" height="265"/>

              </div>

              <h3 className="mt-3 mb-2 ps-2"> 

                {items.cartOne.name} 

              </h3>

              <b className="d-block ps-2">

                {items.cartOne.sub} 

              </b>

              <p className="mt-3 mb-3 p-2">

                {items.cartOne.description}

              </p>

            </div>

            <button className="w-100 text-start ps-3 py-2">

              Order
              
              <ArrowRight className="ms-2" />

            </button>

          </Link>

          <Link

            to="store?ref=storeRef"

            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"
            
            onClick={cartOrder.cartTwo}

          >

            <div className="card-inner h-100">

              <div className="overflow-hidden">

                <img src={items.cartTwo.image} alt={items.cartTwo.name} width="399" height="265"/>

              </div>

              <h3 className="mt-3 mb-2 ps-2"> 

                {items.cartTwo.name} 

              </h3>

              <b className="d-block ps-2">

                {items.cartTwo.sub} 

              </b>

              <p className="mt-3 mb-3 p-2">

                {items.cartTwo.description} 

              </p>

            </div>

            <button className="w-100 text-start ps-3 py-2">

              Order
              
              <ArrowRight className="ms-2" />

            </button>

          </Link>

          <Link

            to="store?ref=storeRef"

            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"
            
            onClick={cartOrder.cartThree}

          >

            <div className="card-inner h-100">

              <div className="overflow-hidden">

                <img src={items.cartThree.image} alt={items.cartThree.name} width="399" height="265"/>

              </div>

              <h3 className="mt-3 mb-2 ps-2"> 

                {items.cartThree.name} 

              </h3>

              <b className="d-block ps-2">

                {items.cartThree.sub} 

              </b>

              <p className="mt-3 mb-3 p-2">

                {items.cartThree.description} 

              </p>

            </div>

            <button className="w-100 text-start ps-3 py-2">

              Order
              
              <ArrowRight className="ms-2" />

            </button>

          </Link>

          <Link

            to="store?ref=storeRef"

            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"
            
            onClick={cartOrder.cartFour}

          >

            <div className="card-inner h-100">

              <div className="overflow-hidden">

                <img src={items.cartFour.image} alt={items.cartFour.name} width="399" height="265"/>

              </div>

              <h3 className="mt-3 mb-2 ps-2"> 

                {items.cartFour.name} 

              </h3>

              <b className="d-block ps-2">

                {items.cartFour.sub} 

              </b>

              <p className="mt-3 mb-3 p-2">

                {items.cartFour.description}

              </p>

            </div>

            <button className="w-100 text-start ps-3 py-2">

              Order
              
              <ArrowRight className="ms-2" />

            </button>

          </Link>

          <Link

            to="store?ref=storeRef"

            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"
            
            onClick={cartOrder.cartFive}

          >

            <div className="card-inner h-100">

              <div className="overflow-hidden">

                <img src={items.cartFive.image} alt={items.cartFive.name} width="399" height="265"/>

              </div>

              <h3 className="mt-3 mb-2 ps-2"> 

                {items.cartFive.name} 

              </h3>

              <b className="d-block ps-2">

                {items.cartFive.sub} 

              </b>

              <p className="mt-3 mb-3 p-2">

                {items.cartFive.description}

              </p>

            </div>

            <button className="w-100 text-start ps-3 py-2">

              Order
              
              <ArrowRight className="ms-2" />

            </button>

          </Link>

          <Link

            to="store?ref=storeRef"

            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"
            
            onClick={cartOrder.cartSix}

          >

            <div className="card-inner h-100">

              <div className="overflow-hidden">

                <img src={items.cartSix.image} alt={items.cartSix.name} width="399" height="265"/>
              
              </div>

              <h3 className="mt-3 mb-2 ps-2"> 

                {items.cartSix.name} 

              </h3>

              <b className="d-block ps-2">

                {items.cartSix.sub} 

              </b>

              <p className="mt-3 mb-3 p-2">

                {items.cartSix.description} 

              </p>

            </div>

            <button className="w-100 text-start ps-3 py-2">

              Order
              
              <ArrowRight className="ms-2" />

            </button>

          </Link>
          
        </Cards>

      </div>

      <div className="container-xl py-5 px-sm-5 px-xl-0 my-lg-5 g-0">

        <Cta 

          link={`store`}

          heading={`Lobor Kenean`} 

          paragraph={
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tristique tincidunt dui, vel
            rhoncus sapien congue non. Aenean lobortis lorem eu commodo consequat. Etiam scelerisque mollis dui at
            suscipit. Donec ac diam rhoncus, porta velit at, faucibus velit.`
          }

          button={`Vestibulum eu`}
          
        />

      </div>

      <Enquiry setLoad={setLoad} />

    </>
    
  );
}

export default Home;
