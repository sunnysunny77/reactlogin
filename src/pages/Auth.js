import Accordion from 'react-bootstrap/Accordion';
import React, { useState, useEffect, useCallback } from "react";

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

  const randomColor = () => {

    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)

    return 'rgb(' + r + ',' + g + ',' + b + ')'
  }

  const Captcha = useCallback(() => {

    const canvas = document.getElementById("mainCaptcha")

    const alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    let txt = ""

    for (let i = 1; i <= 7; i++) {

      txt += alpha[Math.floor(Math.random() * alpha.length)]
    }
    
    const context = canvas.getContext('2d')
    canvas.width = 140
    canvas.height = 50
    context.font = '25px Bold'

    for (let i = 0; i < txt.length; i++) {

      const sDeg = (Math.random() * 45 * Math.PI) / 180
      const x = 8 + i * 18
      const y = 25 + Math.random() * 10

      context.translate(x, y)
      context.rotate(sDeg)
      context.fillStyle = randomColor()
      context.fillText(txt[i], 0, 0)
      context.rotate(-sDeg)
      context.translate(-x, -y)
    }

    for (let i = 0; i < 5; i++) {

      context.strokeStyle = randomColor()
      context.beginPath()
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

    for (let i = 0; i < 70; i++) {

      context.strokeStyle = randomColor()
      context.beginPath()
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      context.moveTo(x, y)
      context.lineTo(x + 1, y + 1)
      context.stroke()
    }

    setCaptcha(txt)
  }, [])

  useEffect(() => {

    Captcha()
  }, [Captcha])

  return (

    <div className="Auth-form-container w-100">

      <h1 className="hidden">Auth</h1>

      <Accordion defaultActiveKey="0" className='px-3 py-5 my-5'>

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

          <Accordion.Body>

            {captchaForm ? (

              <React.Fragment>

                <p id="responseCaptcha">Please enter captcha</p>

                <canvas id="mainCaptcha"></canvas>

                <label className="d-none" htmlFor="txtInput">Captcha</label>

                <input
                  className="form-control mt-1"
                  type="text"
                  id="txtInput"
                />

                <button
                  className="btn btn-light mt-2"
                  onClick={() => {

                    if (document.getElementById('txtInput').value.split(' ').join('') === captcha) {
                
                      setCaptchaForm(false)
                    } else {
                
                      const cap = document.getElementById("responseCaptcha")
                
                      cap.innerHTML = "Incorrect";
                
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
                  onClick={() => Captcha()}
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

      </Accordion>

    </div>
    
  )
}
export default Auth;
