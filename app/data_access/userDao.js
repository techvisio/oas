var modelFactory;
var utils;
var userModel;
var isInitialised = false;

module.exports = (function () {
    return {
        getUsers: getUsers,
        createUser: createUser,
        updateUser: updateUser
    }

    function init() {
        if (!isInitialised) {
            modelFactory = require('../models/modelFactory');
            utils = require('../utils/utilFactory');
            userModel = modelFactory.getModel(utils.getConstants().MODEL_USER);
            isInitialised = true;
        }
    }

    function getUsers(user) {
        init();

        return new Promise((resolve, reject) => {
            var query = criteriaQueryBuilder(user);
            userModel.find(query).exec(function (err, foundUsers) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(foundUsers);
                }
            })
        });
    }

    function createUser(context) {
        init();

        return new Promise((resolve, reject) => {
            var user = context.data;
            userModel.create(user, function (err, savedUser) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(savedUser.toObject());
                }
            })
        });
    }


    function updateUser(context) {
        init();
        return new Promise((resolve, reject) => {
            var user = context.data;
            userModel.update({ _id: user._id }, user, function (err, updatedUser) {

                if (err) {
                    reject(err);
                }
                else {
                    resolve(updatedUser);
                }
            })
        });

    }

    function criteriaQueryBuilder(data) {

        var query = {};

        if (!utils.getUtils().isEmpty(data.userId)) {
            query["userId"] = data.userId;
        }

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