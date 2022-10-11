import React, { useEffect } from "react";
import { ClipboardPulse } from 'react-bootstrap-icons';
import sunflower from "../images/sunflower.jpg";

const Admin = () => {

    useEffect(() => {

        const script = document.createElement("script")
        script.src = process.env.REACT_APP_PAYPAL_ID + "&currency=AUD"
        document.head.appendChild(script)
        script.addEventListener("load", () => {

            window.paypal.Buttons({

                createOrder: (data, actions, err) => {

                    return actions.order.create({

                        purchase_units: [
                            {
                                description: "Sunflower",
                                amount: {
                                    currency_code: "AUD",
                                    value: 20,
                                },
                            },
                        ]
                    })
                },
                onApprove: async (data, actions) => {

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
                    const total = " $" + order.purchase_units[0].amount.value
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
                        "<br><br><h3>Total:</h3><br>" +
                        total

                    const approved = document.getElementById("approved")
                    approved.innerHTML = output
                    approved.className = "alert alert-primary"
                },
                onError: (err) => {

                    document.getElementById("approved").innerHTML = err
                }
            }).render(document.getElementById("payPal"))
        })
    }, [])

    return (
        <React.Fragment>
            <br />
            <h1>Admin</h1>
            <br />
            <ClipboardPulse />
            <br />
            <br />
            <img id="sunflower" src={sunflower} alt="sunflower" />
            <div id="payPal"></div>
            <section id="approved"></section>
        </React.Fragment>
    );
}

export default Admin;