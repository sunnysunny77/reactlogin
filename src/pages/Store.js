import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import React, { useRef, useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { ArrowRight } from 'react-bootstrap-icons';
import Spinner from "../images/load.gif";
import Header from "../components/Header";
import Cards from "../components/Cards";
import Cta from "../components/Cta";

const Store = (props) => {

  const { items, order, setOrder } = props;

  const storeRef = useRef();

  const itemsRef = useRef();

  const [searchParams] = useSearchParams();

  const [count, setCount] = useState(1);

  const [output, setOutput] = useState(false);

  const cartOne = () => {

    setCount(1);

    setOrder({ 

      image: items.cartOne.image,
      value: items.cartOne.value,
      name: items.cartOne.name,
      sub: items.cartOne.sub,
      description: items.cartOne.description,
    });

    setOutput(false);
  }

  const cartTwo = () => {

    setCount(1);

    setOrder({ 

      image: items.cartTwo.image,
      value: items.cartTwo.value,
      name: items.cartTwo.name,
      sub: items.cartTwo.sub,
      description: items.cartTwo.description,
    });

    setOutput(false);
  }

  const cartThree = () => {

    setCount(1);

    setOrder({ 

      image: items.cartThree.image,
      value: items.cartThree.value,
      name: items.cartThree.name,
      sub: items.cartThree.sub,
      description: items.cartThree.description,
    });

    setOutput(false);
  }

  const cartFour = () => {

    setCount(1);

    setOrder({ 

      image: items.cartFour.image,
      value: items.cartFour.value,
      name: items.cartFour.name,
      sub: items.cartFour.sub,
      description: items.cartFour.description,
    });

    setOutput(false);
  }

  const cartFive = () => {

    setCount(1);

    setOrder({ 

      image: items.cartFive.image,
      value: items.cartFive.value,
      name: items.cartFive.name,
      sub: items.cartFive.sub,
      description: items.cartFive.description,
    });

    setOutput(false);
  }

  const cartSix = () => {

    setCount(1);

    setOrder({ 

      image: items.cartSix.image,
      value: items.cartSix.value,
      name: items.cartSix.name,
      sub: items.cartSix.sub,
      description: items.cartSix.description,
    });

    setOutput(false);
  }

  const style = {
    layout: 'horizontal',
    color: 'silver',
    shape: 'pill',
    label: 'paypal',
    tagline: false,
    disableMaxWidth: true,
  };

  const ButtonWrapper = ({ showSpinner }) => {

    const [{ isPending }] = usePayPalScriptReducer();
        
    return (
      <>

        { (showSpinner && isPending) && <img id="spinner" className="col-10 col-xl-5" width="40" height="40" src={Spinner} alt="Spinner" /> }

        <PayPalButtons

          style={style}

          className="button-container-inner col-10 col-xl-5"

          createOrder={(data, actions) => {

            return actions.order.create({
        
              purchase_units: [
                {
                  amount: {
                    currency_code: "AUD",
                    value: count * order.value,
                    breakdown: {
                      item_total: {
                        currency_code: "AUD",
                        value: count * order.value,
                      }
                    }
                  },
                  items: [
                    {
                      name: order.name,
                      unit_amount: {
                        currency_code: "AUD",
                        value: order.value,
                      },
                      quantity: count,
                    },
                  ]
                }
              ],
            });
          }}

          onApprove={ async (data, actions) => {

            const order = await actions.order.capture();
        
            const transaction = order.id;
        
            const name = order.purchase_units[0].shipping.name.full_name;
        
            let address = "";
            for (const index in order.purchase_units[0].shipping.address) {
                
              address += `${order.purchase_units[0].shipping.address[index]} `;
            }
        
            const purchase =`${order.purchase_units[0].items[0].quantity} x ${order.purchase_units[0].items[0].name} $ ${order.purchase_units[0].items[0].unit_amount.value}`;
        
            const total = `$ ${order.purchase_units[0].amount.value}`;
        
            const output = <table>
        
              <caption>
                
                "Securewebsite Transaction"
                
              </caption>
        
              <thead>
        
                <tr>
        
                  <th id="transaction">
                    
                    Transaction
                    
                  </th>
        
                  <th id="name">
                    
                    Name:
                    
                  </th>
        
                  <th id="address">
                    
                    Address:
                    
                  </th>
        
                  <th id="purchase">
                    
                    Purchase:
                    
                  </th>
        
                  <th id="total">
                    
                    Total:
                    
                  </th>
        
                </tr>
        
              </thead>
        
              <tbody>
        
                <tr>
        
                  <td headers="transaction">
                    
                    {transaction}
                    
                  </td>
        
                  <td headers="name">
                    
                    {name}
                    
                  </td>
        
                  <td headers="address">
                    
                    {address}
                    
                  </td>
        
                  <td headers="purchase">
                    
                    {purchase}
                    
                  </td>
        
                  <td headers="total">
                    
                    {total}
                    
                  </td>
        
                </tr>
        
              </tbody>
        
            </table>;
        
            setOutput(output);
          }}

          forceReRender={[count, order]}
        />

      </>
    );
  }

  const minus = () => {

    if (count > 1) setCount(count - 1)
  }

  const plus = () => {

    setCount(count + 1)
  }

  const srcListen = (e) => {

    const obj = e.currentTarget;

    obj.classList.add("fade");

    setTimeout(()=>{

      obj.classList.remove("fade");
    }, 100)
  }

  useEffect(() => {

    if(searchParams.get("ref") === "storeRef") {

      storeRef.current.scrollIntoView();
    }

    if(searchParams.get("ref") === "itemsRef") {

      itemsRef.current.scrollIntoView();
    }
  });
  
  return (
    <>
    
      <Header heading="STORE" />

      <div ref={itemsRef} className="container-fluid d pt-4 mt-lg-4 mb-lg-5">

        <Cards
          
          heading="Vestibulum eu"

        >

          <Link

            to="/store?ref=storeRef"
          
            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"

            onClick={cartOne}
        
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

                {items.cartOne.order}

              </p>

            </div>

            <button className="w-100 text-start ps-3 py-2">

              Check out
              
              <ArrowRight className="ms-2" />

            </button>

          </Link>

          <Link

            to="/store?ref=storeRef"
          
            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"

            onClick={cartTwo}
        
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

                {items.cartTwo.order} 

              </p>

            </div>

            <button className="w-100 text-start ps-3 py-2">

              Check out
              
              <ArrowRight className="ms-2" />

            </button>

          </Link>

          <Link

            to="/store?ref=storeRef"
          
            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"

            onClick={cartThree}
        
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

                {items.cartThree.order} 

              </p>

            </div>

            <button className="w-100 text-start ps-3 py-2">

              Check out
              
              <ArrowRight className="ms-2" />

            </button>

          </Link>

          <Link

            to="/store?ref=storeRef"
          
            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"

            onClick={cartFour}
        
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

                {items.cartFour.order}

              </p>

            </div>

            <button className="w-100 text-start ps-3 py-2">

              Check out
              
              <ArrowRight className="ms-2" />

            </button>

          </Link>

          <Link

            to="/store?ref=storeRef"
          
            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"

            onClick={cartFive}
        
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

                {items.cartFive.order}

              </p>

            </div>

            <button className="w-100 text-start ps-3 py-2">

              Check out
              
              <ArrowRight className="ms-2" />

            </button>

          </Link>

          <Link

            to="/store?ref=storeRef"
          
            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"

            onClick={cartSix}
        
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

                {items.cartSix.order} 

              </p>

            </div>

            <button className="w-100 text-start ps-3 py-2">

              Check out
              
              <ArrowRight className="ms-2" />

            </button>

          </Link>
          
        </Cards>

      </div>
    
      <div ref={storeRef} className="container d-flex align-items-center pt-5 mt-4 mt-sm-5">
            
        <div className="row justify-content-center w-100 g-0">

          <div className="col-10 ">

            <div id="payPal" className="row justify-content-center justify-content-xl-evenly align-items-xl-center g-0 pb-5 pb-xl-0">

              <div id="store" className="col-10 col-md-4 my-5 p-0">

                  <img onLoad={srcListen} src={order.image} alt="Food" width="366" height="366" />

              </div>

              <div id="counter" className="col-6 col-xl-auto d-flex flex-xl-column justify-content-center align-items-center">

                <span

                  className="text-center me-xl-4"
                  role="button"
                  onClick={minus}

                >

                  -

                </span>

                <label aria-label="Quantity" htmlFor="count" className="hidden">
                  
                  Quantity
                  
                </label>

                <input disabled={true} id="count" className="text-center m-4 ms-xl-0" type="text" value={count} />

                <span

                  className="text-center me-xl-4"
                  role="button"
                  onClick={plus}
                  
                >

                  +

                </span>

              </div>

              <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_ID, currency: "AUD", 'data-csp-nonce': '1e31b6130c5be9ef4cbab7eb38df5491' }} >
                  
                <ButtonWrapper showSpinner={true} /> 

              </PayPalScriptProvider>

            </div>

          </div>

        </div>

      </div>

      <section className="itemOutput container-xl px-5 px-xl-0 pt-sm-4 pt-lg-5 g-0">

        {output ? (
          
          <>   
            
            <h3 className="m-0 pt-5 pb-4">
              
              Order complete
              
            </h3>

            {output}

          </>  

        ) : (

          <>

            <h3 className="m-0 pt-5 pb-4">
              
              {`${order.name} $${order.value}`}
              
            </h3>

            <p className="p-4 m-0">

              <b className="d-block pb-4">

                {order.sub}
                
              </b>
              
              {order.description}
              
            </p>

          </>

        )}

      </section>

      <div className="container-xl p-5 py-sm-5 px-xl-0 my-lg-5 g-0">

        <Cta

          link="/store?ref=itemsRef"

          heading={`Lobor Kenean`}
          
          bold={`Mollis dui`}

          paragraph={
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tristique tincidunt dui, vel
            rhoncus sapien congue non. Aenean lobortis lorem eu commodo consequat. Etiam scelerisque mollis dui at
            suscipit. Donec ac diam rhoncus, porta velit at, faucibus velit.`
          }

          button={`Vestibulum eu`}

        />

      </div>

    </>                            
  );
}
export default Store;
