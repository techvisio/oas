var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var counterModel = require('../providers/sequenceProvider.js');
var utils = require('../utils/utilFactory');
var uuid = require('node-uuid')

var Client = new Schema({
    clientId : Number,
    clientCode : String,
    clientName : String,
    activationDate : Date,
    expirationDate : Date,
    primaryContact : String,
    isVerified: Boolean,
    hashCode : String
});

Client.pre('save', function (next) {
    var doc = this;
    counterModel.findByIdAndUpdate({ _id: 'client' }, { $inc: { seq: 1 } }, function (error, counter) {
        if (error) {
            return next(error);
        }
        if (!counter) {
            counterModel.create({ _id: 'client', seq: 2 });
            counter = { seq:1 };
        }

        doc.clientId = counter.seq;
        var clientCode = doc.clientName.slice(0,4);
        var clientId = utils.getUtils().getLeftPaddingData(doc.clientId);
        doc.clientCode = clientCode+clientId;
        doc.hashCode = uuid.v4();
        next();
    });
});

module.exports=mongoose.model('client',Client);