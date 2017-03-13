var constants=require('./constants.js');
var config=require('./propertyHolder.js');
var logger=require('./logger.js');
var commanMethod=require('./utilMethods');
var sessionStore=require('./sessionStore.js');
module.exports=(function(){
    return{
        getConfiguration:getConfiguration,
        getLogger:getLogger,
        getConstants:getConstants,
        getUtils:getUtils,
        getSessionStore:getSessionStore
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

}())