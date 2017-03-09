var mongoose=require('mongoose');
var propertyHolder=require('../utils/propertyHolder.js');
var env = propertyHolder.getProperty('node.env');
const dbUrl = propertyHolder.getProperty(env)['databaseUrl'];
console.log(dbUrl);
module.exports={};