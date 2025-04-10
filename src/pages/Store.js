import React, { useCallback, useRef, useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { ArrowDownShort } from 'react-bootstrap-icons';
import { ArrowRight } from 'react-bootstrap-icons';
import Select from 'react-select';
import AccordianHeading from "../components/AccordianHeading"
import Cards from "../components/Cards";
import Cta from "../components/Cta";
import Header from "../components/Header";
import Spinner from "../images/load.gif";
import styles from './Store.module.scss'; 

const Store = (props) => {

  const { 
    header, referance, items, options, cartOrder, order, count, output, disabled, cart, 
    setReferance, setCount, setOutput, setDisabled, setCart, setIsScrolling
  } = props;

  const storeRef = useRef(null);

  const itemsRef = useRef(null);

  const outputRef = useRef(null);

  const [notReferance, setNotReferance] = useState(window.scrollY > 0);

  const [outputBool, setOutputBool] = useState(false);

  const createOrder = (data, actions) => {

  const items = Object.keys(cart).map((index) => cart[index]);

    return actions.order.create({

      purchase_units: [
        {
          description: "Securewebsite Transaction",
          amount: {
            currency_code: "AUD",
            value: total(),
            breakdown: {
              item_total: {
                currency_code: "AUD",
                value: total()
              }
            }
          },
          items: [
            ...items
          ]
        }
      ],
    });
  };

  const onApprove = async (data, actions) => {

    const order = await actions.order.capture();

    const units = order.purchase_units[0];

    const transaction = order.id;

    const caption = units.description;

    const shipping = units.shipping;

    const name = shipping.name.full_name;

    const addressObj = shipping.address;

    const itemsObj = units.items;

    let address = "";

    for (const index in addressObj) {
        
      address += `${addressObj[index]} `;
    };

    let itemsOutput = {};

    for (const index in itemsObj) {

      const quantity = itemsObj[index].quantity;

      const value = itemsObj[index].unit_amount.value;

      const name = itemsObj[index].name;

      const description = itemsObj[index].description;
        
      itemsOutput[index] = { quantity, name, value, description };
    };

    const total = `$ ${units.amount.value}`;

    setCount(1);

    setCart({});

    setDisabled(true);

    setOutput({ caption: caption, transaction: transaction, name: name, address: address, itemsOutput: itemsOutput , total: total });

    setOutputBool(true);

    cartOrder.cartOne();
  };

  const style = {

    layout: 'horizontal',
    color: 'silver',
    shape: 'pill',
    label: 'paypal',
    tagline: false,
    disableMaxWidth: true,
  };

  const ButtonWrapper = () => {
        
    const [{ isPending }] = usePayPalScriptReducer();
    
    return (

      <>

        { isPending ? <img className="spinner col-10 col-xl-5" width="40" height="40" src={Spinner} alt="Spinner" /> :

          <PayPalButtons

            style={style}

            className="button-container-inner col-10 col-xl-5"

            createOrder={(data, actions) => createOrder(data, actions)}

            onApprove={(data, actions) => onApprove(data, actions)}

            disabled={disabled}
            
          />

        }

      </>

    );
  };

  const minus = () => {

    if (count > 1) setCount(count - 1)
  };

  const plus = () => {

    setCount(count + 1)
  };

  const removeCart = (e) => {

    const obj = { ...cart };

    delete obj[e];

    setCart(obj);

    if (Object.keys(obj).length === 0) setDisabled(true);
  };

  const addCart = () => {

    setCart({
      ...cart, 
      [order.name]: { 
        description: order.description,
        name: order.name,
        unit_amount: {
          currency_code: "AUD",
          value: order.value,
        },
        quantity: count,
        ref: order.ref,
      }
    });

    setCount(1);

    setOutput({});

    setDisabled(false);
  };

  const total = () => {

    let total = 0;

    for (const index in cart) {

      total = total + (cart[index].quantity * cart[index].unit_amount.value);
    }

    return total;
  };

  const srcListen = (e) => {

    const obj = e.currentTarget;

    obj.classList.add("fade");

    setTimeout(()=>{

      obj.classList.remove("fade");
    }, 100)
  };

  const scroll_to = useCallback((e) => {

    window.scrollTo(0, e);
    setIsScrolling(e);
  },[setIsScrolling]);

  const optionOrder = (e) => {

    cartOrder[e.currentTarget.getAttribute("data-value")]();
    scroll_to(storeRef.current.offsetTop);
  };

  const action_callback = () => {

    scroll_to(itemsRef.current.offsetTop);
  };

  useEffect(() => {

    if (outputBool) {

      scroll_to(outputRef.current.offsetTop);

      return () => {

        setOutputBool(false);
      }
    }
  }, [outputBool, scroll_to]);

  useEffect(() => {

    if (referance) {

      scroll_to(storeRef.current.offsetTop);
      return () => {
  
        setReferance(false);
      };
    }
  }, [referance, scroll_to, setReferance]);

  useEffect(() => {

    if (notReferance && !referance) {    
      
      scroll_to(0);
    }
    return () => {

      setNotReferance(false);
    };
  }, [notReferance, referance, scroll_to]);

  return (

    <>
    
      <Header ref={header} heading="STORE" />

      <div ref={itemsRef} id="itemsRef" className="container-fluid pt-4 mt-lg-4 mb-lg-5">

        <Cards
          
          heading="Vestibulum eu"

        >

          <div
          
            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"

            onClick={(e)=>optionOrder(e)}

            data-value={options[0].value}
        
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

                {items.cartOne.description}

              </p>

            </div>

            <div className="div-button w-100 text-start ps-3 py-2">

              Order
              
              <ArrowRight className="ms-2" />

            </div>

          </div>

          <div
          
            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"

            onClick={(e)=>optionOrder(e)}

            data-value={options[1].value}
        
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

                {items.cartTwo.description} 

              </p>

            </div>

            <div className="div-button w-100 text-start ps-3 py-2">

              Order
              
              <ArrowRight className="ms-2" />

            </div>

          </div>

          <div
          
            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"

            onClick={(e)=>optionOrder(e)}

            data-value={options[2].value}
        
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

                {items.cartThree.description} 

              </p>

            </div>

            <div className="div-button w-100 text-start ps-3 py-2">

              Order
              
              <ArrowRight className="ms-2" />

            </div>

          </div>

          <div
          
            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"

            onClick={(e)=>optionOrder(e)}

            data-value={options[3].value}
        
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

                {items.cartFour.description}

              </p>

            </div>

            <div className="div-button w-100 text-start ps-3 py-2">

              Order
              
              <ArrowRight className="ms-2" />

            </div>

          </div>

          <div
          
            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"

            onClick={(e)=>optionOrder(e)}

            data-value={options[4].value}
        
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

                {items.cartFive.description}

              </p>

            </div>

            <div className="div-button w-100 text-start ps-3 py-2">

              Order
              
              <ArrowRight className="ms-2" />

            </div>

          </div>

          <div
          
            className="card d-flex flex-column justify-content-between mt-5 mt-sm-4 mt-lg-3"

            onClick={(e)=>optionOrder(e)}

            data-value={options[5].value}
        
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

                {items.cartSix.description} 

              </p>

            </div>

            <div className="div-button w-100 text-start ps-3 py-2">

              Order
              
              <ArrowRight className="ms-2" />

            </div>

          </div>
          
        </Cards>

      </div>

      <div className="container-md g-0">

        <div className="row justify-content-center w-100 mt-5 px-3 px-md-0  g-0">
 
          <div className="col-10 col-sm-11 col-md-10">

            <AccordianHeading
            
              content={[          
                {
                  heading: "Donec integer",
                  body: [
                    "Potenti magna porta ac sit lectus cubilia fringilla nulla tempor. Per libero eleifend sapien elementum pretium mauris felis eros amet.",
                    "Curabitur fermentum neque sagittis lacus commodo finibus dictum.",
                  ],              
                },
                {
                  heading: "Felis aliquam malesuada",
                  body: [
                    "Scelerisque tortor placerat conubia eleifend luctus. Platea laoreet est scelerisque.",
                    "Maximus libero primis sapien quisque ultricies. Commodo ipsum tempor pellentesque ex pulvinar iaculis.",
                  ],
                },     
                {
                  heading: "Aenean malesuada parturient",
                  body: [
                    "Primis lectus viverra pulvinar sit nullam nisl? Adipiscing mauris lacinia parturient ornare sagittis.",
                    "Consectetur diam pulvinar sagittis mus, orci laoreet. Donec sed ante, quis enim lectus semper.",
                    "Quisque habitasse neque fames rutrum dis tempus. Finibus platea neque sollicitudin; commodo taciti id eleifend. Orci nisl dui ex sociosqu facilisis ipsum maecenas.",
                  ], 
                },     
              ]}
            
            />

          </div>  

        </div>

      </div>
    
      <div ref={storeRef} className="paypal container-md d-flex align-items-center pt-5 px-4 px-sm-5 px-md-0 my-sm-4 g-0">
            
        <div className="row justify-content-center w-100 g-0">

          <div className="col-12 col-md-10">

            <div className="row justify-content-between  w-100 g-0">

              <div className="col-12 order-1">

                <h3 className="m-0 pb-4">
                  
                  {`${order.name} $ ${order.value}`}
                  
                </h3>

              </div>

              <div className="bg col-12 col-xl-8 order-3 order-xl-2">

                <p className="p-4 m-0 pe-xl-5">

                  <b className="d-block pb-4">

                    {order.sub}
                    
                  </b>
                  
                  {order.description}
                  
                </p>

              </div>

              <div className="bg col-12 col-xl-4 order-2 order-xl-3">

                <label className="w-100 py-1 px-3" htmlFor="select">

                  <ArrowDownShort  className="me-2"/>  
                  
                  Choose an option

                </label>

                <Select

                  inputId="select"

                  value={order.ref}

                  onChange={(e)=>cartOrder[e.value]()}

                  options={options}

                  isSearchable={false}

                  styles={{

                    menu: (provided) => ({

                      ...provided,

                      borderRadius: '0',

                      margin: '0',

                      color: styles.c6,

                      backgroundColor: styles.c4,

                      boxShadow: 'none',

                      border: '0',
                    }),

                    menuList: (provided) => ({

                      ...provided,

                      padding: '0',
                    }),

                    option: (provided) => ({

                      ...provided,

                      color: styles.c6,

                      fontSize: '16px',
        
                      cursor: 'pointer',

                      backgroundColor: styles.c4,

                      transition: 'background-color 0.3s',

                      willChange: 'background-color',

                      '&:hover': {

                        backgroundColor: styles.c15,
                      },
                    }),

                    control: (provided) => ({

                      ...provided,

                      borderRadius: '0',

                      border: '0',

                      boxShadow: 'none',
       
                      backgroundColor: styles.c4,

                      color: styles.c6,

                      cursor: 'pointer',

                      fontSize: '16px',

                      opacity: '1',

                      transition: 'opacity 0.3s',

                      willChange: 'opacity',

                      '&:hover': {

                        opacity: '0.9',
                      },
                    }),
                  }}

                  components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}

                />

              </div>

            </div>

          </div>

          <div className="bg col-12 col-md-10">

            <div className="row justify-content-center align-items-xl-center pb-4 pb-md-5 pb-xl-0 pe-xl-5 g-0">

              <div className="order-image col-10 col-md-4 my-5 p-0">

                  <img onLoad={srcListen} src={order.image} alt="Food" width="366" height="366" />

              </div>

              <div className="counter col-6 col-xl-3 d-flex flex-xl-column justify-content-center align-items-center">

                <span

                  className="text-center"
                  role="button"
                  onClick={minus}

                >

                  -

                </span>

                <label aria-label="Quantity" htmlFor="count" className="hidden">
                  
                  Quantity
                  
                </label>

                <input disabled={true} id="count" className="text-center m-4 mx-xl-0" type="text" value={count} />

                <span

                  className="text-center"
                  role="button"
                  onClick={plus}
                  
                >

                  +

                </span>

              </div>

              <button 
              
                className="button-container-inner col-10 col-xl-5"

                onClick={addCart}
                
              >

                {Object.keys(cart).includes(order.name) ? (

                    "update"

                  ) : (

                    "add"
                  )

                }

              </button>

            </div>

          </div>

          <div className="bg col-12 col-md-10">

            <div className="row justify-content-center justify-content-xl-end pb-5 pe-xl-5 g-0">
            
              {!disabled ? (

                <>

                  <div className="col-12 col-xl-7 d-flex align-items-stretch align-items-xl-center justify-content-evenly pb-4 px-4 px-md-5 pb-xl-0">  

                    <div className="flex-fill h-100">

                      <ul className="list-unstyled h-100 d-flex flex-column justify-content-around m-0"> 

                        {Object.keys(cart).map((index, i) => {

                          const { quantity, name, unit_amount: {value}, ref } = cart[index];

                          return (

                              <li 
            
                              key={i}
                              
                              className="d-flex flex-column flex-xl-row align-items-xl-center justify-content-xl-between mb-3"
                      
                            >
                    
                              <span
                    
                                className="reSelect"
                    
                                onClick={(e)=>optionOrder(e)}

                                data-value={ref.value}
                          
                              >
                    
                                {quantity} x {name}
                    
                              </span>
                    
                              <span>
                    
                                $ {quantity * value}
                    
                              </span>
                    
                            </li>
                            
                          )

                        })}
                  
                      </ul>

                    </div> 

                    <div className="flex-fill h-100">

                      <ul className="list-unstyled h-100 d-flex flex-column justify-content-around m-0"> 
        
                       {Object.keys(cart).map((index, i) => {
                            
                          const { name } = cart[index];

                          return (  
                            
                            <li 
        
                              key={i}
                              
                              className="d-flex flex-column flex-xl-row mb-3"
                            
                            >
                    
                              <button
                    
                                className="remove p-0 ms-4"
                    
                                onClick={() =>removeCart(name)}
                                
                              >
                    
                                remove
                    
                              </button>
                    
                            </li> 
                          
                          )

                        })}
                   
                      </ul>

                    </div>

                  </div>

                  <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_ID, currency: "AUD", 'data-csp-nonce': '1e31b6130c5be9ef4cbab7eb38df5491' }} >
                    
                    <ButtonWrapper showSpinner={true} /> 
            
                  </PayPalScriptProvider>

                </>

              ) : (

                <>

                  <div className="col-10 col-xl-5 d-flex align-items-center">

                    <ul className="w-100 list-unstyled m-0"> 

                      <li className="button-container-inner px-4">no items</li>

                    </ul>

                  </div>

                </>

              )}  

              <div className="col-12 ps-4 ps-md-5 pt-4">

                <span className="total pe-2">
                  
                  total 
                  
                </span> 
                
                $ {total()}

              </div>

            </div>

          </div>

            <div className="col-12 col-md-10" ref={outputRef}></div>

            {Object.keys(output).length > 0  &&

              <section ref={outputRef} className="col-12 col-md-10">    

                <h3  className="m-0 pb-4 pt-5">

                  Order Complete

                </h3>

                <table>

                  <caption>
                    
                    {output.caption}
                    
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

                      <th id="items">
                        
                        Items:
                        
                      </th>

                      <th id="total">
                        
                        Total:
                        
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    <tr>

                      <td headers="transaction">
                        
                        {output.transaction}
                        
                      </td>

                      <td headers="name">
                        
                        {output.name}
                        
                      </td>

                      <td headers="address">
                        
                        {output.address}
                        
                      </td>

                      <td headers="items">
                    
                        {Object.keys(output.itemsOutput).map((index, i) => {
                          
                          const { quantity, name, value, description } = output.itemsOutput[index];

                          return (
                        
                            <div className="mt-3" key={i}>

                              <div className="mb-2">

                                <div className="mb-1">

                                  {quantity} x {name} &nbsp; $ {value * quantity} 

                                </div> 

                                <div>
                                  
                                  {description} 

                                </div> 

                              </div> 

                            </div>

                          )

                        })}
                                                  
                      </td>

                      <td headers="total">
                        
                        {output.total}
                        
                      </td>

                    </tr>

                  </tbody>

               </table>

              </section>

            }

        </div>

      </div>

      <div className="container-xl px-4 pb-5 px-sm-5 px-xl-0 mb-lg-5  pt-5 mt-lg-5 g-0">

        <Cta

          onClick={action_callback}

          heading={`Lobor Kenean`}
          
          bold={`Mollis dui`}

          paragraph={
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tristique tincidunt dui, vel
            rhoncus sapien congue non. Aenean lobortis lorem eu commodo consequat.`
          }

          button={`Vestibulum eu`}

        />

        </div>

    </>    
                            
  );
};

export default Store;
