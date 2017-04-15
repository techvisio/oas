var modelFactory = require('../models/modelFactory');
var utils = require('../utils/utilFactory');
var clientModel = modelFactory.getModel(utils.getConstants().MODEL_CLIENT);
module.exports = (function () {
    return {

        createClient: createClient,
        getClientByEmailId: getClientByEmailId,
        deleteClient: deleteClient,
        verifyUser: verifyUser

    }

    function createClient(client) {
        var defer = utils.createPromise();
        clientModel.create(client, function (err, savedClient) {
            if (err) {
                defer.reject(err);
            }
            else {
                defer.resolve(savedClient.toObject());
            }
        })
        return defer.promise;
    }

//TODO:Only generic get method should here which takes criteria
    function getClientByEmailId(emailId) {

        var defer = utils.createPromise();
        clientModel.findOne({ primaryEmailId: emailId }, function (err, foundClient) {
            if (err) {
                defer.reject(err);
            }
            else {
                defer.resolve(foundClient);
            }

        })
        return defer.promise;
    }
    //TODO:get client on service layer and call update client generic method
    function verifyUser(verificationCode) {
        var defer = utils.createPromise();
        clientModel.findOneAndUpdate({ hashCode: verificationCode }, { $set: { isVerified: true } }, { new: true }, function (err, updatedClient) {
            if (err) {
                defer.reject(err);
            }
            else {
                defer.resolve(updatedClient);
            }
        });
        return defer.promise;
    }

//TODO:use promise based approach check for find and delete method use _id instead
    function deleteClient(clientCode) {

        clientModel.findOne({ clientCode: clientCode }, function (err, foundClient) {
            if (err) {
                throw new Error(err);
            }
            else {
                foundClient.remove();
            }

        })

    }

}())