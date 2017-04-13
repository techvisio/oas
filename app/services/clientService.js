var modelFactory = require('../models/modelFactory');
var utils = require('../utils/utilFactory');
var userService = require('./userService');
var emailService = require('./emailService');
var daoFactory = require('../data_access/daoFactory');
var clientDao = daoFactory.getDataAccessObject(utils.getConstants().DAO_CLIENT);
var clientModel = modelFactory.getModel(utils.getConstants().MODEL_CLIENT);
var validationService = require('../validations/validationProcessor');


module.exports = (function () {
    return {

        signupClient: signupClient,
        verifyUser: verifyUser,
        resendVerificationMail: resendVerificationMail,
        getClientByEmailId: getClientByEmailId
    }

    function signupClient(data) {

        var defer = utils.createPromise();
        var clientData = createClientData(data);
        validationService.validate(utils.getConstants().SIGN_UP, data)
            .then(checkValidationResult)
            .then(createClient)
            .then(createUser)
            .then(sendConfirmationMail)
            .catch(err => defer.reject(err))


        function checkValidationResult(codes) {
            return new Promise((resolve, reject) => {
                var isValidCode = false;
                var errorCodes = [];
                if (codes) {
                    codes.forEach(function (code) {
                        if (code) {
                            isValidCode = true;
                            errorCodes.push(code);
                        }
                    });
                }
                if (isValidCode) {
                    var err = new Error('Validation failed');
                    err.errorCodes = errorCodes;
                    err.errType = "validationError";
                    throw (err);
                }
                resolve('valid');
            });
        }

        function createClient() {
            return new Promise((resolve, reject) => {
                clientDao.createClient(clientData).then(client => resolve(client));
            });
        }

        function createUser(client) {
            return new Promise((resolve, reject) => {
                var userData = {
                    userName: data.userName,
                    password: data.password,
                    emailId: data.emailId,
                    clientCode: client.clientCode
                }
                var userContext = { data: userData };
                userService.createUser(userContext).then(function (user) {
                    resolve(client);
                }, function (err) {
                    clientDao.deleteClient(clientCode);
                    throw err;
                })
            });
        }

        function sendConfirmationMail(client) {
            return new Promise((resolve, reject) => {
                emailService.sendVerificationMail(client).then(data => defer.resolve(client));
            });
        }

        return defer.promise;
    }

    function createClientData(data) {
        var clientData = {
            clientName: data.clientName,
            primaryContact: data.emailId
        }
        return clientData;
    }

    function createUserForClient(data, clientCode) {
        var userData = {
            userName: data.userName,
            password: data.password,
            emailId: data.emailId,
            clientCode: clientCode
        }
        var userContext = { data: userData };
        userService.createUser(userContext).then(function (user) {

        }, function (err) {
            clientDao.deleteClient(clientCode);
            throw err;
        })

    }

    function verifyUser(verificationCode) {
        var defer = utils.createPromise();
        clientDao.verifyUser(verificationCode).then(function (updatedClient) {
            defer.resolve(updatedClient);
        }, function (err) {
            throw err;
        })
        return defer.promise;
    }

    //TODO
    //send only success
    //in case client not found throw error with a code
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

    function getClientByEmailId(emailId) {
        var defer = utils.createPromise();

        clientDao.getClientByEmailId(emailId).then(function (client) {
            defer.resolve(client);
        }, function (err) {
            throw err;
        })

        return defer.promise;
    }
}());