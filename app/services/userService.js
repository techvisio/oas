var modelFactory = require('../models/modelFactory');
var utils = require('../utils/utilFactory');
var daoFactory = require('../data_access/daoFactory');
var userDao = daoFactory.getDataAccessObject(utils.getConstants().DAO_USER);
var userModel = modelFactory.getModel(utils.getConstants().MODEL_USER);

module.exports = (function () {
    return {
        getUsers: getUsers,
        createUser: createUser,
        getUserById: getUserById,
        updateUser: updateUser
    }

    function getUsers(context) {
        var defer = utils.createPromise();
        var queryData = context.data;

        userDao.getUsers(queryData).then(function (user) {

            defer.resolve(user);

        }, function (err) {
            throw err;
        })

        return defer.promise;
    }

    function getUserById(context) {
        var defer = utils.createPromise();
        var userId = context.userId;
        var clientCode = context.user.clientCode;
        var userData = {
            userId: userId,
            clientCode: clientCode
        };
        userDao.getUserById(userData).then(function (user) {

            defer.resolve(user);

        }, function (err) {
            throw err;
        })

        return defer.promise;
    }

    function createUser(context) {
        var defer = utils.createPromise();
        var encryptedPassword = utils.getUtils().encrypt(context.data.password);
        context.data.password = encryptedPassword;
        var user = context.data;
        user.isActive = true;
        userDao.createUser(user).then(function (savedUser) {

            defer.resolve(savedUser);

        }, function (err) {
            throw err;
        })

        return defer.promise;
    }

    function updateUser(context) {
        var defer = utils.createPromise();
        var user = context.data;
        userDao.updateUser(user).then(function (updatedUser) {

            defer.resolve(updatedUser);

        }, function (err) {
            throw err;
        })
        
        return defer.promise;
    }

}());