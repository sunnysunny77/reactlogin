import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Output from "./pages/Output";
import NotFound from "./pages/NotFound";
import './App.scss';
import "bootstrap/dist/css/bootstrap.min.css"

function App() {

  const [classes, setClasses] = useState("displayNone");
  const [classesTwo, setClassesTwo] = useState("displayNone");
  const [login, setLogin] = useState(false);
  const [cookie, setCookie] = useState(false);
  const [signup, setSignup] = useState(false);
  const [load, setLoad] = useState(false);
  const [pass, setPass] = useState("");
  const [user, setUser] = useState("");
  const [passTwo, setPassTwo] = useState("");
  const [userTwo, setUserTwo] = useState("");

  useEffect(() => {

    setLoad("Loading")
    fetch("/api/?controller=authorizationcookie", {
      method: 'GET',
      mode: 'cors',
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        setCookie(data)
        setLoad(false)
      })
      .catch(err => {
        setLoad(err.message)
      })

  }, [])

  const logout = (e) => {
   
    fetch("/api/?controller=logout", {
      method: 'GET',
      mode: 'cors',
    })
      .catch(err => {
        setLoad(err.message)
      })
  }

  const authorization = (e) => {

    e.preventDefault()
    setLogin("Loading...")
    setClasses("display")
    fetch("/api/?model=login&controller=authorization", {
      method: 'OPTIONS',
      mode: 'cors',
      headers: {
        'Authorization': 'Basic ' + btoa(user + ":" + pass)
      }
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        setLogin(data)
      })
      .catch(err => {
        setLoad(err.message)
      })
  }

  const registration = (e) => {

    e.preventDefault()
    setSignup("Loading...")
    setClassesTwo("display")
    if (/^[^0-9]+$/.test(passTwo)) {
      alert(passTwo)
      setSignup("Pass accepts one #")
      return;
    }
    if (/^[^A-Z]+$/.test(passTwo)) {
      setSignup("Pass accepts one capital")
      return;
    }
    if (/^[^a-z]+$/.test(passTwo)) {
      setSignup("Pass accepts one lowercase")
      return;
    }
    if (passTwo > 19 || passTwo < 8) {
      setSignup("Pass accepts 8 to 19 characters")
      return;
    }
    fetch("/api/?model=signup&controller=registration", {
      method: 'OPTIONS',
      mode: 'cors',
      headers: {
        'Authorization': 'Basic ' + btoa(userTwo + ":" + passTwo)
      }
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        setSignup(data)
      })
      .catch(err => {
        setLoad(err.message)
      })
  }
  return load ?
    (
      <Output load={load} />
    ) : (
      login === process.env.REACT_APP_KEY || signup === process.env.REACT_APP_KEY | cookie === process.env.REACT_APP_KEY ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={
                <Home
                  logOut={() => {
                    setLoad(false);
                    setLogin(false);
                    setClasses("displayNone");
                    setPass("");
                    setUser("")
                    setSignup(false);
                    setClassesTwo("displayNone");
                    setPassTwo("");
                    setUserTwo("")
                    setCookie(false);
                    logout();
                  }} />}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route index element={
              <Auth
                classes={classes}
                login={login}
                pass={pass}
                user={user}
                onSub={e => authorization(e)}
                onPass={e => setPass(e.target.value)}
                onUser={e => setUser(e.target.value)}
                classesTwo={classesTwo}
                signup={signup}
                passTwo={passTwo}
                userTwo={userTwo}
                onSubTwo={e => registration(e)}
                onPassTwo={e => setPassTwo(e.target.value)}
                onUserTwo={e => setUserTwo(e.target.value)}
              />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      )
    );
}

export default App;
