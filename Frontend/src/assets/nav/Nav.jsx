import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './nav.scss';

function Nav() {
  const auth = localStorage.getItem('user');
  const [user , setuser] = useState(true)
  useEffect(()=>{
    (auth)?setuser(true):setuser(false)
  },[auth])
  return (
    <div>
      <ul className="nav-l">
        <li>
          <Link to="/">Products</Link>
        </li>
        <li>
          <Link to="/AddProduct">Add Product</Link>
        </li>
        <li>
          <Link to="/UpdateProduct">Update Product</Link>
        </li>
        <li>
          <Link to="/Profile">Profile </Link>
        </li>
        {(user) ?( <li> <Link to="/Logout">Logout</Link></li>) :
         ( <>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login">LogIn </Link></li>
          </>)
        }     
      </ul>
    </div>
  );
}

export default Nav;
