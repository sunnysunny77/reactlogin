import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import React, { useState } from "react";
import { ClipboardPulse } from 'react-bootstrap-icons';
import sunflower from "../images/sunflower.jpg";

const Admin = () => {

    const [count, setCount] = useState(1);

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
                            name: "Sunflower",
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

        const description = order.purchase_units[0].description;
        const orderID = order.id;
        const email = order.payer.email_address;
        const name = order.purchase_units[0].shipping.name.full_name

        let address = "";
        for (let x in order.purchase_units[0].shipping.address) {
            address +=
                order.purchase_units[0].shipping.address[x] + "<br>";
        }

        const purchase =
            order.purchase_units[0].items[0].quantity +
            " x " +
            order.purchase_units[0].items[0].name +
            " $" +
            order.purchase_units[0].items[0].unit_amount.value +
            "<br><br>Total: $" +
            order.purchase_units[0].amount.value;

        const output =
            "<h2>" +
            description +
            "</h2><br><br><h3>ID:</h3><br>" +
            orderID +
            "<br><br><h3>Email:</h3><br>" +
            email +
            "<br><br><h3>Name:</h3><br>" +
            name +
            "<br><br><h3>Address:</h3><br>" +
            address +
            "<br><h3>Purchase:</h3><br>" +
            purchase

        const approved = document.getElementById("approved")
        approved.innerHTML = output
        approved.className = "alert alert-primary"
    };

    const onError = (err) => {

        document.getElementById("approved").innerHTML = err
    }

    return (
        <React.Fragment>
            <br />
            <h1>Admin</h1>
            <br />
            <ClipboardPulse />
            <br />
            <br />
            <div id="payPal">
                <img src={sunflower} alt="sunflower" />
                <span
                    onClick={() => {

                        if (count > 1) setCount(count - 1)
                    }}
                >
                    -
                </span>
                <label htmlFor="count" className="d-none">Quantity</label>
                <input disabled={true} id="count" type="text" value={count} />
                <span
                    onClick={() => {

                        setCount(count + 1)
                    }}
                >
                    +
                </span>
                <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_ID, currency: "AUD", 'data-csp-nonce': 'xyz123' }} >
                    <PayPalButtons
                        style={{
                            layout: 'horizontal',
                            color: 'blue',
                            shape: 'pill',
                            label: 'paypal',
                            tagline: false,
                        }}
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                        forceReRender={[count]} />

                </PayPalScriptProvider>
                <div id="approved"></div>
            </div>
        </React.Fragment>
    );
}
export default Admin;