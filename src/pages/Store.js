import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import React, { useRef, useState, useEffect } from "react";
import { ArrowRight } from 'react-bootstrap-icons';
import Spinner from "../images/load.gif";
import Header from "../components/Header";
import Cards from "../components/Cards";
import Fruits from "../images/fruits.webp";
import Broccoli from "../images/broccoli.webp";
import Basil from "../images/basil.webp";
import Cucumbers from "../images/cucumbers.webp";
import Schwab from "../images/schwab.webp";
import Chitto from "../images/chitto.webp";

const Store = (props) => {

  const { order, image, value, name, scroll, setOrder, setImage, setValue, setName, setScroll } = props;

  const payRef = useRef();

  const srcRef = useRef();

  const [count, setCount] = useState(1);

  const style = {
    layout: 'horizontal',
    color: 'silver',
    shape: 'pill',
    label: 'paypal',
    tagline: false,
    disableMaxWidth: true,
  };

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

    setOrder(output);
  }
  
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

            onClick={() => {

              payRef.current.scrollIntoView();

              setCount(1);

              setImage(Fruits);

              setValue("23");

              setName("In accumsan");

              setOrder(

                <section>

                  <h2 className="py-5 m-0">
                    
                    In accumsan $23
                    
                  </h2> 

                  <p className='rady p-3 mb-5'>

                    Ut enim ad ed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                  
                  </p>

                </section>

              )

            }}
        
          >

            <div className="card-inner h-100">

              <div className="overflow-hidden">

                <img src={Fruits} alt="fruits" width="399" height="265"/>

              </div>

              <h3 className="mt-3 mb-2 ps-2"> 

                In accumsan

              </h3>

              <b className="d-block ps-2">

                Nec rutrum

              </b>

              <p className="mt-3 mb-3 p-2">

                Dolor magna. In accumsan
                scelerisque lorem nec rutrum. Phasellus et turpis posuere.

              </p>

            </div>

            <button className="w-100 text-start ps-3 py-2">

              Purchase
              
              <ArrowRight className="ms-2" />

            </button>

          </div>

          <div 
          
            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"

            onClick={() => {

              payRef.current.scrollIntoView();

              setCount(1);

              setImage(Broccoli);

              setValue("15");

              setName("Eleifend eu");

              setOrder(

                <section>

                  <h2 className="py-5 m-0">
                    
                    Eleifend eu $15
                    
                  </h2> 

                  <p className='rady p-3 mb-5'>

                    Sed sem ante, venenatis non neque in, aliquam faucibus leo. Vestibulum aliquam magna dui, sit amet lobortis neque vulputate quis.
                  
                  </p>

                </section>

              )
              
            }}
        
          >

            <div className="card-inner h-100">

              <div className="overflow-hidden">

                <img src={Broccoli} alt="broccoli" width="399" height="265"/>

              </div>

              <h3 className="mt-3 mb-2 ps-2"> 

                  Eleifend eu

              </h3>

              <b className="d-block ps-2">

                  Dolor magn

              </b>

              <p className="mt-3 mb-3 p-2">

                  Eleifend eu. Mauris et dolor magna. 

              </p>

            </div>

            <button className="w-100 text-start ps-3 py-2">

              Purchase
              
              <ArrowRight className="ms-2" />

            </button>

          </div>

          <div 
          
            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"

            onClick={() => {

              setCount(1);

              payRef.current.scrollIntoView();

              setImage(Basil);

              setValue("70");

              setName("Lectus eleifend");

              setOrder(

                <section>

                  <h2 className="py-5 m-0">
                    
                    Lectus eleifend $70
                    
                  </h2> 

                  <p className='rady p-3 mb-5'>

                    Nulla vel justo consequat, maximus tellus eget, dictum leo. Aenean pellentesque interdum nibh sit amet dictum.
                  
                  </p>

                </section>

              )
              
            }}
        
          >

            <div className="card-inner h-100">

              <div className="overflow-hidden">

                <img src={Basil} alt="basil" width="399" height="265"/>

              </div>

              <h3 className="mt-3 mb-2 ps-2"> 

                Lectus eleifend

              </h3>

              <b className="d-block ps-2">

                Lorem nec

              </b>

              <p className="mt-3 mb-3 p-2">

                Eget tincidunt lectus eleifend eu. Mauris et dolor magna. Dcelerisque lorem nec rutrum. 

              </p>

            </div>

            <button className="w-100 text-start ps-3 py-2">

                Purchase
                
                <ArrowRight className="ms-2" />

            </button>

          </div>

        <div 
          
          className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"

          onClick={() => {

            payRef.current.scrollIntoView();

            setCount(1);

            setImage(Cucumbers);

            setValue("17");

            setName("Phasellus et");

            setOrder(

              <section>

                <h2 className="py-5 m-0">
                  
                  Phasellus et $17
                  
                </h2> 

                <p className='rady p-3 mb-5'>

                  Ut id felis id ex convallis dapibus id ut justo. Mauris fermentum dui in varius posuere. Donec suscipit sollicitudin pellentesque.
                
                </p>

              </section>

            )
            
          }}
      
        >

          <div className="card-inner h-100">

              <div className="overflow-hidden">

                <img src={Cucumbers} alt="cucumbers" width="399" height="265"/>

              </div>

              <h3 className="mt-3 mb-2 ps-2"> 

                Phasellus et

              </h3>

              <b className="d-block ps-2">

                Scelerisque lorem

              </b>

              <p className="mt-3 mb-3 p-2">

                In gravida, sem in rhoncus pellentesque, dolor tortor tempor metus, ut ultricies lorem velit eu sem. Nulla vel justo consequat, maximus tellus eget, dictum leo. 

              </p>

            </div>

            <button className="w-100 text-start ps-3 py-2">

                Purchase
                
                <ArrowRight className="ms-2" />

            </button>

          </div>

          <div 
          
            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"

            onClick={() => {

              setCount(1);

              payRef.current.scrollIntoView();

              setImage(Schwab);

              setValue("57");

              setName("Turpis posuere");

              setOrder(

                <section>

                  <h2 className="py-5 m-0">
                    
                    Turpis posuere $57
                    
                  </h2> 

                  <p className='rady p-3 mb-5'>

                    Maecenas sed dui vel magna condimentum luctus et nec enim. Proin tincidunt facilisis felis ac convallis. Aenean tellus enim, malesuada sed faucibus eget, ornare quis ante.
                  
                  </p>

                </section>

              )
              
            }}
        
          >

            <div className="card-inner h-100">

              <div className="overflow-hidden">

                <img src={Schwab} alt="schwab" width="399" height="265"/>

              </div>

              <h3 className="mt-3 mb-2 ps-2"> 

                Turpis posuere

              </h3>

              <b className="d-block ps-2">

                Rutrum nec

              </b>

              <p className="mt-3 mb-3 p-2">

                Eget tincidunt lectus eleifend eu. Mauris et dolor magna. In accumsan. Phasellus et turpis posuere.

              </p>

            </div>

            <button className="w-100 text-start ps-3 py-2">

                Purchase
                
                <ArrowRight className="ms-2" />

            </button>

          </div>

          <div 
          
            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"

            onClick={() => {

              payRef.current.scrollIntoView();

              setCount(1);

              setImage(Chitto);

              setValue("56");

              setName("Accumsan Inn");

              setOrder(

                <section>

                  <h2 className="py-5 m-0">
                    
                    Accumsan Inn $56
                    
                  </h2> 

                  <p className='rady p-3 mb-5'>

                    Mauris fermentum dui in varius posuere. Donec suscipit sollicitudin pellentesque. In accumsan. Phasellus et turpis posuere.
                
                  
                  </p>

                </section>

              )
              
            }}
        
          >

            <div className="card-inner h-100">

              <div className="overflow-hidden">

                <img src={Chitto} alt="chitto" width="399" height="265"/>
              
              </div>

              <h3 className="mt-3 mb-2 ps-2"> 

                Accumsan In 

              </h3>

              <b className="d-block ps-2">

                lorem rutrum

              </b>

              <p className="mt-3 mb-3 p-2">

                Eget tincidunt lectus eleifend eu. Mauris et dolor magna. In accumsan
                scelerisque lorem nec rutrum. 

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
                  onClick={() => {

                    if (count > 1) setCount(count - 1)
                  }}

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
                  onClick={() => {

                    setCount(count + 1)
                  }}
                  
                >

                  +

                </span>

              </div>

              <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_ID, currency: "AUD", 'data-csp-nonce': '1e31b6130c5be9ef4cbab7eb38df5491' }} >
                  
                <ButtonWrapper showSpinner={true} /> 

              </PayPalScriptProvider>

            </div>

            {order}

          </div>

        </div>

      </div>

    </>                            
  );
}
export default Store;
