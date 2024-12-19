import Accordion from 'react-bootstrap/Accordion';
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Spinner from "../images/load.gif";

const Auth = (props) => {

  const { setLoad, setAuth } = props;

  const navigate = useNavigate();
  const ref = useRef();

  const [captchaForm, setCaptchaForm] = useState(true);
  const [captcha, setCaptcha] = useState("");
  const [text, setText] = useState("");

  const [classesAuthorization, setClassesAuthorization] = useState("displayNone");
  const [classesCaptchaauthorization, setClassesCaptchaauthorization] = useState("displayNone");
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
    setLogin(<img className="spinner" src={Spinner} alt="Spinner" />);
    setClassesAuthorization("display");

    const token = localStorage.getItem("token");

    let res = await fetch(`/api/?model=login&controller=authorization&token=${token}`, {

      method: 'OPTIONS',
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

    if (json.key === btoa(process.env.REACT_APP_KEY)) {

      setAuth(true);
      navigate('/store');
      return;
    }

    setLogin(json);
  }

  const captchaauthorization = async () => {

    setText(<img className="spinner" src={Spinner} alt="Spinner" />);
    setClassesCaptchaauthorization("display");

    const captchaToken = localStorage.getItem("captchaToken");

    const res = await fetch("/captcha/authorization", {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Text: ref.current.value.split(' ').join(''), CaptchaToken: captchaToken }),
    })

    if (!res.ok) { 
      
      let err = await res.text();
      setLoad(err);
      return;
    }

    const json = await res.json();

    if (json.key === btoa(process.env.REACT_APP_KEY)) {

      if (!json.CaptchaForm) {

        setCaptchaForm(false);
        return;
      } 

      setText(json.CaptchaForm);
    }
  }

  const initialauthentication = async (e) => {

    e.preventDefault();
    setFactor(<img className="spinner" src={Spinner} alt="Spinner" />);
    setClassesInitialauthentication("display");

    const token = localStorage.getItem("token");

    let res = await fetch(`/api/?email=${btoa(emailNew)}&model=factor&controller=initialauthentication&token=${token}`, {

      method: 'GET',
    })

    if (!res.ok) { 
      
      let err = await res.text();
      setLoad(err);
      return;
    }

    let json = await res.json();

    if (json.key === btoa(process.env.REACT_APP_KEY)) {

      setFactor(false);
      return;
    }

    setFactor(json);
  }

  const authentication = async (e) => {

    e.preventDefault();
    setCode(<img className="spinner" src={Spinner} alt="Spinner" />);
    setClassesAuthentication("display");

    const token = localStorage.getItem("token");

    let res = await fetch(`/api/?security=${btoa(security)}&controller=authentication&token=${token}`, {

      method: 'GET',
    })

    if (!res.ok) { 
      
      let err = await res.text();
      setLoad(err);
      return;
    }

    let json = await res.json();

    if (json.key === btoa(process.env.REACT_APP_KEY)) {

      setCode(false);
      return;
    }

    setCode(json);
  }

  const registration = async (e) => {

    e.preventDefault();
    setSignup(<img className="spinner" src={Spinner} alt="Spinner" />);
    setClassesRegistration("display");

    const token = localStorage.getItem("token");

    let res = await fetch(`/api/?security=${btoa(security)}&model=signup&controller=registration&token=${token}`, {

      method: 'OPTIONS',
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

    if (json.key === btoa(process.env.REACT_APP_KEY)) {

      setAuth(true);
      navigate('/store');
      return;
    }

    setSignup(json);
  }

  const captchainit = useCallback( async () => {

    const res = await fetch("/captcha/init", {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ key: btoa(process.env.REACT_APP_KEY) }),
    })

    if (!res.ok) { 
      
      let err = await res.text();
      setLoad(err);
      return;
    }

    const json = await res.json();
    
    if (json.key === btoa(process.env.REACT_APP_KEY)) {

      localStorage.setItem("captchaToken", json.CaptchaToken);
      setCaptcha(json.Canvas);
    }
  }, [setLoad])

  useEffect(() => {

    captchainit();
  }, [captchainit])

  return (

    <>

      <Header heading="STORE" />

      <div className="Auth-form-container w-100">

        <Accordion defaultActiveKey="0" className='px-4 px-sm-0 py-5 my-5'>

          <Accordion.Item eventKey="0">

            <Accordion.Header>
              
              Login
              
            </Accordion.Header>

            <Accordion.Body className='p-5'>

              <form onSubmit={authorization} className="Auth-form">

                <label>
                  
                  Email address

                  <input

                    type="email"
                    className="form-control mt-1"
                    placeholder="Enter email"
                    value={email} onChange={e => setEmail(e.target.value)}
                    autoComplete="on"

                  />

                </label>

                <label>
                  
                  Password

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

                <p className={`alert alert-secondary ${classesAuthorization}`} role="alert">

                  {login}

                </p>

              </form>

            </Accordion.Body>

          </Accordion.Item>

          <Accordion.Item eventKey="1">

            <Accordion.Header>
              
              Signup
              
            </Accordion.Header>

            <Accordion.Body className='p-5'>

              {captchaForm ? (

                <>

                  <p id="responseCaptcha">
                    
                    Please enter captcha
                    
                  </p>

                  <img src={captcha} alt="canvas" ></img>

                  <label className="d-none" htmlFor="txtInput">
                    
                    Captcha
                    
                  </label>

                  <input

                    className="form-control mt-1"
                    type="text"
                    id="txtInput"
                    ref={ref}

                  />

                  <button

                    className="btn btn-light mt-2"
                    onClick={captchaauthorization}

                  >

                    Submit

                  </button>

                  <button
                    className="btn btn-light mb-3 mt-2"
                    onClick={captchainit}
                  >

                    Refresh

                  </button>

                  <p className={`alert alert-secondary ${classesCaptchaauthorization}`} role="alert">

                    {text}

                  </p>

                </>

              ) : ( factor ? (

                  <form onSubmit={initialauthentication} className="Auth-form">

                    <label>
                      
                      Get authentication code
                      
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

                      <label>
                        
                        Enter authentication code
                        
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

                        Check Your Inbox

                      </p>

                      <p className={`alert alert-secondary ${classesAuthentication}`} role="alert">

                        {code}

                      </p>

                    </form>

                  ) : (

                    <form onSubmit={registration} className="Auth-form">

                      <label>
                        
                        Create Password

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
