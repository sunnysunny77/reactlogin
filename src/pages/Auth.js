import Accordion from 'react-bootstrap/Accordion';
import React, { useState, useEffect } from "react";

const Auth = (props) => {

  const {
    classes,
    login,
    email,
    pass,
    onPass,
    onEmail,
    onSub,
    classesInitialauthentication,
    factor,
    emailNew,
    onEmailNew,
    onSubInitialauthentication,
    classesAuthentication,
    code,
    security,
    onSecurity,
    onSubAuthentication,
    classesRegistration,
    signup,
    passRegistration,
    onPassRegistration,
    onSubRegistration,
  } = props;

  const [captchaForm, setCaptchaForm] = useState(true);
  const [captcha, setCaptcha] = useState('');

  const fetchCaptcha =  async () => { 
    
    const res = await fetch("/captcha/init", {

      credentials: "include",
      method: 'POST',
      mode: 'cors',
    })

    if (!res.ok) {

      throw new Error(`Response status: ${res.status}`);
    }

    const json = await res.json();
    setCaptcha(json.Canvas)
  }

  useEffect(() => {

    fetchCaptcha();
  }, [])

  return (
    <>

      <header className="container-fluid row g-0">

        <div className="row position-relative overflow-hidden g-0">

            <div className="col-12 bg-1">

                <h1 className="py-3 px-4 m-0">AUTH</h1>

            </div>

            <div className="shunt"></div>

        </div>

      </header>

      <div className="Auth-form-container w-100">

        <Accordion defaultActiveKey="0" className='px-3 py-5 my-5'>

          <Accordion.Item eventKey="0">

            <Accordion.Header>Login</Accordion.Header>

            <Accordion.Body className='p-5'>

              <form onSubmit={onSub} className="Auth-form">

                <label>Email address

                  <input
                    type="email"
                    className="form-control mt-1"
                    placeholder="Enter email"
                    value={email} onChange={onEmail}
                    autoComplete="on"
                  />

                </label>

                <label>Password

                  <input
                    type="password"
                    className="form-control mt-1"
                    placeholder="Enter password"
                    value={pass} onChange={onPass}
                    autoComplete="on"
                  />

                </label>

                <button type="submit" className="btn mt-2 btn-light">

                  Submit

                </button>

                <p className={"alert alert-secondary " + classes} role="alert">

                  {login}

                </p>

              </form>

            </Accordion.Body>

          </Accordion.Item>

          <Accordion.Item eventKey="1">

            <Accordion.Header>Signup</Accordion.Header>

            <Accordion.Body className='p-5'>

              {captchaForm ? (

                <React.Fragment>

                  <p id="responseCaptcha">Please enter captcha</p>

                  <img src={captcha} alt="canvas" ></img>

                  <label className="d-none" htmlFor="txtInput">Captcha</label>

                  <input
                    className="form-control mt-1"
                    type="text"
                    id="txtInput"
                  />

                  <button
                    className="btn btn-light mt-2"
                    onClick={ async () => {

                      const res = await fetch("/captcha/authorization", {

                        credentials: "include",
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ Txt: document.getElementById('txtInput').value.split(' ').join('') }),
                      })

                      if (!res.ok) {

                        throw new Error(`Response status: ${res.status}`);
                      }
                  
                      const json = await res.json();
                    
                      if (!json.CaptchaForm) {

                        setCaptchaForm(false)
                      } else {

                        const cap = document.getElementById("responseCaptcha");

                        cap.innerHTML = json.CaptchaForm;
              
                        setTimeout(() => {
                  
                          cap.innerHTML = "Please enter captcha";
                        }, 2500)
                      }
                    }}
                  >

                    Submit

                  </button>

                  <button
                    className="btn btn-light mb-3 mt-2"
                    onClick={() => fetchCaptcha()}
                  >

                    Refresh

                  </button>

                </React.Fragment>

              ) : ( factor ? (

                  <form onSubmit={onSubInitialauthentication} className="Auth-form">

                    <label>Get authentication code
                      
                      <input
                        type="email"
                        className="form-control mt-1"
                        placeholder="Enter email"
                        value={emailNew} onChange={onEmailNew}
                        autoComplete="on"
                        id="email"
                      />

                    </label>

                    <button id="submit" type="submit" className="btn mt-2 btn-light">

                      Submit

                    </button>

                    <p className={"alert alert-secondary " + classesInitialauthentication} role="alert">

                      {factor}

                    </p>

                  </form> 

                ) : ( code ? (

                    <form onSubmit={onSubAuthentication} className="Auth-form">

                      <label>Enter authentication code
                        
                        <input
                          type="text"
                          className="form-control mt-1"
                          placeholder="Paste code"
                          value={security}
                          onChange={onSecurity}
                          id="code"
                        />

                      </label>

                      <button id="submit" type="submit" className="btn mt-2 btn-light">

                        Submit

                      </button>

                      <p className="alert alert-secondary mt-2" role="alert">

                        Check your inbox

                      </p>

                      <p className={"alert alert-secondary " + classesAuthentication} role="alert">

                        {code}

                      </p>

                    </form>

                  ) : (

                    <form onSubmit={onSubRegistration} className="Auth-form">

                      <label>Create Password

                        <input
                          type="password"
                          className="form-control mt-1"
                          placeholder="Enter password"
                          value={passRegistration} onChange={onPassRegistration}
                          autoComplete="on"
                          id="pass"
                        />

                      </label>

                      <button id="submit" type="submit" className="btn mt-2 btn-light">

                        Submit

                      </button>

                      <p className={"alert alert-secondary " + classesRegistration} role="alert">

                        {signup}

                      </p>

                    </form>
                    
                  )

                )

              )}

            </Accordion.Body>

          </Accordion.Item>

          <p className='rady p-3 mt-3'>
            Ut enim ad ed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
          </p>

        </Accordion>

      </div>
  </>
  )
}
export default Auth;
