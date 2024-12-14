import React from "react";

const Cards = (props) => {

  return (
    
    <section className="cards container-xl mb-5 g-0">

        <div className="row justify-content-center g-0">

            <div className="col-10 col-sm-11 col-lg-10">

                <h2 className="mt-3 mb-4 mt-sm-5 mb-sm-4"> {props.heading} </h2>
                
            </div>

            <div className="col-12 col-sm-11 col-lg-12 d-flex flex-wrap justify-content-center justify-content-sm-between justify-content-lg-evenly px-lg-5 px-xl-4">

                {props.children}

            </div>

        </div>

    </section>

  )
}

export default Cards;