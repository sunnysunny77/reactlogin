import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import React, { useState } from "react";
import { Bag } from 'react-bootstrap-icons';
import Stationary from "../images/stationary-store.webp";
import Spinner from "../images/load.gif";

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
                    createOrder={createOrder}
                    onApprove={onApprove}
                    forceReRender={[count]}
                />
            </>
        );
    }
    
    const createOrder = (data, actions) => {

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
                            name: "Stationary",
                            unit_amount: {
                                currency_code: "AUD",
                                value: "20"
                            },
                            quantity: count,
                        },
                    ]
                }],
        });
    };

    const onApprove = async (data, actions) => {

        const order = await actions.order.capture()

        const description = order.purchase_units[0].description

        const orderID = order.id

        const email = order.payer.email_address

        const name = order.purchase_units[0].shipping.name.full_name

        let address = ""
        for (let x in order.purchase_units[0].shipping.address) {
            
            address +=
                order.purchase_units[0].shipping.address[x] + " "
        }

        const purchase =
            order.purchase_units[0].items[0].quantity +
            " x " +
            order.purchase_units[0].items[0].name +
            " $" +
            order.purchase_units[0].items[0].unit_amount.value

        const total = "$" + order.purchase_units[0].amount.value

        const output = <table className="alert alert-primary">
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
                    <td headers="transaction">{orderID}</td>
                    <td headers="email">{email}</td>
                    <td headers="name">{name}</td>
                    <td headers="address">{address}</td>
                    <td headers="purchase">{purchase}</td>
                    <td headers="total">{total}</td>
                </tr>
            </tbody>
        </table>

        props.setOrder(output)
    };

    return (
        <section className="store px-3 col-11 mx-auto align-self-start">
            <br />
            <Bag />
            <h1 className="m-0" >Store</h1>
            <br />
            <br />
            <div id="payPal">
                <div id="stationary" className="py-5">
                    <img src={Stationary} alt="Stationary" />
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
                    <label aria-label="Quantity" htmlFor="count" className="d-none">Quantity</label>
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
        </section>
    );
}
export default Store;
