import React, {useState} from 'react';
import {Navigate} from "react-router-dom";

const PrivateRoute = ({children}) => {

    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));

    return accessToken ? children : <Navigate to="/login"/>;
};

export default PrivateRoute;
