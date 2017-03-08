var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var Client = new Schema({
    clientid : Number,
    clientname : String,
    activationdate : Date,
    expirationdate : Date
});

module.exports=mongoose.model('client',Client);