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
import Fruits from "./images/fruits.webp";
import Broccoli from "./images/broccoli.webp";
import Basil from "./images/basil.webp";
import Cucumbers from "./images/cucumbers.webp";
import Schwab from "./images/schwab.webp";
import Chitto from "./images/chitto.webp";

function App() {

  const items = {

    cartOne: {

      image: Fruits,
      value: "23",
      name: "In accumsan",
      sub: "Est diam",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras congue lectus nisl, vitae egestas orci laoreet mollis.",

    },

    cartTwo: {

      image: Broccoli,
      value: "15",
      name: "Eleifend eu",
      sub: "Dolor magn",
      description: "Vestibulum quam massa, cursus non eros ut, porttitor interdum tortor.",
    },

    cartThree: {

      image: Basil,
      value: "70",
      name: "Lectus eleifend",
      sub: "Lorem nec",
      description: "Donec porttitor mi ac mauris porttitor, sed placerat nulla vehicula. Nulla tempus sapien nibh, non euismod dolor imperdiet id.",
      },

    cartFour: {

      image: Cucumbers,
      value: "17",
      name: "Phasellus et",
      sub: "Scelerisque lorem",
      description: "Curabitur malesuada molestie ante ut rutrum. Donec eu enim nibh. Quisque imperdiet vestibulum dui non feugiat.",
    },

    cartFive: {

      image: Schwab,
      value: "57",
      name: "Turpis posuere",
      sub: "Rutrum nec",
      description: "Nulla rutrum est in ex laoreet tincidunt. Nam laoreet massa at magna efficitur ultricies. Proin condimentum turpis ac sem vulputate, vitae eleifend sapien malesuada.",
    },

    cartSix: {

      image: Chitto,
      value: "33",
      name: "Accumsan Inn",
      sub: "lorem rutrum",
      description: "Morbi porta augue vitae tempor bibendum interdum euismod leo. Suspendisse purus eros, ultrices at dignissim quis, consequat ac mauris.",
    },

  };

  const navigate = useNavigate();

  const [load, setLoad] = useState(true);

  const [auth, setAuth] = useState(false);

  const [order, setOrder] = useState({ 

    image: items.cartOne.image,
    value: items.cartOne.value,
    name: items.cartOne.name,
    sub: items.cartOne.sub,
    description: items.cartOne.description,
  });

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
      setOrder({ 

        image: items.cartOne.image,
        value: items.cartOne.value,
        name: items.cartOne.name,
        sub: items.cartOne.sub,
        description: items.cartOne.description,
      });
      navigate('/');
    }
  }

  useEffect(() => {

    initialauthorization();
  }, [])

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
        <Route path="/" element={<Layout auth={auth} setAuth={logout} />} >
          <Route index element={<Home items={items} setOrder={e => setOrder(e)} setLoad={e => setLoad(e)} />} />
          <Route path="store" element={<Store items={items} order={order} setOrder={e => setOrder(e)} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Layout auth={auth} />} >
        <Route index element={<Home items={items} setOrder={e => setOrder(e)} setLoad={e => setLoad(e)} />} />
        <Route path="store" element={<Auth setLoad={e => setLoad(e)} setAuth={e => setAuth(e)} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App;
