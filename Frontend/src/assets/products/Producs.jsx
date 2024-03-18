import React, { useEffect, useState } from 'react';
import './product.scss';
import { useNavigate } from 'react-router-dom';
function Producs() {
    const [product, setproduct] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        fetchdata();
    }, [])
    const searchapi = async (e) => {
        try {
            var result = await fetch(`http://localhost:3000/product/${e.target.value}`,
                {
                    headers: {
                        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                    }
                });
            result = await result.json();
            if (result) {
                setproduct(result);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const fetchdata = async () => {
        try {
            var result = await fetch('http://localhost:3000/product',
                {
                    headers: {
                        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                    }
                });
            var data = await result.json();
            setproduct(data);
        } catch (error) {
            console.log(error)
        }
    }
    const deletedata = async (id) => {
        try {
            var result = await fetch(`http://localhost:3000/removeproduct/${id}`, {
                method: 'Delete',
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            var data = await result.json();
            if (data) {
                alert(`${data.message}`)
                fetchdata();
                console.log(data)
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='product'>
            <h1>List of Products</h1>
            <input type='text' placeholder='Search' className='searchinput' onChange={searchapi} />
            <ul className='ul-product'>
                <li>Product_Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
                <li>Operation</li>
            </ul>
            {product && product.length > 0 ? product.map((item) =>
                <ul className='ul-product' key={item._id}>
                    <li>{item.Product_name}</li>
                    <li>{item.price}</li>
                    <li>{item.company}</li>
                    <li onClick={() => { navigate(`/UpdateProduct/${item._id}`) }} style={{ 'cursor': 'pointer' }}>Update</li>
                    <li onClick={() => { deletedata(`${item._id}`) }} style={{ 'cursor': 'pointer' }}>Delete</li>
                </ul>) : <h1>Result Not Found</h1>}
        </div>
    )
}

export default Producs