var modelFactory = require('../models/modelFactory');
var utils = require('../utils/utilFactory');
var userService = require('./userService');
var emailService = require('./emailService');
var daoFactory = require('../data_access/daoFactory');
var clientDao = daoFactory.getDataAccessObject(utils.getConstants().DAO_CLIENT);
var clientModel = modelFactory.getModel(utils.getConstants().MODEL_CLIENT);

module.exports = (function () {
    return {

        createClient: createClient,
        verifyUser: verifyUser,
        resendVerificationMail: resendVerificationMail
    }

    function createClient(context) {
        var defer = utils.createPromise();
        var data = context.data;
        var clientData = {
            clientName: data.clientName,
            primaryContact: data.emailId
        }
        clientDao.createClient(clientData).then(function (client) {

            var userData = {
                userName: data.userName,
                password: data.password,
                emailId: data.emailId,
                clientCode: client.clientCode
            }

            createUserForClient(userData);
            emailService.sendVerificationMail(client);
            defer.resolve(client);
        }, function (err) {
            throw err;
        })

        return defer.promise;
    }

    function createUserForClient(userData) {
        var userContext = { data: userData };
        userService.createUser(userContext).then(function (user) {

        }, function (err) {
            throw err;
        })

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

    function resendVerificationMail(emailId) {
        var defer = utils.createPromise();
        clientDao.getClientByEmailId(emailId).then(function (foundClient) {
            if (foundClient) {
                emailService.sendVerificationMail(foundClient);
            }
            var msg = 'Mail sent successfully';
            defer.resolve(msg);
        }, function (err) {
            throw err;
        })

        return defer.promise;
    }

}());