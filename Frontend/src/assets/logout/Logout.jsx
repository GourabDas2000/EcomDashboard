import React, { useEffect } from 'react';
import './logout.scss';
import {useNavigate} from 'react-router-dom';
function Logout() {
    const navigate = useNavigate();
    useEffect(()=>{
        localStorage.removeItem('user');
        navigate('/signup')
    })
  return (
    <div>This is logout</div>
  )
}

export default Logout