import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { Link } from "react-router-dom";
import { ArrowRight } from 'react-bootstrap-icons';
import { ArrowDownShort } from 'react-bootstrap-icons';
import Spinner from "../images/load.gif";
import Header from "../components/Header";
import Cards from "../components/Cards";
import Cta from "../components/Cta";
import styles from './Store.module.scss'; 

const Store = (props) => {

  const { items, order, setOrder } = props;

  const storeRef = useRef();

  const itemsRef = useRef();

  const outputRef = useRef();

  const [searchParams, setSearchParams] = useSearchParams();

  const [count, setCount] = useState(1);

  const [output, setOutput] = useState(false);

  const [summery, setSummery] = useState([]);

  const [total, setTotal] = useState(0);

  const [includes, setIncludes] = useState("add");

  const [cart, setCart] = useState({});

  const [remove, setRemove] = useState([]);

  const [disabled, setDisabled] = useState(true);

  const [selectedOption, setSelectedOption] = useState({ value: 'cartOne', label: items.cartOne.name });

  const options = [

    { value: 'cartOne', label: items.cartOne.name },
    { value: 'cartTwo', label: items.cartTwo.name },
    { value: 'cartThree', label: items.cartThree.name },
    { value: 'cartFour', label: items.cartFour.name },
    { value: 'cartFive', label: items.cartFive.name },
    { value: 'cartSix', label: items.cartSix.name },
  ];

  const cartOne = useCallback( () => {

    setCount(1);

    setOrder({ 

      ref: { value: 'cartOne', label: items.cartOne.name },
      image: items.cartOne.image,
      value: items.cartOne.value,
      name: items.cartOne.name,
      sub: items.cartOne.sub,
      description: items.cartOne.description,
    });

    setOutput(false);
  }, [items.cartOne.description, items.cartOne.sub, items.cartOne.name, items.cartOne.value, items.cartOne.image ,setOrder])

  const cartTwo = useCallback( () => {

    setCount(1);

    setOrder({ 

      ref: { value: 'cartTwo', label: items.cartTwo.name },
      image: items.cartTwo.image,
      value: items.cartTwo.value,
      name: items.cartTwo.name,
      sub: items.cartTwo.sub,
      description: items.cartTwo.description,
    });

    setOutput(false);
  }, [items.cartTwo.description, items.cartTwo.sub, items.cartTwo.name, items.cartTwo.value, items.cartTwo.image ,setOrder])

  const cartThree = useCallback( () => {

    setCount(1);

    setOrder({ 

      ref: { value: 'cartThree', label: items.cartThree.name },
      image: items.cartThree.image,
      value: items.cartThree.value,
      name: items.cartThree.name,
      sub: items.cartThree.sub,
      description: items.cartThree.description,
    });

    setOutput(false);
  }, [items.cartThree.description, items.cartThree.sub, items.cartThree.name, items.cartThree.value, items.cartThree.image ,setOrder])

  const cartFour = useCallback( () => {

    setCount(1);

    setOrder({ 

      ref: { value: 'cartFour', label: items.cartFour.name },
      image: items.cartFour.image,
      value: items.cartFour.value,
      name: items.cartFour.name,
      sub: items.cartFour.sub,
      description: items.cartFour.description,
    });

    setOutput(false);
  }, [items.cartFour.description, items.cartFour.sub, items.cartFour.name, items.cartFour.value, items.cartFour.image ,setOrder])

  const cartFive = useCallback( () => {

    setCount(1);

    setOrder({ 

      ref: { value: 'cartFive', label: items.cartFive.name },
      image: items.cartFive.image,
      value: items.cartFive.value,
      name: items.cartFive.name,
      sub: items.cartFive.sub,
      description: items.cartFive.description,
    });

    setOutput(false);
  }, [items.cartFive.description, items.cartFive.sub, items.cartFive.name, items.cartFive.value, items.cartFive.image ,setOrder])

  const cartSix = useCallback( () => {

    setCount(1);

    setOrder({ 

      ref: { value: 'cartSix', label: items.cartSix.name },
      image: items.cartSix.image,
      value: items.cartSix.value,
      name: items.cartSix.name,
      sub: items.cartSix.sub,
      description: items.cartSix.description,
    });

    setOutput(false);
  }, [items.cartSix.description, items.cartSix.sub, items.cartSix.name, items.cartSix.value, items.cartSix.image ,setOrder])
 
  const option = useCallback( (e) => {

    const select = { cartOne, cartTwo, cartThree, cartFour, cartFive, cartSix };

    setSelectedOption(e);

    select[e.value]();
  },[cartOne, cartTwo, cartThree, cartFour, cartFive, cartSix])

  const createOrder = (data, actions) => {

    let items = []

    for (const index in cart) {

      items.push(
        {
          description: cart[index].description,
          name: cart[index].name,
          unit_amount: {
            currency_code: "AUD",
            value: cart[index].value,
          },
          quantity: cart[index].quantity,
        }
      )
    }

    return actions.order.create({

      purchase_units: [
        {
          description: "Securewebsite Transaction",
          amount: {
            currency_code: "AUD",
            value: total,
            breakdown: {
              item_total: {
                currency_code: "AUD",
                value: total
              }
            }
          },
          items: [
           ...items
          ]
        }
      ],
    });
  }

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
    }

    let itemsArray = [];

    for (const index in itemsObj) {

      const quantity = itemsObj[index].quantity;

      const value = itemsObj[index].unit_amount.value;

      const name = itemsObj[index].name;

      const description = itemsObj[index].description;
        
      itemsArray.push(

        <div className="mt-3" key={index}>

          <div className="mb-2">

            <div className="mb-1">

              {quantity} x {name} &nbsp; $ {value * quantity} 

            </div> 

            <div>
              
              {description} 

            </div> 

          </div> 

        </div>
      );
    }

    const total = `$ ${units.amount.value}`;

    const output = <>

      <h3 className="m-0 pb-4 pt-5">

        Order Complete

      </h3>
    
      <table>

        <caption>
          
          {caption}
          
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
              
              {transaction}
              
            </td>

            <td headers="name">
              
              {name}
              
            </td>

            <td headers="address">
              
              {address}
              
            </td>

            <td headers="items">
              
              {itemsArray}
              
            </td>

            <td headers="total">
              
              {total}
              
            </td>

          </tr>

        </tbody>

      </table>

    </>;

    setCount(1);

    setTotal(0);

    setSummery([]);

    setCart([]);

    setRemove([]);

    setDisabled(true);

    setOutput(output);

    setOrder({ 

      image: items.cartOne.image,
      value: items.cartOne.value,
      name: items.cartOne.name,
      sub: items.cartOne.sub,
      description: items.cartOne.description,
    });
    
    setSelectedOption({ value: 'cartOne', label: items.cartOne.name });
  }

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
  }

  const minus = () => {

    if (count > 1) setCount(count - 1)
  }

  const plus = () => {

    setCount(count + 1)
  }

  const addCart = () => {

    if (disabled) setDisabled(false);

    setCart({
      ...cart, 
      [order.name]: { 
        ...cart[order.name], 
        description: order.description,
        name: order.name,
        quantity: count,
        value: order.value,
        ref: order.ref
      }
    })

    setOutput(false);
  }

  const init = useCallback(() => {

    let summery = [];

    let total = 0;

    let remove = [];

    for (const index in cart) {

      const quantity = cart[index].quantity;

      const sum = quantity * cart[index].value;

      total = total + sum;

      summery.push(

        <li 
        
          key={index}
          
          className="d-flex flex-column flex-xl-row align-items-xl-center justify-content-xl-between mb-3"
  
        >

          <span

            className="edit"
          
            onClick={() => {

              option(cart[index].ref);

              init();
            }}       

          >

           {quantity} x {cart[index].name}

          </span>

          <span>

            $ {sum}

          </span>

        </li>

      );

      remove.push(
        
        <li 
        
          key={index}
          
          className="d-flex flex-column flex-xl-row mb-3"
        
        >

          <button

            className="remove p-0 ms-4"
            
            onClick={(e) => {

              let newCart = cart;

              delete newCart[cart[index].name];

              setCart(newCart);

              if (Object.keys(newCart).length === 0) setDisabled(true);

              init();
            }}

          >

            remove

          </button>

        </li>

      ); 
    }

    setTotal(total);

    setSummery(summery);

    setRemove(remove);

    if (!Object.keys(cart).includes(order.name)) {

      return setIncludes("add")
    } 
    
    setIncludes("edit")
  }, [cart, option, order])

  const srcListen = (e) => {

    const obj = e.currentTarget;

    obj.classList.add("fade");

    setTimeout(()=>{

      obj.classList.remove("fade");
    }, 100)
  }

  const orderValue = useCallback(() => {

     if (order.ref) setSelectedOption(order.ref);
  }, [order])

  const outputScroll = useCallback(() => {

    if (output) outputRef.current.scrollIntoView();
  }, [output])

  const search = useCallback(() => {

    const ref = searchParams.get("ref");

    if(ref === "storeRef") {

      storeRef.current.scrollIntoView();
    }
    
    if(ref === "itemsRef") {

      itemsRef.current.scrollIntoView();
    } 
    
    if (ref) {

      searchParams.delete("ref");
      setSearchParams(searchParams);
    }

  }, [searchParams, setSearchParams])

  useEffect(() => {

    orderValue();

    outputScroll();

    search();

    init();
  }, [init, search, outputScroll, orderValue]);

  return (
    <>
    
      <Header heading="STORE" />

      <div ref={itemsRef} className="container-fluid d pt-4 mt-lg-4 mb-lg-5">

        <Cards
          
          heading="Vestibulum eu"

        >

          <Link

            to="?ref=storeRef"
          
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

                {items.cartOne.description}

              </p>

            </div>

            <button className="w-100 text-start ps-3 py-2">

              Order
              
              <ArrowRight className="ms-2" />

            </button>

          </Link>

          <Link

            to="?ref=storeRef"
          
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

                {items.cartTwo.description} 

              </p>

            </div>

            <button className="w-100 text-start ps-3 py-2">

              Order
              
              <ArrowRight className="ms-2" />

            </button>

          </Link>

          <Link

            to="?ref=storeRef"
          
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

                {items.cartThree.description} 

              </p>

            </div>

            <button className="w-100 text-start ps-3 py-2">

              Order
              
              <ArrowRight className="ms-2" />

            </button>

          </Link>

          <Link

            to="?ref=storeRef"
          
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

                {items.cartFour.description}

              </p>

            </div>

            <button className="w-100 text-start ps-3 py-2">

              Order
              
              <ArrowRight className="ms-2" />

            </button>

          </Link>

          <Link

            to="?ref=storeRef"
          
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

                {items.cartFive.description}

              </p>

            </div>

            <button className="w-100 text-start ps-3 py-2">

              Order
              
              <ArrowRight className="ms-2" />

            </button>

          </Link>

          <Link

            to="?ref=storeRef"
          
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

                {items.cartSix.description} 

              </p>

            </div>

            <button className="w-100 text-start ps-3 py-2">

              Order
              
              <ArrowRight className="ms-2" />

            </button>

          </Link>
          
        </Cards>

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

                  value={selectedOption}

                  onChange={option}

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

                {includes}

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

                        {summery}

                      </ul>

                    </div> 

                    <div className="flex-fill h-100">

                      <ul className="list-unstyled h-100 d-flex flex-column justify-content-around m-0"> 

                        {remove}

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
                
                $ {total}

              </div>

            </div>

          </div>

          <div ref={outputRef} className="col-12 col-md-10">            

            {output}

          </div>

        </div>

      </div>

      <div className="container-xl px-4 pb-5 px-sm-5 px-xl-0 mb-lg-5  pt-5 mt-lg-5 g-0">

        <Cta

          link="?ref=itemsRef"

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
}
export default Store;
