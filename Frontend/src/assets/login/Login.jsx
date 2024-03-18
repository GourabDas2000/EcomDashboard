import React,{useEffect, useState} from 'react';
import './login.scss';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate()
  const auth = localStorage.getItem('user');
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    useEffect(()=>{
      if(auth){
        navigate('/');
      }
    },[])
    const fetchdata = async() => {
      try{
        var result = await fetch('http://localhost:3000/login', {
          method: 'post',
          body: JSON.stringify({ email, password }),
          headers: {
            'Content-Type': 'application/json',
            authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        })
        var data = await result.json();
        console.log(data)
        if(data.data.email){
          localStorage.setItem('user',JSON.stringify(data.data));
          localStorage.setItem('token', JSON.stringify(data.auth));
          navigate('/')
        }else{
          alert('Enter the valid details');
        }
      }catch(error){
        console.log(error)
      }
    }
  return (
    <div className="login">
      <h1>LogIn</h1>
      <input
        type="email"
        placeholder="Enter your email"
        onChange={(e) => {
          setemail(e.target.value);
        }}
        autoComplete="on"
        className="inputfield"
      />
      <input
        type="password"
        placeholder="Enter your password"
        onChange={(e) => {
          setpassword(e.target.value);
        }}
        autoComplete="on"
        className="inputfield"
      />
      <button type="button" className="loginbutton" onClick={fetchdata} >
        LogIn
      </button>
    </div>
  )
}

export default Login