import React, { useEffect, useState, useCallback, createRef, useRef } from "react";
import { ArrowRight } from 'react-bootstrap-icons';
import PreText from "./PreText";

const ButtonSlider = (props) => {

  const { items } = props;

  const transition = "transform 0.5s"; 

  const sliderButtonContainer = useRef(null);

  const [count, setCount] = useState(0);

  const [length, setLength] = useState(0);

  const sliderItems = [];

  const init = () => {

    for (const index of sliderItems) {

      index.current.style.transform = "";
    };
  };
  
  const transform_item = (count) => {

    for (const index of sliderItems) {

      Object.assign(index.current.style,{ 
          
        transition: transition, 
        transform: `translateX(-${100 * count}%)`,
      });
    };
  };

  const reset_item = useCallback((transition) => {

    Object.assign(sliderButtonContainer.current.style,{ 
      
      transition: transition,
      transform:  "translateX(0)",
    });
  },[]);

  const transform_button_lg = useCallback((transition, count) => {

    console.log(count)
    if (count === length - 2)  {

      Object.assign(sliderButtonContainer.current.style,{ 

        transition: transition,
        transform:  "translateX(-100%)",
      });
    } else if (count === length - 1) {
            
      Object.assign(sliderButtonContainer.current.style,{ 

        transition: transition,
        transform:  "translateX(-200%)",
      });
    } else {

      reset_item(transition);
    }
  },[length, reset_item]);

  const transform_button_md = useCallback((transition, count) => {

    if (count === length - 1) {
        
      Object.assign(sliderButtonContainer.current.style,{ 

        transition: transition,
        transform:  "translateX(-100%)",
      });
    } else {

      reset_item(transition);
    }
  },[length, reset_item]);

  const disabled = (event) => {

    event.target.disabled = "true";

    setTimeout(() => {

      event.target.disabled = "";
    }, 500);
  };

  const click_lg = (event) => {

    disabled(event);

    transform_button_lg(transition, count + 1);

    if (count + 1 === length) {

      setCount(0);
      init();
    } else {

      setCount(count + 1);
      transform_item(count + 1);
    };
  };

  const click_md = (event) => {

    disabled(event);

    transform_button_md(transition, count + 1);

    if (count + 1 === length) {

      setCount(0);
      init();
    } else {

      setCount(count + 1);
      transform_item(count + 1);
    };
  }; 

  const click_sm = (event) => {

    disabled(event);

    if (count + 1 === length) {

      setCount(0);
      init();
    } else {

      setCount(count + 1);
      transform_item(count + 1);
    };
  };

  useEffect(() => {

    setLength(sliderItems.length);
  }, [sliderItems.length]);

  useEffect(() => {

    const resize = () => {

      const width = window.innerWidth;
  
      if (width >= 1200) { 
  
        transform_button_lg("none", count); 
      } else if (width >= 768 && width < 1200) {
  
        transform_button_md("none", count);
      } else {
  
        reset_item("none");
      }
    }

    window.addEventListener("resize", resize, { passive: true })

    return () => {

      window.removeEventListener("resize", resize);
    };
  }, [count, reset_item, transform_button_lg, transform_button_md])

  return (

    <div className="container-lg my-5 g-0">

      <div className="slider_1-outer position-relative">

          <div className="slider-container slider_1-row row d-flex flex-nowrap justify-content-start g-0">
                    
            {items.map((index, i) => { 
                                      
              const { heading, bold, paragraph } = index;  
                    
              const ref = createRef();

              sliderItems.push(ref);

              return (

                <div ref={ref} key={i} className="slider-item slider_1-item">

                  <div className="slider_1-item-padding slider-padding h-100">

                    <div className="slider-body slider_1-item-body position-relative h-100">

                      <h3 className="slider_1-item-heading mb-1">

                        { heading }
                  
                      </h3>

                      <b className="slider_1-item-bold d-block mb-3">  

                        { bold } 

                      </b>

                      <p className="slider_1-item-content mb-0">

                        <PreText text={ paragraph } />
              
                      </p>

                      <button onClick={click_sm} aria-label="next" className="position-absolute slider_1-button slider-next slider-next-sm">
                          
                        <ArrowRight />
                          
                      </button>

                    </div>

                  </div>
                            
                </div>

              )})}

          </div>

          <div ref={sliderButtonContainer} className="slider_1-button-container slider-button-container d-none d-md-flex justify-content-end position-absolute">

              <button onClick={click_md} aria-label="next" className="slider_1-button slider-next slider-next-md">
                  
                <ArrowRight />
                  
              </button>

              <button onClick={click_lg} aria-label="next" className="slider_1-button slider-next slider-next-lg">
                  
                <ArrowRight />
                  
              </button>

          </div>

      </div> 

    </div>         

  );
};

export default ButtonSlider;