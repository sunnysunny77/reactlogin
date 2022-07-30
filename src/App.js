import React, { useState, useEffect } from "react";
import './App.css';

function App() {

  const [login, setLogin] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("http://localhost/php/login.php", {
      headers: {
        'Authorization': 'Basic ' + btoa("a:a")
      }})
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
  }, [])

  if (error) {
    return <div> Error: {error} </div>
  } else if (!isLoaded) {
    return <div> Loading... </div>
  } else {
    return (
      <div>
        Login: {login}
      </div>
    );
  }
}

export default App;
