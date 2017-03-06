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

module.exports=function(){
    return {
           debug:debug
    };

    var debug=function(msg){
      logger.debug(msg);
    }
}