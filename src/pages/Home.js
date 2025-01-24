import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from 'react-bootstrap-icons';
import Carousel from 'react-bootstrap/Carousel';
import ButtonSlider from "../components/ButtonSlider"
import Cards from "../components/Cards";
import Cta from "../components/Cta";
import Enquiry from "../components/Enquiry";
import Header from "../components/Header";
import OneColLarge from "../components/OneColLarge";
import TwoColCurve from "../components/TwoColCurve";
import TwoColImage from "../components/TwoColImage";
import TwoColText from "../components/TwoColText";
import TwoRowFeature from "../components/TwoRowFeature";
import Slider from "../components/Slider";
import Finance from "../images/finance.webp";
import Greens from "../images/greens.webp";
import Lemons from "../images/lemons.webp";
import Platter from "../images/platter.webp";
import Roast from "../images/roast.webp";
import Store from "../images/store.webp";
import Transport from "../images/transport.webp";
import Vegies from "../images/vegies.webp";
import Warehouse from "../images/warehouse.webp";
import Aus from "../images/australian-made.svg";

const Home = (props) => {

  const { header, options, items, cartOrder, setLoad, setReferance, setIsScrolling } = props;

  const [notReferance, setNotReferance] = useState(window.scrollY > 0);

  const cart_click = (event) => {

    const referance = event.currentTarget.getAttribute("referance");
    cartOrder[referance]();
    setReferance(referance);
  };

  useEffect(() => {

    if (notReferance) {

      setIsScrolling(0);
      window.scrollTo(0, 0);
    }
    return () => {

      setNotReferance(false);
    };
  }, [notReferance, setIsScrolling]);

  return (

    <>

      <Header ref={header} heading="HOME" >

        <div className="col-12 bg-11 p-4 p-sm-5 ps-md-5 pt-md-5 pb-md-5 pe-md-0 pe-xl-5">

          <div className="row align-items-center justify-content-between  g-0">
            
            <div className="col-12 col-md-7 col-xl-5">

              <p className="p-4">

                <span className="d-flex row align-items-center justify-content-between g-0">

                  <span className="col-11 col-lg-9">
                    
                    Ut enim ad ed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                    
                  </span>

                  <Link to="store" className="col-auto align-self-lg-end border rounded mt-4 mb-3 px-2 py-1" > 
                  
                    store 
                    
                  </Link>

                </span>

              </p>

            </div>

            <Carousel pause={false} interval={1500} controls={false} className="col-6 col-md-4 mx-auto mx-xl-0">

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

        </div>    

      </Header>

      <TwoColText
      
        heading={
          `Lorem 
          ipsum dolor`
        }

        paragraph={
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tristique tincidunt dui, vel rhoncus sapien congue non. Aenean lobortis lorem eu commodo consequat. Etiam scelerisque mollis dui at suscipit. Donec ac diam rhoncus, porta velit at, faucibus velit. 
          
          Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris iaculis varius lectus auctor pharetra. Cras risus odio, dignissim et viverra non, aliquam eget ligula. Maecenas convallis eget felis sit amet commodo. 
          
          Integer euilgod eros ex, id posuere lorem aliquam eget. Lorem ipsum dolor sit amet.`
        }

      />

      <TwoColCurve

        heading={`Adipiscing elit`}

        paragraph={
          `Fusce vulputate eleifend lacus ut pharetra, integer eleifend ligula at tortor hendrerit, sed consectetur magna gravida sed purus nisl. 
          
           Posuere eget nunc non interdum laoreet dui maecenas lobortis gravida magna auctor venenatis, nunc sit amet massa hendrerit lobortis purus in iaculis augue. 
           
           Etiam tincidunt ex eget felis rhoncus, eget tristique metus rutrum.`
        }
      
      >

        <img src={Store} alt="store"  width="920" height="839" /> 

      </TwoColCurve>

      <TwoRowFeature
      
        heading_top={`Lorem Ipsum id posuere lorem aliquam eget. Lorem ipsum dolor sit amet.`}
        heading_bottom={`Consectetur adipiscing elit.`}
        paragraph={
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu gravida velit. Vestibulum eu posuere
          elit. Cras bibendum velit dui, eget tincidunt lectus eleifend eu. Mauris et dolor magna. In accumsan
          scelerisque lorem nec rutrum. Phasellus et turpis posuere.`
        }
        items={[
          {
            heading: "Eu suscipit",
            content: [
              {
                item: "himenaeos consequat",
              },
              {
                item: "latea bibendum",
              },
              {
                item: "finibus lacinia lacus",
              },
              {
                item: "convallis inceptos placerat",
              },
            ]
          },
          {
            heading: "Nunc proin",
            content: [
              {
                item: "aliquet augue",
              },
              {
                item: "nec libero euismod",
              },
              {
                item: "curae mollis",
              },
            ]
          },
          {
            heading: "Convallis nec",
            content: [
              {
                item: "rhoncus tellus habitant",
              },
              {
                item: "fames eleifend finibus",
              },
              {
                item: "Nunc lobortis turpis",
              },
            ]
          },
        ]}
      
      >

        <img src={Lemons} alt="lemons" width="400" height="400" />

      </TwoRowFeature>

      <Slider
      
        paragraph={
          `Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris iaculis varius lectus auctor pharetra. Cras risus odio, dignissim et viverra non, aliquam eget ligula. Maecenas convallis eget felis sit amet commodo.

          Integer euilgod eros ex, id posuere lorem aliquam eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tristique tincidunt dui, vel rhoncus sapien congue non.`
        }

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

            to={`store`}
            
            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"
            
            onClick={cart_click}

            referance={options[0].value}

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

            to={`store`}

            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"
            
            onClick={cart_click}

            referance={options[1].value}

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

            to={`store`}

            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"
            
            onClick={cart_click}

            referance={options[2].value}

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

            to={`store`}

            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"
            
            onClick={cart_click}

            referance={options[3].value}

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

            to={`store`}

            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"
            
            onClick={cart_click}

            referance={options[4].value}

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

            to={`store`}

            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"
            
            onClick={cart_click}

            referance={options[5].value}

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

      <ButtonSlider 
        
        items={[
          {
            heading: "Tristique mus",
            bold: "venenatis ad",
            paragraph: 
              `Ex varius nullam sociosqu erat congue aptent. Maecenas aliquam lobortis tempus, ultrices maecenas auctor ultrices. 
            
              Tincidunt eros lobortis; nam libero nisl viverra. Ex dapibus finibus leo fames class non lobortis non. Sociosqu posuere congue imperdiet nunc maecenas`,
          },
          { 
            heading: "Ut nisl laoreet ",
            bold: "himenaeos libero",
            paragraph: 
            
              `Maecenas rutrum senectus vitae lacinia, tempor senectus malesuada? Sapien mollis class aptent convallis lobortis amet fermentum class aptent.
            
              Montes nulla gravida ultrices in tortor arcu purus. Id ligula porttitor congue sociosqu faucibus viverra.`,
          },
          { 
            heading: "Auctor massa",
            bold: "cras accumsan",
            paragraph: 
            
              `Ultricies tortor velit consectetur nisi netus erat ullamcorper mollis fringilla. Conubia nullam eu efficitur purus tincidunt iaculis.
            
              Dui ad dictum ridiculus ultrices proin, mollis praesent. Aliquam luctus ipsum libero eleifend aliquam. Ligula euismod feugiat interdum ante accumsan congue.`,
          },
          { 
            heading: "Interdum in ex",
            bold: "eque accumsan",
            paragraph: 
            
              `Nullam class nisi imperdiet tincidunt egestas id nibh ornare orci. Mus nulla primis, curae nisi nunc ornare. Sagittis posuere lorem ornare urna consectetur tellus. 
            
              Cubilia montes ex efficitur ut, consequat convallis? Adipiscing volutpat arcu sed auctor ultrices aliquet?`,
          },
          { 
            heading: "Torquent malesuada",
            bold: "primis rhoncus",
            paragraph: 
            
              `Aliquam nulla habitant vitae euismod viverra penatibus congue potenti. Ipsum eros odio sollicitudin feugiat leo montes magnis quis. 
            
              Dignissim aenean nec; blandit hac in cras integer tincidunt. Accumsan magna neque venenatis senectus curabitur penatibus velit. Litora fames rhoncus elementum; sollicitudin aliquet consectetur.`,
          },
        ]}
      
      />

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
};

export default Home;
