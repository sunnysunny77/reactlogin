import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import './App.scss';
import "bootstrap/dist/css/bootstrap.min.css"

import AdminLayout from "./pages/admin/AdminLayout";
import Admin from "./pages/admin/Admin";

import AuthLayout from "./pages/auth/AuthLayout";
import Auth from "./pages/auth/Auth";

import Home from "./pages/Home";
import Output from "./pages/Output";
import NotFound from "./pages/NotFound";



function App() {

  const navigate = useNavigate();

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

      credentials: "include",
      method: 'GET',
      mode: 'cors',
    })
      .then(res => {

        if (!res.ok) { throw res }
        navigate('/')
        initial();
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
          navigate('/')
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
          navigate('/')
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
      <Routes>
        <Route index element={<Output load={load} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    ) : (
      login === true || signup === true | cookie === true ? (
        <Routes>
          <Route path="/" element={
            <AdminLayout
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
              }}
            />
          }>
            <Route index element={<Admin />} />
            <Route path="home" element={<Home />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Home />} />
            <Route path="auth" element={
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
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      )
    );
}

export default App;
