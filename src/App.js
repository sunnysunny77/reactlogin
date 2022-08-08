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
  const [login, setLogin] = useState(false);
  const [error, setError] = useState(false);
  const [pass, setPass] = useState("");
  const [user, setUser] = useState("");

  const valid = (e) => {
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
    e.preventDefault()
  }

  if (error) {
    return (
      <Error error={error}/>
    )
  } else if (login === true) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home logOut={() => { setError(false); setLogin(false); setClasses("displayNone"); setPass(""); setUser("") }} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <Auth classes={classes} login={login} pass={pass} user={user} onSub={e => valid(e)} onPass={e => setPass(e.target.value)} onUser={e => setUser(e.target.value)} />
    )
  }
}

export default App;
