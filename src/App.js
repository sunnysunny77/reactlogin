import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import './App.scss';
import "bootstrap/dist/css/bootstrap.min.css"
import spinner from './images/spinner.gif';

function App() {

  const [login, setLogin] = useState("log In");
  const [error, setError] = useState(false);
  const [pass, setPass] = useState("");
  const [user, setUser] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);

  const valid = (e) => {
    fetch("http://localhost/php/login.php", {
      headers: {
        'Authorization': 'Basic ' + btoa(user + ":" + pass)
      }
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        setIsLoaded(true)
        setLogin(data)
      })
      .catch(err => {
        setError(err.message)
      })
    e.preventDefault()
  }

  if (error) {
    return (
      <section className="loadingSection">
        <h1 className="text-secondary">Error</h1>
        <p className="text-secondary">{error}</p>
        <img src={spinner} alt="Loading..." />
      </section>
    )
  } else if (!isLoaded) {
    return (
      <section className="loadingSection">
        <h1 className="text-secondary">Loading...</h1>
        <img src={spinner} alt="Loading..." />
      </section>
    )
  } else if (login === true) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home logOut={ () => setLogin("log In")} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <Auth login={login} pass={pass} user={user} onSub={ (e) => {valid(e); setIsLoaded(false)}} onPass={e => setPass(e.target.value)} onUser={e => setUser(e.target.value)} />
    )
  }
}

export default App;
