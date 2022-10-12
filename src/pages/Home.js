import React from "react";
import { HouseDoor } from 'react-bootstrap-icons';
import security from "../images/cyber-security.png";

const Home = () => {
    return (
        <React.Fragment>
            <br />
            <h1>Home</h1>
            <br />
            <HouseDoor /> 
            <br />
            <br />
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, 
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>  
            <img src={security} alt="security"/>
        </React.Fragment>
    );
}

export default Home;