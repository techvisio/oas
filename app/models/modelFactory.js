var constants = require('../utils/constants.js');
var clientModel = require('./client.js');

module.exports = (function () {
    return {
        getModel: getModel
    }

    function getModel(model) {
        switch (model) {
            case constants.MODEL_CLIENT:
                return clientModel;
        }
    }
}());