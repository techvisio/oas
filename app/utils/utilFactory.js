var constants=require('./constants.js');
var config=require('./configService.js');
var template=require('./templateService.js');
var logger=require('./logger.js');
var commanMethod=require('./utilMethods');
var sessionStore=require('./sessionStore.js');
var promise = require('q');
module.exports=(function(){
    return{
        getConfiguration:getConfiguration,
        getLogger:getLogger,
        getConstants:getConstants,
        getUtils:getUtils,
        getSessionStore:getSessionStore,
        createPromise:createPromise,
        getTemplate:getTemplate
    }

    function getTemplate(){
        return template;
    }
    function getConfiguration(){
        return config;
    }
    function getLogger(){
        return logger;
    }
    function getConstants(){
        return constants;
    }
     function getUtils(){
        return commanMethod;
    }

    function getSessionStore(){
        return sessionStore;
    }

    function createPromise(){
        return promise.defer();
    }

}())