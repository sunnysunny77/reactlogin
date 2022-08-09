import Accordion from 'react-bootstrap/Accordion';
import React, { useEffect } from "react";
import Captcha from "./Captcha";
import ValidCaptcha from "./ValidCaptcha";

const Auth = (props) => {
  const {
    classes,
    login,
    onPass,
    onUser,
    onSub,
    user,
    pass,
    classesTwo,
    signup,
    onPassTwo,
    onUserTwo,
    onSubTwo,
    userTwo,
    passTwo
  } = props;

  useEffect(() => {
    Captcha()
  }, []);

  return (
    <main className="Auth-form-container">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Login</Accordion.Header>
          <Accordion.Body>
            <form onSubmit={onSub} className="Auth-form"> 
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control mt-1"
                    placeholder="Enter email"
                    value={user} onChange={onUser}
                    autoComplete="on"
                  />        
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control mt-1"
                    placeholder="Enter password"
                    value={pass} onChange={onPass}
                    autoComplete="on"
                  />          
                  <button type="submit" className="btn btn-secondary">
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
          <Accordion.Body>
            <p id="responseCaptcha">Please enter captcha</p>
            <p id="mainCaptcha"></p>
            <input
              className="form-control mt-1"
              type="text"
              id="txtInput"
              onPaste={e => e.preventDefault()}
            />
            <button
              className="btn btn-secondary mt-1"
              id="captchaSubmit"
              type="button"
              value="Check"
              onClick={() => ValidCaptcha()}
            >
              Submit
            </button>
            <button
              className="btn btn-secondary mb-3 mt-1"
              id="refresh"
              onClick={() => Captcha()}
            >
              Refresh
            </button>
            <form onSubmit={onSubTwo} className="Auth-form">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={userTwo} onChange={onUserTwo}
                autoComplete="on"
                id="email"
                disabled={true}
              />
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={passTwo} onChange={onPassTwo}
                autoComplete="on"
                id="pass"
                disabled={true}
              />
              <button disabled={true} id="submit" type="submit" className="btn mt-1 btn-secondary">
                Submit
              </button>
              <p className={"alert alert-secondary " + classesTwo} role="alert">
                {signup}
              </p>
            </form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </main>
  )
}
export default Auth;
