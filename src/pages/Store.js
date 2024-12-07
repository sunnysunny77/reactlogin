import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import React, { useState } from "react";
import Food from "../images/food.webp";
import Spinner from "../images/load.gif";
import Header from "../components/Header";

const Store = (props) => {

  const { order } = props;

  const [count, setCount] = useState(1);
  
  const ButtonWrapper = ({ showSpinner }) => {

    const [{ isPending }] = usePayPalScriptReducer();
        
    return (
      <>
        { (showSpinner && isPending) && <img id="spinner" src={Spinner} alt="Spinner" /> }

        <PayPalButtons

          style={{
            layout: 'horizontal',
            color: 'silver',
            shape: 'pill',
            label: 'paypal',
            tagline: false,
            disableMaxWidth: true,
          }}

          className="button-container-inner"

          createOrder={(data, actions) => {

            const value = count * 20
      
            return actions.order.create({
        
              purchase_units: [
                {
                  description: "Securewebsite Transaction",
                  amount: {
                    currency_code: "AUD",
                    value: value,
                    breakdown: {
                      item_total: {
                        currency_code: "AUD",
                        value: value
                    }
                    }
                  },
                  items: [
                    {
                      name: "Food",
                      unit_amount: {
                        currency_code: "AUD",
                        value: "20"
                      },
                      quantity: count,
                    },
                  ]
                }
              ],
            });

          }}

          onApprove={ async (data, actions) => {

            const order = await actions.order.capture()
    
            const description = order.purchase_units[0].description
    
            const transaction = order.id
    
            const email = order.payer.email_address
    
            const name = order.purchase_units[0].shipping.name.full_name
    
            let address = ""
            for (let x in order.purchase_units[0].shipping.address) {
                
              address += order.purchase_units[0].shipping.address[x] + " "
            }
    
            const purchase =
              order.purchase_units[0].items[0].quantity +
              " x " +
              order.purchase_units[0].items[0].name +
              " $" +
              order.purchase_units[0].items[0].unit_amount.value
        
            const total = "$" + order.purchase_units[0].amount.value
        
            const output = <table className="mt-5">
              <caption>{description}</caption>
              <thead>
                <tr>
                  <th id="transaction">Transaction</th>
                  <th id="email">Email:</th>
                  <th id="name">Name:</th>
                  <th id="address">Address:</th>
                  <th id="purchase">Purchase:</th>
                  <th id="total">Total:</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                  <td headers="transaction">{transaction}</td>
                  <td headers="email">{email}</td>
                  <td headers="name">{name}</td>
                  <td headers="address">{address}</td>
                  <td headers="purchase">{purchase}</td>
                  <td headers="total">{total}</td>
                </tr>
              </tbody>
            </table>
        
            props.setOrder(output)

          }}

          forceReRender={[count]}
        />
      </>
    );
  }

  return (
    <>
      <Header heading="STORE" />
  
        <div className="container min-md-height d-flex align-items-center pt-5 my-5">
            
          <div className="row justify-content-center w-100 g-0">

            <div className="col-10">

              <div id="payPal">

                <div id="store" className="my-5 p-0">

                    <img src={Food} alt="Food" width="366" height="366" />

                </div>

                <div id="counter" className="my-5">

                  <span
                    role="button"
                    onClick={() => {

                      if (count > 1) setCount(count - 1)
                    }}
                  >
                    -
                  </span>

                  <label aria-label="Quantity" htmlFor="count" className="hidden">Quantity</label>

                  <input disabled={true} id="count" type="text" value={count} />

                  <span
                    role="button"
                    onClick={() => {

                      setCount(count + 1)
                    }}
                  >
                    +
                  </span>

                </div>    

                <div className="button-container ps-md-3">

                  <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_ID, currency: "AUD", 'data-csp-nonce': '1e31b6130c5be9ef4cbab7eb38df5491' }} >
                      
                    <ButtonWrapper showSpinner={true} /> 

                  </PayPalScriptProvider>

                </div>

              </div>

            {order}

          </div>

        </div>

      </div>
    </>                            
  );
}
export default Store;
