import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import Output from "./components/Output";
import Basil from "./images/basil.webp";
import Broccoli from "./images/broccoli.webp";
import Chitto from "./images/chitto.webp";
import Cucumbers from "./images/cucumbers.webp";
import Fruits from "./images/fruits.webp";
import Schwab from "./images/schwab.webp";
import './scss/App.scss';

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
      description: "Donec porttitor mi ac mauris porttitor, sed placerat nulla vehicula. Nulla tempus sapien nibh, non euismod.",
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
      description: "Nulla rutrum est in ex laoreet tincidunt. Nam laoreet massa at magna efficitur ultricies.",
    },

    cartSix: {

      image: Chitto,
      value: "33",
      name: "Accumsan Inn",
      sub: "lorem rutrum",
      description: "Morbi porta augue vitae tempor bibendum interdum euismod leo.",
    },
  };

  const options = [

    { value: 'cartOne', label: items.cartOne.name },
    { value: 'cartTwo', label: items.cartTwo.name },
    { value: 'cartThree', label: items.cartThree.name },
    { value: 'cartFour', label: items.cartFour.name },
    { value: 'cartFive', label: items.cartFive.name },
    { value: 'cartSix', label: items.cartSix.name }
  ];

  const cartOrder = {

   cartOne: () => {

      setOrder({ 

        ref: options[0],
        image: items.cartOne.image,
        value: items.cartOne.value,
        name: items.cartOne.name,
        sub: items.cartOne.sub,
        description: items.cartOne.description,
      });
    },

    cartTwo: () => {

      setOrder({ 

        ref: options[1],
        image: items.cartTwo.image,
        value: items.cartTwo.value,
        name: items.cartTwo.name,
        sub: items.cartTwo.sub,
        description: items.cartTwo.description,
      });
    },

    cartThree: () => {
      
      setOrder({ 

        ref: options[2],
        image: items.cartThree.image,
        value: items.cartThree.value,
        name: items.cartThree.name,
        sub: items.cartThree.sub,
        description: items.cartThree.description,
      });
    },

    cartFour: () => {

      setOrder({ 

        ref: options[3],
        image: items.cartFour.image,
        value: items.cartFour.value,
        name: items.cartFour.name,
        sub: items.cartFour.sub,
        description: items.cartFour.description,
      });
    },

    cartFive: () => {

      setOrder({ 

        ref: options[4],
        image: items.cartFive.image,
        value: items.cartFive.value,
        name: items.cartFive.name,
        sub: items.cartFive.sub,
        description: items.cartFive.description,
      });
    },

    cartSix:  () => {

      setOrder({ 

        ref: options[5],
        image: items.cartSix.image,
        value: items.cartSix.value,
        name: items.cartSix.name,
        sub: items.cartSix.sub,
        description: items.cartSix.description,
      });
    }
  }

  const navigate = useNavigate();

  const [load, setLoad] = useState(true);

  const [auth, setAuth] = useState(false);

  const [order, setOrder] = useState({ 

    ref: options[0],
    image: items.cartOne.image,
    value: items.cartOne.value,
    name: items.cartOne.name,
    sub: items.cartOne.sub,
    description: items.cartOne.description,
  });

  const [count, setCount] = useState(1);

  const [output, setOutput] = useState({});

  const [disabled, setDisabled] = useState(true);

  const [cart, setCart] = useState({});

  const [referance, setReferance] = useState(null);

  const [isScrolling, setIsScrolling] = useState(null);

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

      setCount(1);
  
      setCart({});
  
      setDisabled(true);
  
      setOutput({});
  
      cartOrder.cartOne();

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
        <Route path="/" element={<Layout isScrolling={isScrolling} auth={auth} setIsScrolling={e => setIsScrolling(e)} setAuth={logout} />} >
          <Route index element={<Home options={options} items={items} cartOrder={cartOrder} setLoad={e => setLoad(e)} setReferance={e => setReferance(e)} setIsScrolling={e => setIsScrolling(e)} />} />
          <Route path="store" element={
            <Store 
              referance={referance} items={items} options={options} cartOrder={cartOrder} order={order} count={count} output={output} disabled={disabled} cart={cart} 
              setReferance={e => setReferance(e)} setCount={e => setCount(e)} setOutput={e => setOutput(e)} setDisabled={e => setDisabled(e)} setCart={e => setCart(e)} setIsScrolling={e => setIsScrolling(e)} 
            />
          }/>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Layout isScrolling={isScrolling} auth={auth} setIsScrolling={e => setIsScrolling(e)} />} >
        <Route index element={<Home options={options} items={items} cartOrder={cartOrder} setLoad={e => setLoad(e)} setReferance={e => setReferance(e)} setIsScrolling={e => setIsScrolling(e)} />} />
        <Route path="store" element={<Auth setLoad={e => setLoad(e)} setAuth={e => setAuth(e)} setIsScrolling={e => setIsScrolling(e)} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App;
