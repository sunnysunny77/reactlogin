import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.scss';
import Store from "./pages/Store";
import Auth from "./pages/Auth";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Output from "./pages/Output";
import NotFound from "./pages/NotFound";

function App() {

  const navigate = useNavigate();

  const [load, setLoad] = useState("Loading...");
  const [auth, setAuth] = useState(false);

  const [classes, setClasses] = useState("displayNone");
  const [classesTwo, setClassesTwo] = useState("displayNone");

  const [token, setToken] = useState(false);
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);

  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");

  const [passTwo, setPassTwo] = useState("");
  const [emailTwo, setEmailTwo] = useState("");

  const [order, setOrder] = useState(<h2>Stationary $20</h2>);

  useEffect(() => {

    fetch("/api/initialauthorization/?controller=initialauthorization", {

      credentials: "include",
      method: 'GET',
      mode: 'cors',
    })
      .then(res => {

        if (!res.ok) { throw res }
        return res.json()
      })
      .then(data => {

        if (data.key === btoa(process.env.REACT_APP_KEY)) {

          setToken(data.token)
          setAuth(true)
          setLoad(false)
          return
        }

        setToken(data)
        setLoad(false)

      })
      .catch(err => {
        
        return err.text()
      })
      .then(err => {

        setLoad(err)
      })
  }, [])

  const logout = () => {

    fetch("/api/?controller=logout", {

      method: 'GET',
      mode: 'cors',
    })
      .then(res => {

        if (!res.ok) { throw res }
        setLoad(false)
        setAuth(false)
        setClasses("displayNone")
        setClassesTwo("displayNone")
        setToken(token)
        setLogin(false)
        setSignup(false)
        setPass("")
        setEmail("")
        setPassTwo("")
        setEmailTwo("")
        navigate('/')
      })
      .catch(err => {

        return err.text()
      })
      .then(err => {

        setLoad(err)
      })
  }

  const authorization = (e) => {

    e.preventDefault()
    setLogin("Loading...")
    setClasses("display")

    fetch("/api/?model=login&controller=authorization&token=" + token, {

      method: 'OPTIONS',
      mode: 'cors',
      headers: {
        'Authorization': 'Basic ' + btoa(email + ":" + pass)
      }
    })
      .then(res => {

        if (!res.ok) { throw res }
        return res.json()
      })
      .then(data => {

        if (data.key === btoa(process.env.REACT_APP_KEY) && data.token === token) {

          setAuth(true)
          navigate('/store')
          return
        }

        setLogin(data)
      })
      .catch(err => {

        return err.text()
      })
      .then(err => {

        setLoad(err)
      })
  }

  const registration = (e) => {

    e.preventDefault()
    setSignup("Loading...")
    setClassesTwo("display")

    fetch("/api/?model=signup&controller=registration&token=" + token, {

      method: 'OPTIONS',
      mode: 'cors',
      headers: {
        'Authorization': 'Basic ' + btoa(emailTwo + ":" + passTwo)
      }
    })
      .then(res => {

        if (!res.ok) { throw res }
        return res.json()
      })
      .then(data => {

        if (data.key === btoa(process.env.REACT_APP_KEY) && data.token === token) {

          setAuth(true)
          navigate('/store')
          return
        }

        setSignup(data)
      })
      .catch(err => {

        return err.text()
      })
      .then(err => {

        setLoad(err)
      })
  }

  return load ?
    (
      <Routes>
        <Route path="*" element={<Output load={load} />} />
      </Routes>
    ) : (
      auth === true ? (
        <Routes>
          <Route path="/" element={
            <Layout
              logOut={() => {
                logout();
              }}
            />
          }>
            <Route index element={<Home />} />
            <Route path="store" element={<Store order={order} setOrder={e => setOrder(e)} />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Layout logOut={false} />}>
            <Route index element={<Home />} />
            <Route path="auth" element={
              <Auth
                classes={classes}
                login={login}
                pass={pass}
                email={email}
                onSub={e => authorization(e)}
                onPass={e => setPass(e.target.value)}
                onEmail={e => setEmail(e.target.value)}
                classesTwo={classesTwo}
                signup={signup}
                passTwo={passTwo}
                emailTwo={emailTwo}
                onSubTwo={e => registration(e)}
                onPassTwo={e => setPassTwo(e.target.value)}
                onEmailTwo={e => setEmailTwo(e.target.value)}
              />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      )
    );
}

export default App;
