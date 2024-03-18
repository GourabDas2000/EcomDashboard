import React, { useEffect, useState } from "react";
import "./signup.scss";
import { useNavigate } from "react-router-dom";
function Signup() {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  useEffect(() => {
    if(auth){
      navigate('/')
    }
  },[])
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const fetchdata = async () => {
    try {
      var result = await fetch("http://localhost:3000/register", {
        method: "Post",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
      });
      var data = await result.json();
      localStorage.setItem('user', JSON.stringify(data.result));
      localStorage.setItem('token', JSON.stringify(data.auth));
      navigate("/");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className="signup">
      <h1>Sgin Up</h1>
      <input
        type="text"
        placeholder="Enter your name"
        onChange={(e) => {
          setname(e.target.value);
        }}
        autoComplete="on"
        className="inputfield"
      />
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
      <button type="button" className="signupbutton" onClick={fetchdata}>
        Sign Up
      </button>
    </div>
  );
}

export default Signup;
