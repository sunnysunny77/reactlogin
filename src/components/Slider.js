import React, { useState, useRef } from "react";
import { ArrowRight } from 'react-bootstrap-icons';
import { ArrowLeft } from 'react-bootstrap-icons';

const Slider= (props) => {

  const [index, setIndex] = useState(0);

  const counters = useRef();

  const first = (index) => {

    counters.current.children[0].children[index].classList.add("has-fade");

    setTimeout(()=>{

      counters.current.children[0].children[index].classList.remove("has-current");
      counters.current.children[0].children[index].classList.remove("has-fade");
    },100);
  }

  const last = (index) => {

    setTimeout(()=>{

      counters.current.children[0].children[index].classList.add("has-current");
      counters.current.children[0].children[index].classList.add("has-fade");
      setTimeout(()=>{

        counters.current.children[0].children[index].classList.remove("has-fade");
      },100);
    },100);
  }

  const prev = () => {

    first(index);

    setIndex(index - 1);

    if (index === 0) {

      setIndex(counters.current.children[0].children.length - 1);

      last(counters.current.children[0].children.length - 1)

      return
    }

    last(index - 1)
  };

  const next = () => {

    first(index);

    setIndex(index + 1);

    if (index === counters.current.children[0].children.length - 1) {

      setIndex(0);

      last(0)

      return
    }

    last(index + 1)
  };
  return (
    <div className="slider_9-container g-0">

      <div className="row px-md-3 pb-md-5 pb-lg-0 px-lg-0 g-0">

        <div className="slider_9-small-col col-lg-1 d-none d-lg-block py-5"></div>

        <div className="row col-12 col-lg-11 d-flex flex-column flex-lg-row justify-content-lg-evenly my-xl-5 ps-xl-5 py-xl-5 g-0">

          <div className="col-12 col-lg-6 col-xl-5 d-flex flex-column order-2 order-lg-1">

            <div ref={counters} className="slider_9-inner inner-swap position-relative mt-md-5 mx-md-5 ms-lg-5 me-lg-0">

              {props.children[0]}
              
            </div>

            <div className="slider_9-button-container row justify-content-between justify-content-md-evenly mb-md-5 mx-md-5 ms-lg-5 me-lg-0 p-5 p-md-4 g-0">

              <div className="col-4 d-flex justify-content-center align-items-center">

                <button onClick={prev}  aria-label="prev" className="slider_9-button button-prev"><ArrowLeft /></button>
              
              </div>

              <div className="col-4 d-flex justify-content-center align-items-center">

                <button onClick={next} aria-label="next" className="slider_9-button button-next"><ArrowRight /></button>

              </div>

            </div>

          </div>

          <div className="col-12 col-lg-6 col-xxl-5 order-1 order-lg-2 my-5 my-lg-0">

            <div className="row h-100 justify-content-center py-5 py-md-3 py-lg-5 g-0">

              <div className="slider_9-large-col col-8 col-lg-10 h-100 d-flex justify-content-center align-items-center">

                {props.children[1]}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Slider;