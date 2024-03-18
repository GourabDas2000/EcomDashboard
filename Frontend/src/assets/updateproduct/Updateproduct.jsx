import React, { useEffect,useState } from 'react';
import {json, useParams} from 'react-router-dom';
import './updateproduct.css';

function Updateproduct() {
  const [error,seterror] = useState(false);
  const [productname, setproductname] = useState("");
  const [price, setprice] = useState("");
  const [catagory, setcatagory] = useState("");
  const [company, setcompany] = useState("");
  const {id} = useParams();
  const fetchdata = async() => {
    if(price == '' ||  catagory == '' || company == '' || productname == ''){
      seterror(true)
    }else{
      seterror(false)
      try{
        let result = await fetch(`http://localhost:3000/Updatefind/${id}`,{
          method : 'PUT',
          body: JSON.stringify({
            "Product_name": productname,
            "price": price,
            "catagory": catagory,
            "company": company           
          }),
          headers: {
            'Content-Type': 'application/json',
            authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        })
        console.log(result);
      }catch(error){
        console.log(error)
      }
    }
  }
  const fetchfirst = async() => {
    try {
      let result = await fetch(`http://localhost:3000/Updatefind/${id}`,
        {
          headers: {
            authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        });
      result = await result.json();
      setproductname(result.Product_name);
      setprice(result.price);
      setcatagory(result.catagory);
      setcompany(result.company);
    } catch (error) { console.log(error) }
  }
  useEffect(() => {
   fetchfirst();
  },[]);
  return (
    <div className="add_product">
      <h1>Update Product</h1>
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
      {(error)?(<span className='errorm'>Enter the valid input Field</span>):(<></>)}
      <input
        type="text"
        placeholder="Enter the price"
        value={ price}
        onChange={(e) => {
          setprice(e.target.value);
        }}
        autoComplete="on"
        className="inputfield"
      />
      {(error) ? (<span className='errorm'>Enter the valid input Field</span>) : (<></>)}
      <input
        type="text"
        placeholder="Enter the catagory"
        value={ catagory}
        onChange={(e) => {
          setcatagory(e.target.value);
        }}
        autoComplete="on"
        className="inputfield"
      />
      {(error) ? (<span className='errorm'>Enter the valid input Field</span>) : (<></>)}
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
      {(error) ? (<span className='errorm'>Enter the valid input Field</span>) : (<></>)}
      <button type="button" className="addproductbutton" onClick={fetchdata} >
        Update Product
      </button>
    </div>
  )
}

export default Updateproduct