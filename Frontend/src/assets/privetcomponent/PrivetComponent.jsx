import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

function PrivetComponent() {
    const auth = localStorage.getItem('user')
    return <> { auth ? <Outlet/> : <Navigate to={'/signup'}/>} </>;

}

export default PrivetComponent