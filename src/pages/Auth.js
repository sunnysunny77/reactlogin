import Accordion from 'react-bootstrap/Accordion';
import React, { useEffect } from "react";
import Captcha from "./Captcha";
import ValidCaptcha from "./ValidCaptcha";

const Auth = (props) => {

  const {
    classes,
    login,
    onPass,
    onEmail,
    onSub,
    email,
    pass,
    classesTwo,
    signup,
    onPassTwo,
    onEmailTwo,
    onSubTwo,
    emailTwo,
    passTwo
  } = props;

  useEffect(() => {
    Captcha()
  }, []);

  return (
    <div className="Auth-form-container">
      <h1 className="d-none">Auth</h1>
      <Accordion >
        <Accordion.Item eventKey="0">
          <Accordion.Header>Login</Accordion.Header>
          <Accordion.Body>
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
              <button type="submit" className="btn mt-1 btn-secondary">
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
            <label htmlFor="txtInput" id="mainCaptcha"> </label>
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
              <label>Email address
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  value={emailTwo} onChange={onEmailTwo}
                  autoComplete="on"
                  id="email"
                  disabled={true}
                />
              </label>
              <label>Password
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  value={passTwo} onChange={onPassTwo}
                  autoComplete="on"
                  id="pass"
                  disabled={true}
                />
              </label>
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
    </div>
  )
}
export default Auth;
