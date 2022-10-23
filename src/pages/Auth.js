import Accordion from 'react-bootstrap/Accordion';
import React, { useState, useEffect } from "react";

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

  const [captcha, setCaptcha] = useState('');

  const ValidCaptcha = () => {

    const sub = document.getElementById("submit")
    const pass = document.getElementById("pass")
    const email = document.getElementById("email")
    const cap = document.getElementById("responseCaptcha")
    const txt = document.getElementById('txtInput')
    const refresh = document.getElementById("refresh")
    const capsub = document.getElementById("captchaSubmit")

    const string = txt.value.split(' ').join('')

    if (string === captcha) {

      sub.disabled = false;
      pass.disabled = false;
      email.disabled = false;
      refresh.disabled = true;
      capsub.disabled = true;
      cap.innerHTML = "Correct";
    } else {

      sub.disabled = true;
      pass.disabled = true;
      email.disabled = true;
      cap.innerHTML = "Incorrect";

      setTimeout(function () {

        cap.innerHTML = "Please enter captcha";
      }, 2500)
    }
  }

  const randomColor = () => {

    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)

    return 'rgb(' + r + ',' + g + ',' + b + ')'
  }

  const Captcha = () => {

    const canvas = document.getElementById("mainCaptcha")

    const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    let txt = ""

    for (let i = 1; i <= 7; i++) {

      txt += alpha[Math.floor(Math.random() * alpha.length)]
    }

    const context = canvas.getContext('2d')
    canvas.width = 200
    canvas.height = 50
    context.font = '25px Bold'

    for (let i = 0; i < txt.length; i++) {

      const sDeg = (Math.random() * 30 * Math.PI) / 180
      const x = 10 + i * 20
      const y = 20 + Math.random() * 8

      context.translate(x, y)
      context.rotate(sDeg)
      context.fillStyle = randomColor()
      context.fillText(txt[i], 0, 0)
      context.rotate(-sDeg)
      context.translate(-x, -y)

      context.strokeStyle = randomColor();
      context.beginPath();
      context.moveTo(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      )
      context.lineTo(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      )
      context.stroke()
    }

    for (let i = 0; i < 30; i++) {

      context.strokeStyle = randomColor()
      context.beginPath()
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      context.moveTo(x, y)
      context.lineTo(x + 1, y + 1)
      context.stroke()
    }

    setCaptcha(txt)
  }

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
            <canvas id="mainCaptcha"></canvas>
            <label className="d-none" htmlFor="txtInput">Captcha</label>
            <input
              className="form-control mt-1"
              type="text"
              id="txtInput"
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
