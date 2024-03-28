const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./db/User');
const Product = require('./db/Product');
const jwt = require('jsonwebtoken');
const jwttoken = 'e-com';
app.use(express.json());
app.use(cors());
const verifytoken = (req, res, next) => {
    var token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        jwt.verify(token, jwttoken, (err, valid) => {
            if (err) {
                res.status(401).send({ result: "Please Provide the valid token" });
            } else { next() }
        })
    } else {
        res.status(404).send({ result: "Please Provide the token" });
    }

}


app.post('/register', verifytoken, async(req, res) => {
    var data = new User(req.body);
    var result = await data.save();
    result = result.toObject();
    delete result.password;
    if (result) {
        jwt.sign({
            result
        }, jwttoken, {
            expiresIn: "2h"
        }, (err, token) => {
            if (err) {
                res.send({
                    res: 'Somthing went wrong,Try sometimes later'
                })
            }
            res.send({ result, auth: token })
        })
    } else {
        res.send({
            result: 'NO data found'
        });
    }
});

app.post('/login', verifytoken, async(req, res) => {
    if (req.body.email && req.body.password) {
        var data = await User.findOne(req.body).select("-password");
        if (data) {
            jwt.sign({
                data
            }, jwttoken, {
                expiresIn: "2h"
            }, (err, token) => {
                if (err) {
                    res.send({
                        result: 'Somthing went wrong,Try sometimes later'
                    })
                }
                res.send({ data, auth: token })
            })
        } else {
            res.send({ 'result': 'NO data found' });
        }
    } else {
        res.send({ "result": "Enter both email and password field" });
    }
});

app.post('/addproduct', verifytoken, async(req, res) => {
    var result = new Product(req.body);
    var data = await result.save();
    res.send(data);
});

app.get('/product', async(req, res) => {
    var result = await Product.find();
    if (result.length > 0) {
        res.send(result);
    } else {
        res.send({ "result": 'No products found' });
    }
});
app.get('/product/:name', verifytoken, async(req, res) => {
    var result = await Product.find({
        '$or': [
            { Product_name: { $regex: req.params.name } },
            { price: { $regex: req.params.name } },
            { catagory: { $regex: req.params.name } },
            { company: { $regex: req.params.name } },
        ]
    });
    res.send(result);
});
app.get('/Updatefind/:id', verifytoken, async(req, res) => {
    const request = req.params.id;
    var result = await Product.findOne({
        _id: request
    });
    res.send(result);
});
app.put('/Updatefind/:id', verifytoken, async(req, res) => {
    var result = await Product.updateOne({
        _id: req.params.id
    }, {
        $set: req.body
    })
    res.send('Done');
});



app.delete('/removeproduct/:id', verifytoken, async(req, res) => {
    await Product.deleteOne({ "_id": req.params.id });
    res.send({ 'message': 'Deleted successfully' })
});

app.listen(3000);