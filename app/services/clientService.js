var modelFactory = require('../models/modelFactory');
var utils = require('../utils/utilFactory');
var userService = require('./userService');
var clientModel = modelFactory.getModel(utils.getConstants().MODEL_CLIENT);

module.exports = (function () {
    return {

        createClient: createClient
    }


    function createClient(context) {
        var defer = utils.createPromise();
        var data = context.data;
        var clientData = {
            clientName: data.clientName,
            primaryContact: data.emailId
        }

        clientModel.create(clientData, function (err, savedClient) {
            if (err) {
                defer.reject(new Error(err));
            }
            else {
                defer.resolve(savedClient);
                var userData = {
                    userName: data.userName,
                    password: data.password,
                    emailId: data.emailId,
                    clientCode: savedClient.clientCode
                }

                var userContext = { data: userData };
                userService.createUser(userContext);
            }

        })
        return defer.promise;
    }

}());