import Accordion from 'react-bootstrap/Accordion';
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Auth = (props) => {

  const {
    token,
    setLoad,
    setAuth
  } = props;

  const navigate = useNavigate();

  const [captchaForm, setCaptchaForm] = useState(true);
  const [captcha, setCaptcha] = useState("");

  const [classes, setClasses] = useState("displayNone");
  const [classesInitialauthentication, setClassesInitialauthentication] = useState("displayNone");
  const [classesAuthentication, setClassesAuthentication] = useState("displayNone");
  const [classesRegistration, setClassesRegistration] = useState("displayNone");

  const [login, setLogin] = useState(false);
  const [factor, setFactor] = useState(true);
  const [code, setCode] = useState(true);
  const [signup, setSignup] = useState(false);

  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  
  const [emailNew, setEmailNew] = useState("");
  const [security, setSecurity] = useState("");
  const [passRegistration, setPassRegistration] = useState("");

  const authorization = async (e) => {

    e.preventDefault();
    setLogin("Loading...");
    setClasses("display");

    let res = await fetch(`/api/?model=login&controller=authorization&token=${token}`, {

      method: 'OPTIONS',
      mode: 'cors',
      headers: {
        'Authorization': 'Basic ' + btoa(email + ":" + pass)
      }
    })

    if (!res.ok) { 
      
      let err = await res.text();
      setLoad(err);
      return;
    }
    let json = await res.json();

    if (json.key === btoa(process.env.REACT_APP_KEY) && json.token === token) {

      setAuth(true);
      navigate('/store');
      return;
    }

    setLogin(json);
  }

  const initialauthentication = async (e) => {

    e.preventDefault();
    setFactor("Loading...");
    setClassesInitialauthentication("display");

    let res = await fetch(`/api/?email=${btoa(emailNew)}&model=factor&controller=initialauthentication&token=${token}`, {

      method: 'GET',
      mode: 'cors',
    })

    if (!res.ok) { 
      
      let err = await res.text();
      setLoad(err);
      return;
    }

    let json = await res.json();

    if (json.key === btoa(process.env.REACT_APP_KEY) && json.token === token) {

      setFactor(false);
      return;
    }

    setFactor(json);
  }

  const authentication = async (e) => {

    e.preventDefault();
    setCode("Loading...");
    setClassesAuthentication("display");

    let res = await fetch(`/api/?security=${btoa(security)}&controller=authentication&token=${token}`, {

      method: 'GET',
      mode: 'cors',

    })

    if (!res.ok) { 
      
      let err = await res.text();
      setLoad(err);
      return;
    }

    let json = await res.json();

    if (json.key === btoa(process.env.REACT_APP_KEY) && json.token === token) {

      setCode(false);
      return;
    }

    setCode(json);
  }

  const registration = async (e) => {

    e.preventDefault();
    setSignup("Loading...");
    setClassesRegistration("display");

    let res = await fetch(`/api/?security=${btoa(security)}&model=signup&controller=registration&token=${token}`, {

      method: 'OPTIONS',
      mode: 'cors',
      headers: {
        'Authorization': 'Basic ' + btoa(emailNew + ":" + passRegistration)
      }
    })

    if (!res.ok) { 
      
      let err = await res.text();
      setLoad(err);
      return;
    }

    let json = await res.json();

    if (json.key === btoa(process.env.REACT_APP_KEY) && json.token === token) {

      setAuth(true);
      navigate('/store');
      return;
    }

    setSignup(json);
  }

  const fetchCaptcha = useCallback( async () => {

    const res = await fetch("/captcha/init", {

      method: 'POST',
      mode: 'cors',
    })

    if (!res.ok) { 
      
      let err = await res.text();
      setLoad(err);
      return;
    }

    const json = await res.json();
    setCaptcha(json.Canvas)
  }, [setLoad])

  useEffect(() => {

    fetchCaptcha();
  }, [fetchCaptcha])

  return (
    <>
      <Header heading="AUTH" />

      <div className="Auth-form-container w-100">

        <Accordion defaultActiveKey="0" className='px-3 py-5 my-5'>

          <Accordion.Item eventKey="0">

            <Accordion.Header>Login</Accordion.Header>

            <Accordion.Body className='p-5'>

              <form onSubmit={authorization} className="Auth-form">

                <label>Email address

                  <input
                    type="email"
                    className="form-control mt-1"
                    placeholder="Enter email"
                    value={email} onChange={e => setEmail(e.target.value)}
                    autoComplete="on"
                  />

                </label>

                <label>Password

                  <input
                    type="password"
                    className="form-control mt-1"
                    placeholder="Enter password"
                    value={pass} onChange={e => setPass(e.target.value)}
                    autoComplete="on"
                  />

                </label>

                <button type="submit" className="btn mt-2 btn-light">

                  Submit

                </button>

                <p className={`alert alert-secondary ${classes}`} role="alert">

                  {login}

                </p>

              </form>

            </Accordion.Body>

          </Accordion.Item>

          <Accordion.Item eventKey="1">

            <Accordion.Header>Signup</Accordion.Header>

            <Accordion.Body className='p-5'>

              {captchaForm ? (

                <>

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

                </>

              ) : ( factor ? (

                  <form onSubmit={initialauthentication} className="Auth-form">

                    <label>Get authentication code
                      
                      <input
                        type="email"
                        className="form-control mt-1"
                        placeholder="Enter email"
                        value={emailNew} onChange={e => setEmailNew(e.target.value)}
                        autoComplete="on"
                        id="email"
                      />

                    </label>

                    <button id="submit" type="submit" className="btn mt-2 btn-light">

                      Submit

                    </button>

                    <p className={`alert alert-secondary ${classesInitialauthentication}`} role="alert">

                      {factor}

                    </p>

                  </form> 

                ) : ( code ? (

                    <form onSubmit={authentication} className="Auth-form">

                      <label>Enter authentication code
                        
                        <input
                          type="text"
                          className="form-control mt-1"
                          placeholder="Paste code"
                          value={security}
                          onChange={e => setSecurity(e.target.value)}
                          id="code"
                        />

                      </label>

                      <button id="submit" type="submit" className="btn mt-2 btn-light">

                        Submit

                      </button>

                      <p className="alert alert-secondary mt-2" role="alert">

                        Check your inbox

                      </p>

                      <p className={`alert alert-secondary ${classesAuthentication}`} role="alert">

                        {code}

                      </p>

                    </form>

                  ) : (

                    <form onSubmit={registration} className="Auth-form">

                      <label>Create Password

                        <input
                          type="password"
                          className="form-control mt-1"
                          placeholder="Enter password"
                          value={passRegistration} onChange={e => setPassRegistration(e.target.value)}
                          autoComplete="on"
                          id="pass"
                        />

                      </label>

                      <button id="submit" type="submit" className="btn mt-2 btn-light">

                        Submit

                      </button>

                      <p className={`alert alert-secondary ${classesRegistration}`} role="alert">

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
