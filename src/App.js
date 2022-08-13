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

  const [load, setLoad] = useState("Loading...");

  const [classes, setClasses] = useState("displayNone");
  const [classesTwo, setClassesTwo] = useState("displayNone");

  const [cookie, setCookie] = useState(false);
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);

  const [pass, setPass] = useState("");
  const [user, setUser] = useState("");

  const [passTwo, setPassTwo] = useState("");
  const [userTwo, setUserTwo] = useState("");

  const initial = () => {

    fetch("/api/?controller=authorizationcookie", {

      credentials: "include",
      method: 'GET',
      mode: 'cors',
    })
      .then(res => {

        if (!res.ok) { throw res }
        return res.json()
      })
      .then(data => {

        if (data === btoa(process.env.REACT_APP_KEY)) {

          setCookie(true)
          setLoad(false)
          return
        }

        setCookie(data)
        setLoad(false)
      })
      .catch(err => {

        setLoad("Error: " + err.statusText)
      })
  }

  useEffect(() => {

    initial()
  }, [])

  const logout = (e) => {

    fetch("/api/?controller=logout", {

      method: 'GET',
      mode: 'cors',
    })
      .then(res => {

        if (!res.ok) { throw res }
      })
      .catch(err => {

        setLoad("Error: " + err.statusText)
      })
  }

  const authorization = (e) => {

    e.preventDefault()
    setLogin("Loading...")
    setClasses("display")

    fetch("/api/?model=login&controller=authorization&token=" + cookie, {

      method: 'OPTIONS',
      mode: 'cors',
      headers: {
        'Authorization': 'Basic ' + btoa(user + ":" + pass)
      }
    })
      .then(res => {

        if (!res.ok) { throw res }
        return res.json()
      })
      .then(data => {

        if (data.bool === btoa(process.env.REACT_APP_KEY) && data.token === cookie) {

          setLogin(true)
          return
        }

        setLogin(data)
      })
      .catch(err => {

        setLoad("Error: " + err.statusText)
      })
  }

  const registration = (e) => {

    e.preventDefault()
    setSignup("Loading...")
    setClassesTwo("display")

    fetch("/api/?model=signup&controller=registration&token=" + cookie, {

      method: 'OPTIONS',
      mode: 'cors',
      headers: {
        'Authorization': 'Basic ' + btoa(userTwo + ":" + passTwo)
      }
    })
      .then(res => {

        if (!res.ok) { throw res }
        return res.json()
      })
      .then(data => {

        if (data.bool === btoa(process.env.REACT_APP_KEY) && data.token === cookie) {

          setSignup(true)
          return
        }

        setSignup(data)
      })
      .catch(err => {

        setLoad("Error: " + err.statusText)
      })
  }

  return load ?
    (
      <BrowserRouter>
        <Routes>
          <Route index element={<Output load={load} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    ) : (
      login === true || signup === true | cookie === true ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout
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
                initial();
              }}
            />}>
              <Route index element={<Home />} />
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
