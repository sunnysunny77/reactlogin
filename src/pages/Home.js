import React, { useState, useRef } from "react";
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
import Carousel from 'react-bootstrap/Carousel';
import Header from "../components/Header";
import Slider from "../components/Slider";
import Cta from "../components/Cta";
import { Link } from "react-router-dom";
import { ArrowRight } from 'react-bootstrap-icons';

const Home = (props) => {

  const { token, auth, setLoad } = props;

  const resRef = useRef();
  const nameRef = useRef();
  const telRef = useRef();
  const emailRef = useRef();
  const textRef = useRef();

  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (event) => {

    event.preventDefault();
    
    let error = false;

    if (!/^[ '.a-z-]{2,40}$/i.test(name)) {

      error = true;
      nameRef.current.innerHTML = "Enter your name";
      event.target.name.classList.add("error");
    } else {

      nameRef.current.innerHTML = "";
      event.target.name.classList.remove("error");
    }

    if (!/^\+?\d{3,15}$/.test(tel)) {

      error = true;
      telRef.current.innerHTML = "+###############";
      event.target.tel.classList.add("error");
    } else {

      telRef.current.innerHTML = "";
      event.target.tel.classList.remove("error");
    }

    if (!/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,6}$/.test(email)) {

      error = true;
      emailRef.current.innerHTML = "Enter your email";
      event.target.email.classList.add("error");
    } else {

      emailRef.current.innerHTML = "";
      event.target.email.classList.remove("error");
    }


    if (!/[\dA-Za-z]/.test(text)) {

      error = true;
      textRef.current.innerHTML = "Enter your message";
      event.target.text.classList.add("error");
    } else {

      textRef.current.innerHTML = "";
      event.target.text.classList.remove("error");
    }

    if (error) return;

    const form_data = new FormData();

    form_data.append("name", name);
    form_data.append("tel", tel);
    form_data.append("email", email);
    form_data.append("text", text);

    let res = await fetch("/api/?controller=enquiry&token=" + token, { 
      
      method: "POST", 
      body: form_data
    });

    if (!res.ok) { 
      
      let err = await res.text();
      setLoad(err);
      return;
    }

    let json = await res.json();

    if (json.key === btoa(process.env.REACT_APP_KEY) && json.token === token) {

      resRef.current.innerHTML = json.message;

      setTimeout(() => {
        
        resRef.current.innerHTML = "";
        setName("");
        setTel("");
        setEmail("");
        setText("");
      }, 6000);
    }
  }

  return (
  <>
    <Header heading="HOME" >

      <div className="col-12 row justify-content-between bg-11 g-0 p-4 p-sm-5">

        <p className="row col-12 col-sm-8 col-lg-7 col-xl-5 d-flex align-items-center justify-content-between p-4 g-0">

          <span className="col-11 col-md-9">Ut enim ad ed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</span>

          {auth ? (

            <Link to="store" className="col-auto align-self-md-end border rounded mt-4 mb-3 px-2 py-1" > store </Link>

          ) : (

            <Link to="auth" className="col-auto align-self-md-end border rounded mt-4 mb-3 px-2 py-1" > store </Link>

          )}

        </p>

        <Carousel pause={false} interval={1000} controls={false} className="col-12 col-sm-4 ps-sm-5">

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

    <section id="two-col-text" className="row justify-content-between justify-content-xxl-around mx-auto my-5 px-4 pb-4 p-lg-5 g-0">
      
        <div className="col-12 col-lg-3 my-xl-5">

          <h2 className="pt-4 ps-4">

            Lorem 
            <br/>
            ipsum dolor

          </h2>

        </div>
        
        <div className="row col-12 col-lg-8 my-xl-5">

          <div className="col-12 col-xxl-11 pt-4">

            <p className="m-0">

              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tristique tincidunt dui, vel
              rhoncus sapien congue non. Aenean lobortis lorem eu commodo consequat. Etiam scelerisque mollis dui at
              suscipit. Donec ac diam rhoncus, porta velit at, faucibus velit. 
              
              <br/>
              <br/>
              
              Interdum et malesuada fames ac ante
              ipsum primis in faucibus. Mauris iaculis varius lectus auctor pharetra. Cras risus odio, dignissim et
              viverra non, aliquam eget ligula. Maecenas convallis eget felis sit amet commodo. 
              
              <br/>
              <br/>
              
              Integer euilgod eros
              ex, id posuere lorem aliquam eget. Lorem ipsum dolor sit amet. 
              

            </p>

        </div>

      </div>

    </section>

    <div id="two-col-curve" className="container-fluid position-relative overflow-hidden g-0">

      <div className="row flex-column flex-sm-row justify-content-end g-0">

        <div className="curve col-12 col-md-9 col-lg-7 d-flex justify-content-end px-3 px-md-4 py-sm-5 px-lg-5">

          <div className="inner-curve col-11 col-md-10 col-xl-12 d-flex flex-column g-0 text-end">  

            <div className="row align-items-center justify-content-end mb-0 px-3 py-5 p-md-3 g-0">

              <b className="col-12 col-xl-4 text-start text-xl-center mb-3">

                Adipiscing elit

              </b>

              <p className="col-12 col-xl-7 m-0">

                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation.

                <br/>
                <br/>

                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation.

              </p>

            </div>

          </div>

        </div>

        <img src={Store} alt="store"  width="920" height="839" /> 

      </div>

    </div> 

    <Slider 
      topParagraph="Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris iaculis varius lectus auctor pharetra. Cras risus odio, dignissim et viverra non, aliquam eget ligula. Maecenas convallis eget felis sit amet commodo." 
      bottomParagraph="Integer euilgod eros ex, id posuere lorem aliquam eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tristique tincidunt dui, vel rhoncus sapien congue non." 
    >

      <img className="has-current counters" src={Vegies} width="847" height="565" alt="Vegies" />

      <img className="counters" src={Greens} width="847" height="565" alt="Greens" />

    </Slider>

    <section id="two-col-image" className="row p-5 ps-md-0 pt-md-0 pb-md-0 pe-md-0 mb-5 ps-xl-5 g-0" >

        <div className="row col-12 col-md-6 ps-lg-5 pt-md-5 pb-md-5 ps-md-5 g-0">

            <h2 className="pb-3 mt-lg-5">
              
              Lorem ipsum

            </h2>

            <hr className="pb-2"/>

            <div className="col-12 col-md-10">

              <p className="mb-md-5 pe-md-4">

                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu gravida velit.
                  Vestibulum eu posuere
                  elit. Cras bibendum velit dui, eget tincidunt lectus eleifend eu. Mauris et dolor magna. In accumsan
                  scelerisque lorem nec rutrum. Phasellus et turpis posuere.

              </p>

            </div>
            
        </div>

        <div className="col-12 col-md-6 mx-auto mt-3 mt-md-0">

          <img src={Roast} alt="Roast" width="929" height="619"/>
                    
        </div>

    </section>

    <section id="cards">

      <div className="container mb-5 g-0">

        <div className="row justify-content-center g-0">

          <div className="col-10 col-sm-11 col-lg-10">

            <h2 className="mt-3 mb-4 mt-sm-5 mb-sm-4"> Vestibulum eu</h2>
            
          </div>

          <div className="col-11 col-sm-12 col-xl-11">

            <div className="row g-0">

                <div className="col-6 col-md-4 pt-4">

                  <div className="row h-100 justify-content-center g-0">

                    <a href="./" className="card-inner col-11 d-flex flex-wrap align-items-start">

                      <div>

                        <img src={Fruits} alt="fruits" width="370" height="246"/>

                        <h3 className="w-100 mt-3 mb-2 ps-2"> 

                          In accumsan

                        </h3>

                        <b className="w-100 ps-2">

                          Nec rutrum

                        </b>

                        <p className="w-100 mt-3 mb-3 p-2">

                          Dolor magna. In accumsan
                          scelerisque lorem nec rutrum. Phasellus et turpis posuere.

                        </p>

                      </div>

                      <button className="w-100 align-self-end text-start ps-3 py-2">

                        Turpis <ArrowRight className="ms-2" />

                      </button>

                    </a>

                  </div>

                </div>

                <div className="col-6 col-md-4 pt-4">

                  <div className="row h-100 justify-content-center g-0">

                    <a href="./" className="card-inner col-11 d-flex flex-wrap align-items-start">

                      <div>

                        <img src={Broccoli} alt="broccoli" width="370" height="246"/>

                        <h3 className="w-100 mt-3 mb-2 ps-2"> 

                          Eleifend eu

                        </h3>

                        <b className="w-100 ps-2">

                          Dolor magn

                        </b>

                        <p className="w-100 mt-3 mb-3 p-2">

                          Eleifend eu. Mauris et dolor magna. 

                        </p>

                      </div>

                      <button className="w-100 align-self-end text-start ps-3 py-2">

                        Turpis <ArrowRight className="ms-2" />

                      </button>

                    </a>

                </div>

              </div>

              <div className="col-6 col-md-4 pt-4">

                <div className="row h-100 justify-content-center g-0">

                  <a href="./" className="card-inner col-11 d-flex flex-wrap align-items-start">

                    <div>

                      <img src={Basil} alt="basil" width="370" height="246"/>

                      <h3 className="w-100 mt-3 mb-2 ps-2"> 

                        Lectus eleifend

                      </h3>

                      <b className="w-100 ps-2">

                        Lorem nec

                      </b>

                      <p className="w-100 mt-3 mb-3 p-2">

                        Eget tincidunt lectus eleifend eu. Mauris et dolor magna.
                        Dcelerisque lorem nec rutrum. 

                      </p>

                    </div>

                    <button className="w-100 align-self-end text-start ps-3 py-2">

                      Turpis <ArrowRight className="ms-2" />

                    </button>

                  </a>

                </div>

              </div>

              <div className="col-6 col-md-4 pt-4">

                <div className="row h-100 justify-content-center g-0">

                  <a href="./" className="card-inner col-11 d-flex flex-wrap align-items-start">

                    <div>

                      <img src={Cucumbers} alt="cucumbers" width="370" height="246"/>

                      <h3 className="w-100 mt-3 mb-2 ps-2"> 

                        Phasellus et

                      </h3>

                      <b className="w-100 ps-2">

                        Scelerisque lorem

                      </b>

                      <p className="w-100 mt-3 mb-3 p-2">

                        Mauris et dolor magna. In accumsan
                        scelerisque lorem nec rutrum. Phasellus et turpis posuere.

                      </p>

                    </div>

                    <button className="w-100 align-self-end text-start ps-3 py-2">

                      Turpis <ArrowRight className="ms-2" />

                    </button>

                  </a>

                </div>

              </div>

              <div className="col-6 col-md-4 pt-4">

                <div className="row h-100 justify-content-center g-0">

                  <a href="./" className="card-inner col-11 d-flex flex-wrap align-items-start">

                    <div>

                      <img src={Schwab} alt="schwab" width="370" height="246"/>

                      <h3 className="w-100 mt-3 mb-2 ps-2"> 

                        Turpis posuere

                      </h3>

                      <b className="w-100 ps-2">

                        Rutrum nec

                      </b>

                      <p className="w-100 mt-3 mb-3 p-2">

                        Eget tincidunt lectus eleifend eu. Mauris et dolor magna. In accumsan. Phasellus et turpis posuere.

                      </p>

                    </div>

                    <button className="w-100 align-self-end text-start ps-3 py-2">

                      Turpis <ArrowRight className="ms-2" />

                    </button>

                  </a>

                </div>

              </div>

              <div className="col-6 col-md-4 pt-4">

                <div className="row h-100 justify-content-center g-0">

                  <a href="./" className="card-inner col-11 d-flex flex-wrap align-items-start">

                    <div>

                      <img src={Chitto} alt="chitto" width="370" height="246"/>

                      <h3 className="w-100 mt-3 mb-2 ps-2"> 

                        Accumsan In 

                      </h3>

                      <b className="w-100 ps-2">

                        lorem rutrum

                      </b>

                      <p className="w-100 mt-3 mb-3 p-2">

                        Eget tincidunt lectus eleifend eu. Mauris et dolor magna. In accumsan
                        scelerisque lorem nec rutrum. 

                      </p>

                    </div>

                    <button className="w-100 align-self-end text-start ps-3 py-2">

                      Turpis <ArrowRight className="ms-2" />

                    </button>

                  </a>

                </div>

              </div>

            </div>

          </div>
  
        </div>
      
      </div>

    </section>

    <Cta 
      heading="Et turpis posuere." 
      paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tristique tincidunt dui, vel
                rhoncus sapien congue non. Aenean lobortis lorem eu commodo consequat. Etiam scelerisque mollis dui at
                suscipit. Donec ac diam rhoncus, porta velit at, faucibus velit."
      button="Posuere"
    />

    <div className="container-lg pb-5 mb-5 pt-4 g-0 px-4">

      <hr className="mb-5"/>

      <form id="enquiry" onSubmit={handleSubmit}>

        <fieldset>

          <div className="row justify-content-between g-0">

            <div className="col-12">

              <legend className="mb-4">Enquiry<b ref={resRef} className="ms-4"></b></legend>

              <p className="m-0">Required fields are marked *</p>

            </div>

            <div className="col-12 col-sm-6">

              <label className="pe-sm-3">
                
                <span className="hidden d-block">Name</span>

                <span ref={nameRef}></span>

                <input
                  className="ps-2"
                  type="text"
                  name="name" 
                  value={name}
                  placeholder="* Name"
                  autoComplete=""
                  onChange={(event) => setName(event.target.value)}
                />

              </label>

            </div>

            <div className="col-12 col-sm-6">

              <label className="ps-sm-3">
                
                <span className="hidden d-block">Phone</span>

                <span ref={telRef}></span>

                <input
                  className="ps-2"
                  type="text"
                  name="tel" 
                  value={tel}
                  placeholder="* Phone"
                  autoComplete=""
                  onChange={(event) => setTel(event.target.value)}
                />

              </label>

            </div>

            <div className="col-12 col-sm-6">

              <label className="pe-sm-3">
                
                <span className="hidden d-block">Email</span>

                <span ref={emailRef}></span>

                <input
                  className="ps-2"
                  type="text"
                  name="email" 
                  value={email}
                  placeholder="* Email"
                  autoComplete=""
                  onChange={(event) => setEmail(event.target.value)}
                />

              </label>

            </div>

            <div className="col-12">

              <label htmlFor="text">
                
                <span className="hidden d-block">Message</span>

                <span ref={textRef}></span>

                <textarea
                  id="text"
                  className="ps-2"
                  name="text" 
                  value={text}
                  placeholder="* Message"
                  onChange={(event) => setText(event.target.value)}
                  rows="6"
                >
                </textarea>

              </label>

            </div>

          </div>

        </fieldset>

        <div className="row g-0">

          <div className="col-12 col-sm-9 pt-4">

            <div className="row justify-content-between align-items-center g-0">

              <div className="col-12 col-sm-8">

                <p className="mb-5 m-sm-0">

                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                  sed do eiusmod tempor incididunt.

                </p>

              </div>

              <div className="col-12 col-sm-4 d-flex justify-content-sm-end">

                <input className="rounded" type="submit" value="Send" />

              </div>

            </div>

          </div>

        </div>

      </form>

    </div>

  </>);
}

export default Home;
