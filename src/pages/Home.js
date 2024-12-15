import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from 'react-bootstrap-icons';
import Store from "../images/store.webp";
import Finance from "../images/finance.webp";
import Transport from "../images/transport.webp";
import Warehouse from "../images/warehouse.webp";
import Roast from "../images/roast.webp";
import Vegies from "../images/vegies.webp";
import Greens from "../images/greens.webp";
import Fruits from "../images/fruits.webp";
import Broccoli from "../images/broccoli.webp";
import Basil from "../images/basil.webp";
import Cucumbers from "../images/cucumbers.webp";
import Schwab from "../images/schwab.webp";
import Chitto from "../images/chitto.webp";
import PreText from "../components/PreText";
import Carousel from 'react-bootstrap/Carousel';
import Header from "../components/Header";
import TwoColText from "../components/TwoColText";
import TwoColCurve from "../components/TwoColCurve";
import Slider from "../components/Slider";
import TwoColImage from "../components/TwoColImage";
import Cards from "../components/Cards";
import Cta from "../components/Cta";
import Enquiry from "../components/Enquiry";

const Home = (props) => {

  const { auth, setLoad } = props;

  return (
    <>

      <Header heading="HOME" >

        <div className="col-12 row align-items-center justify-content-between bg-11 g-0 p-4 p-sm-5 pe-sm-0 pe-xl-5">

          <p className="row col-12 col-sm-7 col-lg-7 col-xl-5 d-flex align-items-center justify-content-between p-4 g-0">

            <span className="col-11 col-md-9">
              
              Ut enim ad ed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
              
            </span>

            {auth ? (

              <Link to="store" className="col-auto align-self-md-end border rounded mt-4 mb-3 px-2 py-1" > 
              
                store 
                
              </Link>

            ) : (

              <Link to="auth" className="col-auto align-self-md-end border rounded mt-4 mb-3 px-2 py-1" > 
              
                store 
                
              </Link>

            )}

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
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.

          Consectetur adipiscing elit, lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis nostrud exercitation, ut enim ad minim veniam.`
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

      <Cards
      
        heading={`Vestibulum eu`}
      
      >

        <a href="./" className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3">

            <div className="card-inner h-100">

              <div className="overflow-hidden">

                <img src={Fruits} alt="fruits" width="370" height="246"/>

              </div>

              <h3 className="mt-3 mb-2 ps-2"> 

                In accumsan

              </h3>

              <b className="d-block ps-2">

                Nec rutrum

              </b>

              <p className="mt-3 mb-3 p-2">

                Dolor magna. In accumsan
                scelerisque lorem nec rutrum. Phasellus et turpis posuere.

              </p>

            </div>

            <button className="w-100 text-start ps-3 py-2">

              Turpis 
              
              <ArrowRight className="ms-2" />

            </button>

        </a>

        <a href="./" className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3">

            <div className="card-inner h-100">

              <div className="overflow-hidden">

                <img src={Broccoli} alt="broccoli" width="370" height="246"/>

              </div>

              <h3 className="mt-3 mb-2 ps-2"> 

                  Eleifend eu

              </h3>

              <b className="d-block ps-2">

                  Dolor magn

              </b>

              <p className="mt-3 mb-3 p-2">

                  Eleifend eu. Mauris et dolor magna. 

              </p>

            </div>

            <button className="w-100 text-start ps-3 py-2">

              Turpis 
              
              <ArrowRight className="ms-2" />

            </button>

        </a>

        <a href="./" className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3">

          <div className="card-inner h-100">

              <div className="overflow-hidden">

                <img src={Basil} alt="basil" width="370" height="246"/>

              </div>

              <h3 className="mt-3 mb-2 ps-2"> 

                Lectus eleifend

              </h3>

              <b className="d-block ps-2">

                Lorem nec

              </b>

              <p className="mt-3 mb-3 p-2">

                Eget tincidunt lectus eleifend eu. Mauris et dolor magna.
                Dcelerisque lorem nec rutrum. 

              </p>

          </div>

          <button className="w-100 text-start ps-3 py-2">

              Turpis 
              
              <ArrowRight className="ms-2" />

          </button>

        </a>

        <a href="./" className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3">

          <div className="card-inner h-100">

              <div className="overflow-hidden">

                <img src={Cucumbers} alt="cucumbers" width="370" height="246"/>

              </div>

              <h3 className="mt-3 mb-2 ps-2"> 

                Phasellus et

              </h3>

              <b className="d-block ps-2">

                Scelerisque lorem

              </b>

              <p className="mt-3 mb-3 p-2">

                Mauris et dolor magna. In accumsan
                scelerisque lorem nec rutrum. Phasellus et turpis posuere.

              </p>

          </div>

          <button className="w-100 text-start ps-3 py-2">

              Turpis 
              
              <ArrowRight className="ms-2" />

          </button>

        </a>

        <a href="./" className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3">

          <div className="card-inner h-100">

              <div className="overflow-hidden">

                <img src={Schwab} alt="schwab" width="370" height="246"/>

              </div>

              <h3 className="mt-3 mb-2 ps-2"> 

                Turpis posuere

              </h3>

              <b className="d-block ps-2">

                Rutrum nec

              </b>

              <p className="mt-3 mb-3 p-2">

                Eget tincidunt lectus eleifend eu. Mauris et dolor magna. In accumsan. Phasellus et turpis posuere.

              </p>

          </div>

          <button className="w-100 text-start ps-3 py-2">

              Turpis 
              
              <ArrowRight className="ms-2" />

          </button>

        </a>

        <a href="./" className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3">

          <div className="card-inner h-100">

              <div className="overflow-hidden">

                <img src={Chitto} alt="chitto" width="370" height="246"/>
              
              </div>

              <h3 className="mt-3 mb-2 ps-2"> 

                Accumsan In 

              </h3>

              <b className="d-block ps-2">

                lorem rutrum

              </b>

              <p className="mt-3 mb-3 p-2">

                Eget tincidunt lectus eleifend eu. Mauris et dolor magna. In accumsan
                scelerisque lorem nec rutrum. 

              </p>

          </div>

          <button className="w-100 text-start ps-3 py-2">

              Turpis 
              
              <ArrowRight className="ms-2" />

          </button>

        </a>
        
      </Cards>

      <Cta 

        heading={`Et turpis posuere.`} 

        paragraph={
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tristique tincidunt dui, vel
          rhoncus sapien congue non. Aenean lobortis lorem eu commodo consequat. Etiam scelerisque mollis dui at
          suscipit. Donec ac diam rhoncus, porta velit at, faucibus velit.`
        }

        button={`Posuere`}
        
      />

      <Enquiry setLoad={setLoad} />

    </>
  );
}

export default Home;
