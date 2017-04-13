var modelFactory = require('../models/modelFactory');
var utils = require('../utils/utilFactory');
var daoFactory = require('../data_access/daoFactory');
var userDao = daoFactory.getDataAccessObject(utils.getConstants().DAO_USER);
var userModel = modelFactory.getModel(utils.getConstants().MODEL_USER);
var logger = utils.getLogger();

module.exports = (function () {
    return {
        getUsers: getUsers,
        createUser: createUser,
        getUserById: getUserById,
        updateUser: updateUser,
        getUserByUserName: getUserByUserName
    }

    function getUsers(context) {

        logger.debug(context.reqId + " : getUsers request recieved ");

        var defer = utils.createPromise();
        var queryData = context.data;

        userDao.getUsers(queryData).then(function (users) {

            defer.resolve(users);
            logger.debug(context.reqId + " : sending response : " + users);
        }, function (err) {
            throw err;
        })

        return defer.promise;

    }

    function getUserById(context) {
        logger.debug(context.reqId + " : getUserById request recieved for userId : " + context.userId);
        var defer = utils.createPromise();
        var userId = context.userId;
        var clientCode = context.user.clientCode;
        var userData = {
            userId: userId,
            clientCode: clientCode
        };
        userDao.getUserById(userData).then(function (user) {

            defer.resolve(user);
            logger.debug(context.reqId + " : sending response from getUserById: " + user);
        }, function (err) {
            throw err;
        })

        return defer.promise;
    }

    function createUser(context) {

        logger.debug(context.reqId + " : createUser request recieved for new user : " + context.data);

        var defer = utils.createPromise();
        var encryptedPassword = utils.getUtils().encrypt(context.data.password);
        context.data.password = encryptedPassword;
        var user = context.data;
        user.isActive = true;
        userDao.createUser(user).then(function (savedUser) {

            defer.resolve(savedUser);
            logger.debug(context.reqId + " : sending response from createUser: " + savedUser);
        }, function (err) {
            throw err;
        })

        return defer.promise;
    }

    function updateUser(context) {

        logger.debug(context.reqId + " : updateUser request recieved for user : " + context.data);

        var defer = utils.createPromise();
        var user = context.data;
        userDao.updateUser(user).then(function (updatedUser) {

            defer.resolve(updatedUser);
            logger.debug(context.reqId + " : sending response from updateUser: " + updatedUser);
        }, function (err) {
            throw err;
        })

        return defer.promise;
    }

    function getUserByUserName(user) {

        logger.debug(context.reqId + " : getUserByUserName request recieved for user name: " + user.userName);

        var defer = utils.createPromise();
        userDao.getUserByUserName(user).then(function (foundUser) {
            defer.resolve(foundUser);
            logger.debug(context.reqId + " : sending response from getUserByUserName: " + foundUser);
        }, function (err) {
            throw err;
        })
        return defer.promise;
    }

}());