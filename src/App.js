import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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

  const [load, setLoad] = useState(true);

  const [auth, setAuth] = useState(false);

  const [order, setOrder] = useState(
    <section>
      <h2 className="my-5">Food $20</h2> 
      <p className='rady p-3 mb-5'>
        Ut enim ad ed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
      </p>
    </section>
  );

  const initialauthorization = async () => {

    let res = await fetch(`/api/initialauthorization/?controller=initialauthorization&key=${btoa(process.env.REACT_APP_KEY)}`, {

      credentials: "include",
      method: 'GET',
    })

    if (!res.ok) { 
      
      let err = await res.text();
      setLoad(err);
      return;
    }
      
    let json = await res.json();
 
    if (json.key === btoa(process.env.REACT_APP_KEY)) {

      localStorage.setItem("token", json.token);
      setAuth(true);
      setLoad(false);
      return;
    }

    localStorage.setItem("token", json);
    setLoad(false);
  }

  useEffect(() => {

    initialauthorization();
  }, [])

  const logout = async () => {

    const token = localStorage.getItem("token");

    let res = await fetch(`/api/?controller=logout&token=${token}`, {

      method: 'GET',
    })

    if (!res.ok) { 
      
      let err = await res.text();
      setLoad(err);
      return;
    }

    let json = await res.json();

    if (json.key === btoa(process.env.REACT_APP_KEY)) {

      setLoad(false);
      setAuth(false);
      navigate('/');
    }
  }

  if (load) {

    return (
      <Routes>
        <Route path="*" element={<Output load={load} />} />
      </Routes>
    )
  }

  if (auth) {

    return (
      <Routes>
        <Route path="/" element={<Layout auth={auth} setAuth={logout}/> }>
          <Route index element={<Home auth={auth} setLoad={e => setLoad(e)} />} />
          <Route path="store" element={<Store order={order} setOrder={e => setOrder(e)} />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Layout auth={auth} />}>
        <Route index element={<Home auth={auth} setLoad={e => setLoad(e)} />} />
        <Route path="auth" element={<Auth setLoad={e => setLoad(e)} setAuth={e => setAuth(e)} />} />
        <Route path="store" element={<Auth setLoad={e => setLoad(e)} setAuth={e => setAuth(e)} />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App;
