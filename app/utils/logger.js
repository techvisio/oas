var  winston = require('winston');
const tsFormat = () => (new Date()).toLocaleTimeString();
const logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.File)({
      timestamp: tsFormat,
      colorize: true,
    })
  ]
});

module.exports=(function(){
    return {
           debug:debug,
           error:error,
           silly:silly,
           info:info,
           verbose:verbose,
           warn:warn,
           setLoggerLevel:setLoggerLevel,
           getLoggerLevel:getLoggerLevel
    };

    var debug=function(msg){
      logger.debug(msg);
    }
    var error=function(msg){
      logger.error(msg);
    }
    var silly=function(msg){
      logger.silly(msg);
    }
    var info=function(msg){
      logger.info(msg);
    }
    var verbose=function(msg){
      logger.verbose(msg);
    }
    var warn=function(msg){
      logger.warn(msg);
    }

    function getLoggerLevel(){
      return logger.level;
    }
    
    function setLoggerLevel(levelValue){
      if(levelValue=='debug' || levelValue=='info' || levelValue=='silly' || levelValue=='warn' || levelValue=='error'|| levelValue=='verbose'){
         winston.level = levelValue;
         return;
      }

       logger.error('Not vaild logger level');
    }
}())