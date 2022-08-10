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

  const [load, setLoad] = useState("Loading");
  const [cookie, setCookie] = useState(false);

  const [classes, setClasses] = useState("displayNone");
  const [classesTwo, setClassesTwo] = useState("displayNone");

  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);

  const [pass, setPass] = useState("");
  const [user, setUser] = useState("");

  const [passTwo, setPassTwo] = useState("");
  const [userTwo, setUserTwo] = useState("");

  useEffect(() => {

    fetch("/api/?controller=authorizationcookie", {

      method: 'GET',
      mode: 'cors',
    })
      .then(res => {
        
        return res.json()
      })
      .then(data => {

        if (data === process.env.REACT_APP_KEY) {

          setCookie(true)
          setLoad(false)
          return
        }

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

        if (data === process.env.REACT_APP_KEY) {

          setLogin(true)
          return
        }

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

        if (data === process.env.REACT_APP_KEY) {

          setSignup(true)
          return
        }

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
      login === true || signup === true | cookie === true ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={
                <Home
                  logOut={() => {
                    setLoad(false);
                    setCookie(false);
                    setClasses("displayNone");
                    setClassesTwo("displayNone");
                    setLogin(false);
                    setSignup(false);
                    setPass("");
                    setUser("")
                    setPassTwo("");
                    setUserTwo("")
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
