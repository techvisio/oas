var userDao = require('../data_access/userDao.js');
var modelFactory = require('../models/modelFactory');
var utils = require('../utils/utilFactory');
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

        var query = criteriaQueryBuilder(context.data);
        userModel.find(query).exec(function (err, foundUsers) {
            if (err) {
                defer.reject(new Error(err));
            }
            else {
                defer.resolve(foundUsers);
            }
        })
        return defer.promise;
    }

    function getUserById(context) {
        var defer = utils.createPromise();
        userModel.findOne({ userId: context.userId, clientCode: context.user.clientCode }, function (err, foundUser) {
            if (err) {
                defer.reject(new Error(err)); j
            }
            else {
                defer.resolve(foundUser);
            }

        })
        return defer.promise;
    }

    function createUser(context) {
        var defer = utils.createPromise();
        var encryptedPassword = utils.getUtils().encrypt(context.data.password);
        context.data.password = encryptedPassword;
        userModel.create(context.data, function (err, savedUser) {
            if (err) {
                defer.reject(new Error(err));
            }
            else {
                defer.resolve(savedUser);
            }

        })
        return defer.promise;
    }

    function updateUser(context) {
        var defer = utils.createPromise();
        var user = context.data;
        userModel.update({_id:user._id},user, function (err, updatedUser) {

            if (err) {
                err = new Error('something went wrong');
            }
            else {
                defer.resolve(updatedUser);
            }
        });
        return defer.promise;
    }

    function criteriaQueryBuilder(data) {

        var query = {};

        if (!utils.getUtils().isEmpty(data.userName)) {
            query["userName"] = data.userName;
        }
        if (!utils.getUtils().isEmpty(data.clientCode)) {
            query["clientCode"] = data.clientCode;
        }
        if (!utils.getUtils().isEmpty(data.firstName)) {
            query["firstName"] = new RegExp('^' + data.firstName, "i");
        }
        if (!utils.getUtils().isEmpty(data.lastname)) {
            query["lastName"] = new RegExp('^' + data.lastname, "i");
        }
        if (!utils.getUtils().isEmpty(data.mobileNo)) {
            query["mobileNo"] = data.mobileNo;
        }
        if (!utils.getUtils().isEmpty(data.emailId)) {
            query["emailId"] = data.emailId;
        }

        return query;
    }
}());