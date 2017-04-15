var modelFactory = require('../models/modelFactory');
var utils = require('../utils/utilFactory');
var userModel = modelFactory.getModel(utils.getConstants().MODEL_USER);
module.exports = (function () {
    return {
        getUsers: getUsers,
        getUserById: getUserById,
        createUser: createUser,
        updateUser: updateUser,
        getUserByUserName: getUserByUserName
    }

    function getUsers(user) {
        var defer = utils.createPromise();

        var query = criteriaQueryBuilder(user);
        userModel.find(query).exec(function (err, foundUsers) {
            if (err) {
                defer.reject(err);
            }
            else {
                defer.resolve(foundUsers.toObject());
            }
        })
        return defer.promise;
    }
    //TODO:remove this method use generic get method
    function getUserById(user) {
        var defer = utils.createPromise();
        userModel.findOne({ userId: user.userId, clientId: user.clientId }, function (err, foundUser) {
            if (err) {
                defer.reject(err);
            }
            else {
                defer.resolve(foundUser.toObject());
            }

        })
        return defer.promise;
    }
//TODO:remove this method use generic get method
    function getUserByUserName(user) {
        var defer = utils.createPromise();
        userModel.findOne({ userName: user.userName.toLowerCase(), clientCode: user.clientCode }, function (err, foundUser) {
            if (err) {
                defer.reject(new Error(err));
            }
            else {
                defer.resolve(foundUser.toObject());
            }

        })
        return defer.promise;
    }

    function createUser(user) {
        var defer = utils.createPromise();
        userModel.create(user, function (err, savedUser) {
            if (err) {
                defer.reject(err);
            }
            else {
                defer.resolve(savedUser.toObject());
            }
        })
        return defer.promise;
    }


    function updateUser(user) {
        var defer = utils.createPromise();
         userModel.update({ _id: user._id }, user, function (err, updatedUser) {

            if (err) {
                defer.reject(err);
            }
            else {
                defer.resolve(updatedUser.toObject());
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

}())