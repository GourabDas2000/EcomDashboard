const mongooes = require('mongoose');
const collection = 'Products';

const createproductschema = new mongooes.Schema({
    Product_name: String,
    price: String,
    catagory: String,
    company: String,
    User_id: String
});

module.exports = mongooes.model('Products', createproductschema);