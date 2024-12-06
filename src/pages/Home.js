import React, { useState, useRef } from "react";
import Store from "../images/store.webp";
import Finance from "../images/finance.webp";
import Transport from "../images/transport.webp";
import Warehouse from "../images/warehouse.webp";
import Vegies from "../images/vegies.webp";
import Day from "../images/day.webp";
import Greens from "../images/greens.webp";
import Carousel from 'react-bootstrap/Carousel';
import Header from "../components/Header";
import Slider from "../components/Slider";
import { Link } from "react-router-dom";

const Home = (props) => {

  const { logOut } = props;

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

    let res = await fetch("./enquiry.php", { method: "POST", body: form_data});

    if (!res.ok) return resRef.current.innerHTML = "Mail failure.";

    res = await res.text();

    resRef.current.innerHTML = res;

    setTimeout(() => {
      
      resRef.current.innerHTML = "";
      setName("");
      setTel("");
      setEmail("");
      setText("");
    }, 6000);
  }

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

    <div className="container-lg py-md-5 my-5 g-0">

      <div className="row g-0 align-items-center justify-content-between flex-column flex-sm-row px-4 px-xxl-0">

        <div className="blend col-12 col-md-5 mb-5 my-md-0">

          <img  src={Store} alt="store"/> 

          <p className="m-0">  

            <b className="d-block px-3 pb-4 pt-5"> 

              Ut enim ad minim veniam quis nostrud exercitation ullamco laboris. 

            </b>

          </p>

        </div>

        <div className="homeLeft col-12 col-md-6 row d-flex flex-column flex-sm-row g-0 text-end justify-content-end">

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

      <img className="has-current counters" src={Day} width="658" height="658" alt="Day" />

      <img className="counters" src={Vegies} width="658" height="658" alt="Vegies" />

      <img className="counters" src={Greens} width="658" height="658" alt="Greens" />

    </Slider>

    <div className="container-lg pb-5 mb-5 g-0 px-4 px-xxl-0">

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
