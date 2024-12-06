import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import './scss/App.scss';
import Store from "./pages/Store";
import Auth from "./pages/Auth";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Output from "./components/Output";
import NotFound from "./components/NotFound";

function App() {

  const navigate = useNavigate();

  const [load, setLoad] = useState("Loading...");
  const [auth, setAuth] = useState(false);

  const [classes, setClasses] = useState("displayNone");
  const [classesInitialauthentication, setClassesInitialauthentication] = useState("displayNone");
  const [classesAuthentication, setClassesAuthentication] = useState("displayNone");
  const [classesRegistration, setClassesRegistration] = useState("displayNone");

  const [token, setToken] = useState(false);
  const [login, setLogin] = useState(false);
  const [factor, setFactor] = useState(true);
  const [code, setCode] = useState(true);
  const [signup, setSignup] = useState(false);

  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  
  const [emailNew, setEmailNew] = useState("");
  const [security, setSecurity] = useState("");
  const [passRegistration, setPassRegistration] = useState("");

  const [order, setOrder] = useState(
    <section>
      <h2 className="my-5">Food $20</h2> 
      <p className='rady p-3 mb-5'>
        Ut enim ad ed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
      </p>
    </section>
  );

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
        setClassesRegistration("displayNone")
        setClassesInitialauthentication("displayNone")
        setClassesAuthentication("displayNone")
        setToken(token)
        setLogin(false)
        setFactor(true)
        setCode(true)
        setSignup(false)
        setPass("")
        setEmail("")
        setEmailNew("")
        setSecurity("")
        setPassRegistration("")
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

  const initialauthentication = (e) => {

    e.preventDefault()
    setFactor("Loading...")
    setClassesInitialauthentication("display")

    fetch("/api/?email=" + btoa(emailNew) + "&model=factor&controller=initialauthentication&token=" + token, {

      method: 'GET',
      mode: 'cors',

    })
      .then(res => {

        if (!res.ok) { throw res }
        return res.json()
      })
      .then(data => {

        if (data.key === btoa(process.env.REACT_APP_KEY) && data.token === token) {

          setFactor(false)
          return
        }

        setFactor(data)
      })
      .catch(err => {

        return err.text()
      })
      .then(err => {

        setLoad(err)
      })
  }

  const authentication = (e) => {

    e.preventDefault()
    setCode("Loading...")
    setClassesAuthentication("display")

    fetch("/api/?security=" + btoa(security) + "&controller=authentication&token=" + token, {

      method: 'GET',
      mode: 'cors',

    })
      .then(res => {

        if (!res.ok) { throw res }
        return res.json()
      })
      .then(data => {

        if (data.key === btoa(process.env.REACT_APP_KEY) && data.token === token) {

          setCode(false)
          return
        }

        setCode(data)
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
    setClassesRegistration("display")

    fetch("/api/?security=" + btoa(security) + "&model=signup&controller=registration&token=" + token, {

      method: 'OPTIONS',
      mode: 'cors',
      headers: {
        'Authorization': 'Basic ' + btoa(emailNew + ":" + passRegistration)
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
            <Route index element={<Home logOut={true} />} />
            <Route path="store" element={<Store order={order} setOrder={e => setOrder(e)} />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Layout logOut={false} />}>
            <Route index element={<Home logOut={false} />} />
            <Route path="auth" element={
              <Auth
                classes={classes}
                login={login}
                pass={pass}
                email={email}
                onPass={e => setPass(e.target.value)}
                onEmail={e => setEmail(e.target.value)}
                onSub={e => authorization(e)}
                classesInitialauthentication={classesInitialauthentication}
                factor={factor}
                emailNew={emailNew}
                onEmailNew={e => setEmailNew(e.target.value)}
                onSubInitialauthentication={e => initialauthentication(e)}
                classesAuthentication={classesAuthentication}
                code={code}
                security={security}
                onSecurity={e => setSecurity(e.target.value)}
                onSubAuthentication ={e => authentication(e)}
                classesRegistration={classesRegistration}
                signup={signup}
                passRegistration={passRegistration}
                onPassRegistration={e => setPassRegistration(e.target.value)}
                onSubRegistration={e => registration(e)}
              />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      )
    );
}

export default App;
