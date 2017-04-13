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
                defer.reject(new Error(err));
            }
            else {
                defer.resolve(savedClient.toObject());
            }
        })
        return defer.promise;
    }

    function getClientByEmailId(emailId) {

        var defer = utils.createPromise();
        clientModel.findOne({ primaryContact: emailId }, function (err, foundClient) {
            if (err) {
                defer.reject(new Error(err));
            }
            else {
                defer.resolve(foundClient);
            }

        })
        return defer.promise;
    }

    function verifyUser(verificationCode) {
        var defer = utils.createPromise();
        clientModel.findOneAndUpdate({ hashCode: verificationCode }, { $set: { isVerified: true } }, { new: true }, function (err, updatedClient) {
            if (err) {
                console.log("Something wrong when updating data!");
            }
            else {
                defer.resolve(updatedClient);
            }
        });
        return defer.promise;
    }

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