const moongoes = require('mongoose');
require('./connect');
var collection = 'users';
const createschema = new moongoes.Schema({
    name: String,
    email: String,
    password: String
});

module.exports = moongoes.model(collection, createschema);