var modelFactory = require('../models/modelFactory');
var utils = require('../utils/utilFactory');
var clientModel = modelFactory.getModel(utils.getConstants().MODEL_CLIENT);
module.exports = (function () {
    return {

        createClient: createClient,
        getClientByEmailId: getClientByEmailId

    }

    function createClient(client) {
        var defer = utils.createPromise();
        clientModel.create(client, function (err, savedClient) {
            if (err) {
                defer.reject(new Error(err));
            }
            else {
                defer.resolve(savedClient);
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

}())