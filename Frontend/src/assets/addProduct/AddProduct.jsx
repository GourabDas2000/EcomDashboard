import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './addproduct.scss';

function AddProduct() {
    const navigate = useNavigate()
    const auth = localStorage.getItem('user');
    const [productname, setproductname] = useState("");
    const [price, setprice] = useState("");
    const [catagory, setcatagory] = useState("");
    const [company, setcompany] = useState("");
    const fetchdata = async() => {
        const user_id = JSON.parse(auth)._id
        try{
            let data = await fetch('http://localhost:3000/addproduct', {
                method: 'post',
                body: JSON.stringify({
                    "Product_name": productname,
                    "price": price,
                    "catagory": catagory,
                    "company": company,
                    "User_id": user_id
                }),
                headers: {
                   'Content-Type': 'application/json',
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
           });
           var result = await data.json()
           console.log(result);
           setproductname('');
           setcompany('');
           setcatagory('');
           setprice('');
        }catch(error){
        console.log(error)
       }
    }
    return (
      <div className="add_product">
          <h1>Add Product</h1>
          <input
              type="text"
              placeholder="Enter your Product name"
              value={productname}
              onChange={(e) => {
                setproductname(e.target.value);
              }}
              autoComplete="on"
              className="inputfield"
          />
          <input
              type="text"
              placeholder="Enter the price"
              value={price}
              onChange={(e) => {
                  setprice(e.target.value);
              }}
              autoComplete="on"
              className="inputfield"
          />
          <input
              type="text"
              placeholder="Enter the catagory"
              value={catagory}
              onChange={(e) => {
                  setcatagory(e.target.value);
              }}
              autoComplete="on"
              className="inputfield"
          />
          <input
              type="text"
              placeholder="company name"
              value={company}
              onChange={(e) => {
                 setcompany(e.target.value);
              }}
              autoComplete="on"
              className="inputfield"
          />
          <button type="button" className="addproductbutton" onClick={fetchdata} >
              Add Product
          </button>
      </div>
  )
}

export default AddProduct