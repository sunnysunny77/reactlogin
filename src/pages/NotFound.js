import React from "react";
import Alert from 'react-bootstrap/Alert';
const NotFound = () => {
    return (
        <React.Fragment> 
            <br/>
            <Alert  variant="secondary">
                <h1>404 Not Found</h1>
                <br/>
                <Alert.Link href="./">Return</Alert.Link>
            </Alert>
        </React.Fragment>
    );
}

export default NotFound;