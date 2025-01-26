import React, { useState, useRef } from "react";
import { ArrowLeft } from 'react-bootstrap-icons';
import { ArrowRight } from 'react-bootstrap-icons';
import PreText from "./PreText";

const Slider= (props) => {

  const { paragraph, children } = props;

  const [index, setIndex] = useState(0);

  const counters = useRef();

  const first = (index) => {

    counters.current.children[index].classList.add("has-fade");

    setTimeout(()=>{

      counters.current.children[index].classList.remove("has-current");
      counters.current.children[index].classList.remove("has-fade");
    },100);
  };

  const last = (index) => {

    setTimeout(()=>{

      counters.current.children[index].classList.add("has-current");
      counters.current.children[index].classList.add("has-fade");
      setTimeout(()=>{

        counters.current.children[index].classList.remove("has-fade");
      },100);
    },100);
  };

  const prev = () => {

    first(index);

    setIndex(index - 1);

    if (index === 0) {

      setIndex(counters.current.children.length - 1);

      last(counters.current.children.length - 1);

      return;
    };

    last(index - 1);
  };

  const next = () => {

    first(index);

    setIndex(index + 1);

    if (index === counters.current.children.length - 1) {

      setIndex(0);

      last(0);

      return;
    };

    last(index + 1);
  };

  return (

    <div className="slider_9-container g-0">

      <div className="row pt-5 mt-5 mt-lg-0 pt-lg-0 g-0">

        <div className="slider_9-small-col col-lg-1 d-none d-lg-block py-5"></div>

        <div className="row col-12 col-lg-11 d-flex flex-column flex-lg-row align-items-center justify-content-lg-evenly py-sm-4 py-lg-2 py-xl-4 py-xxl-5 g-0">

          <div className="col-12 col-sm-9 col-lg-4 d-flex flex-column order-2 order-lg-1 pt-5 pb-sm-5 py-lg-5 mb-sm-5 my-lg-4 my-xl-5">

            <div ref={counters} className="slider_9-inner inner-swap">

              {children}
              
            </div>

            <div className="slider_9-button-container row justify-content-between justify-content-sm-evenly p-5 p-sm-4 g-0">

              <div className="col-5 d-flex justify-content-center align-items-center">

                <button onClick={prev}  aria-label="prev" className="slider_9-button button-prev">
                  
                  <ArrowLeft />
                  
                </button>
              
              </div>

              <div className="col-5 d-flex justify-content-center align-items-center">

                <button onClick={next} aria-label="next" className="slider_9-button button-next">
                  
                  <ArrowRight />
                  
                </button>

              </div>

            </div>

          </div>

          <div className="col-12 col-lg-5 col-xxl-5 order-1 order-lg-2">

            <div className="row h-100 justify-content-center pb-5 py-lg-5 my-lg-4 my-xl-5 g-0">

              <div className="slider_9-large-col col-10 col-sm-8 col-lg-12 h-100 d-flex justify-content-center align-items-center">

                <p className="m-0">

                   <PreText text={ paragraph } />

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
    
  );
};

export default Slider;