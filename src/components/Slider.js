import React, { useState, useRef } from "react";
import { ArrowRight } from 'react-bootstrap-icons';
import { ArrowLeft } from 'react-bootstrap-icons';

const Slider= (props) => {

  const [index, setIndex] = useState(0);

  const counters = useRef();

  const first = (index) => {

    counters.current.children[index].classList.add("has-fade");

    setTimeout(()=>{

      counters.current.children[index].classList.remove("has-current");
      counters.current.children[index].classList.remove("has-fade");
    },100);
  }

  const last = (index) => {

    setTimeout(()=>{

      counters.current.children[index].classList.add("has-current");
      counters.current.children[index].classList.add("has-fade");
      setTimeout(()=>{

        counters.current.children[index].classList.remove("has-fade");
      },100);
    },100);
  }

  const prev = () => {

    first(index);

    setIndex(index - 1);

    if (index === 0) {

      setIndex(counters.current.children.length - 1);

      last(counters.current.children.length - 1)

      return
    }

    last(index - 1)
  };

  const next = () => {

    first(index);

    setIndex(index + 1);

    if (index === counters.current.children.length - 1) {

      setIndex(0);

      last(0)

      return
    }

    last(index + 1)
  };

  return (
    <div className="container-fluid mb-md-5 g-0">

      <div className="container-md slider_9-container my-5 pb-5 g-0">

        <div className="row justify-content-between align-items-center g-0">

          <div className="col-2 d-flex justify-content-center">

            <button onClick={prev}  aria-label="prev" className="slider_9-button button-prev"><ArrowLeft /></button>

          </div>

          <div ref={counters} className="col-8 col-lg-6 slider_9-inner inner-swap position-relative">

            {props.children}
            
          </div>

          <div className="col-2 d-flex justify-content-center">

            <button onClick={next} aria-label="next" className="slider_9-button button-next"><ArrowRight /></button>

          </div>

        </div>

      </div>
    
    </div>
  )
}

export default Slider;