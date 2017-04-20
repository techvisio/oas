var modelFactory;
var utils;
var clientModel;
var isInitialised = false;

module.exports = (function () {
    return {

        createClient: createClient,
        deleteClient: deleteClient,
        getClients: getClients,
        updateClient: updateClient
    }

    function init() {
        if (!isInitialised) {
            modelFactory = require('../models/modelFactory');
            utils = require('../utils/utilFactory');
            clientModel = modelFactory.getModel(utils.getConstants().MODEL_CLIENT);
            isInitialised = true;
        }
    }

    function getClients(client) {
        init();
        return new Promise((resolve, reject) => {
            var query = criteriaQueryBuilder(client);
            clientModel.find(query).exec(function (err, foundClients) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(foundClients);
                }
            })
        });

    }

    function createClient(context) {
        init();
        return new Promise((resolve, reject) => {
            var client = context.data;
            clientModel.create(client, function (err, savedClient) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(savedClient.toObject());
                }
            })
        });

    }


    function updateClient(context) {
        init();
        return new Promise((resolve, reject) => {
            var client = context.data;
            clientModel.update({ _id: client._id }, client, function (err, updatedClient) {

                if (err) {
                    reject(err);
                }
                else {
                    resolve(updatedClient);
                }
            })
        });

    }

    function deleteClient(client) {
        init();
        return new Promise((resolve, reject) => {
            clientModel.findOneAndRemove({ _id: client._id }, function (err, foundClient) {
                if (err) {
                    reject(err);
                }
                else {
                    foundClient.remove();
                    resolve("client deleted");
                }
            })
        });

    }

    function criteriaQueryBuilder(data) {

        var query = {};
        if (!utils.getUtils().isEmpty(data.clientId)) {
            query["clientId"] = data.clientId;
        }

        if (!utils.getUtils().isEmpty(data.clientName)) {
            query["clientName"] = data.clientName;
        }
        if (!utils.getUtils().isEmpty(data.clientCode)) {
            query["clientCode"] = data.clientCode;
        }
        if (!utils.getUtils().isEmpty(data.primaryContactNo)) {
            query["primaryContactNo"] = data.primaryContactNo;
        }
        if (!utils.getUtils().isEmpty(data.primaryEmailId)) {
            query["primaryEmailId"] = data.primaryEmailId;
        }
        return query;
    }

}())