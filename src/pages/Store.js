import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import React, { useRef, useState, useEffect } from "react";
import { ArrowRight } from 'react-bootstrap-icons';
import Spinner from "../images/load.gif";
import Header from "../components/Header";
import Cards from "../components/Cards";

const Store = (props) => {

  const { items, image, value, name, sub, order, scroll, setImage, setValue, setName, setSub, setOrder, setScroll } = props;

  const payRef = useRef();

  const srcRef = useRef();

  const [count, setCount] = useState(1);

  const [output, setOutput] = useState(false);

  const cartOne = () => {

    payRef.current.scrollIntoView();

    setCount(1);

    setImage(items.cartOne.image);

    setValue(items.cartOne.value);

    setName(items.cartOne.name);

    setSub(items.cartOne.sub);

    setOrder(items.cartOne.order);

    setOutput(false);

  }

  const cartTwo = () => {

    payRef.current.scrollIntoView();

    setCount(1);

    setImage(items.cartTwo.image);

    setValue(items.cartTwo.value);

    setName(items.cartTwo.name);

    setSub(items.cartTwo.sub);

    setOrder(items.cartTwo.order);

    setOutput(false);
    
  }

  const cartThree = () => {

    setCount(1);

    payRef.current.scrollIntoView();

    setImage(items.cartThree.image);

    setValue(items.cartThree.value);

    setName(items.cartThree.name);

    setSub(items.cartThree.sub);

    setOrder(items.cartThree.order);

    setOutput(false);
    
  }

  const cartFour = () => {

    payRef.current.scrollIntoView();

    setCount(1);

    setImage(items.cartFour.image);

    setValue(items.cartFour.value);

    setName(items.cartFour.name);

    setSub(items.cartFour.sub);

    setOrder(items.cartFour.order);
    
  }

  const cartFive = () => {

    setCount(1);

    payRef.current.scrollIntoView();

    setImage(items.cartFive.image);

    setValue(items.cartFive.value);

    setName(items.cartFive.name);

    setSub(items.cartFive.sub);

    setOrder(items.cartFive.order);

    setOutput(false);
    
  }

  const cartSix = () => {

    payRef.current.scrollIntoView();

    setCount(1);

    setImage(items.cartSix.image);

    setValue(items.cartSix.value);

    setName(items.cartSix.name);

    setSub(items.cartSix.sub);

    setOrder(items.cartSix.order);

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

          createOrder={createOrder}

          onApprove={onApprove}

          forceReRender={[count]}
        />

      </>
    );
  }

  const createOrder = (data, actions) => {

    const price = count * value

    return actions.order.create({

      purchase_units: [
        {
          description: "Securewebsite Transaction",
          amount: {
            currency_code: "AUD",
            value: price,
            breakdown: {
              item_total: {
                currency_code: "AUD",
                value: price
              }
            }
          },
          items: [
            {
              name: name,
              unit_amount: {
                currency_code: "AUD",
                value: value
              },
              quantity: count,
            },
          ]
        }
      ],
    });
  }

  const onApprove = async (data, actions) => {

    const order = await actions.order.capture();

    const description = order.purchase_units[0].description;

    const transaction = order.id;

    const email = order.payer.email_address;

    const name = order.purchase_units[0].shipping.name.full_name;

    let address = "";
    for (const index in order.purchase_units[0].shipping.address) {
        
      address += `${order.purchase_units[0].shipping.address[index]} `;
    }

    const purchase =`${order.purchase_units[0].items[0].quantity} x ${order.purchase_units[0].items[0].name} $ ${order.purchase_units[0].items[0].unit_amount.value}`;

    const total = `$ ${order.purchase_units[0].amount.value}`;

    const output = <table className="my-5">

      <caption>
        
        {description}
        
      </caption>

      <thead>

        <tr>

          <th id="transaction">
            
            Transaction
            
          </th>

          <th id="email">
            
            Email:
            
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

          <td headers="email">
            
            {email}
            
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
   }, 350)
  }

  useEffect(() => {

    const obj = srcRef.current;

    obj.addEventListener("load", srcListen);

    if (scroll) payRef.current.scrollIntoView({});

    setScroll(false);

    setOutput(false);

    return () => obj.removeEventListener("load", srcListen);

  }, [scroll, setScroll])
  
  return (
    <>
    
      <Header heading="STORE" />

      <div className="container-fluid d pt-5 mt-sm-4 mt-lg-5">

        <Cards
        
        heading="Vestibulum eu"

        >

          <div 
          
            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"

            onClick={cartOne}
        
          >

            <div className="card-inner h-100">

              <div className="overflow-hidden">

                <img src={items.cartOne.image} alt="fruits" width="399" height="265"/>

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

              Purchase
              
              <ArrowRight className="ms-2" />

            </button>

          </div>

          <div 
          
            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"

            onClick={cartTwo}
        
          >

            <div className="card-inner h-100">

              <div className="overflow-hidden">

                <img src={items.cartTwo.image} alt="broccoli" width="399" height="265"/>

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

              Purchase
              
              <ArrowRight className="ms-2" />

            </button>

          </div>

          <div 
          
            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"

            onClick={cartThree}
        
          >

            <div className="card-inner h-100">

              <div className="overflow-hidden">

                <img src={items.cartThree.image} alt="basil" width="399" height="265"/>

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

              Purchase
              
              <ArrowRight className="ms-2" />

            </button>

          </div>

        <div 
          
          className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"

          onClick={cartFour}
      
        >

          <div className="card-inner h-100">

            <div className="overflow-hidden">

              <img src={items.cartFour.image} alt="cucumbers" width="399" height="265"/>

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

              Purchase
              
              <ArrowRight className="ms-2" />

            </button>

          </div>

          <div 
          
            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"

            onClick={cartFive}
        
          >

            <div className="card-inner h-100">

              <div className="overflow-hidden">

                <img src={items.cartFive.image} alt="schwab" width="399" height="265"/>

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

              Purchase
              
              <ArrowRight className="ms-2" />

            </button>

          </div>

          <div 
          
            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"

            onClick={cartSix}
        
          >

            <div className="card-inner h-100">

              <div className="overflow-hidden">

                <img src={items.cartSix.image} alt="chitto" width="399" height="265"/>

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

              Purchase
              
              <ArrowRight className="ms-2" />

            </button>

          </div>
          
        </Cards>

      </div>
    
      <div ref={payRef} className="container d-flex align-items-center pt-5 mb-5 mb-lg-5 mt-lg-4">
            
        <div className="row justify-content-center w-100 g-0">

          <div className="col-10 ">

            <div id="payPal" className="row justify-content-center justify-content-xl-evenly align-items-xl-center g-0 pb-5 pb-xl-0">

              <div id="store" className="col-10 col-md-4 my-5 p-0">

                  <img ref={srcRef} src={image} alt="Food" width="366" height="366" />

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

            {output ? (
            
              output

            ) : (

              <section className="mb-5 pb-4">

                <h3 className="m-0 py-5">
                  
                  {`${name} $${value}`}
                  
                </h3>

                <p className="p-4">

                  <b className="d-block pb-4">

                    {sub}
                    
                  </b>
                  
                  {order}
                  
                </p>

              </section>

            )}

          </div>

        </div>

      </div>

    </>                            
  );
}
export default Store;
