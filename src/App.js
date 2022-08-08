import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Error from "./pages/Error";
import './App.scss';
import "bootstrap/dist/css/bootstrap.min.css"

function App() {

  const [classes, setClasses] = useState("displayNone");
  const [classesTwo, setClassesTwo] = useState("displayNone");
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [error, setError] = useState(false);
  const [pass, setPass] = useState("");
  const [user, setUser] = useState("");
  const [passTwo, setPassTwo] = useState("");
  const [userTwo, setUserTwo] = useState("");

  const authorization = (e) => {
    e.preventDefault()
    setLogin("Loading...")
    setClasses("display")
    fetch("http://192.168.64.17/php/index.php/?model=login&controller=authorization", {
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
        setError(err.message)
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
    fetch("http://192.168.64.17/php/index.php/?model=signup&controller=registration", {
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
        setError(err.message)
      })
  }
  if (error) {
    return (
      <Error error={error} />
    )
  } else if (login === true || signup === true) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={
              <Home
                logOut={() => {
                  setError(false);
                  setLogin(false);
                  setClasses("displayNone");
                  setPass("");
                  setUser("")
                  setSignup(false);
                  setClassesTwo("displayNone");
                  setPassTwo("");
                  setUserTwo("")
                }} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
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
      />
    )
  }
}

export default App;
