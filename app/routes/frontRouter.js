var express = require('express');
var utils = require('../utils/utilFactory');
var modelfactory = require('../models/modelFactory.js');
var userService = require('../services/userService');
var questionnaireService = require('../services/questionnaireService');
var adminRouteHandler = require('./adminRouter');
var publicRouteHandler = require('./publicRouter');
var router = express.Router();

var logger = utils.getLogger();
var reqId = 999;
//check if security token exists 
//get and populate user details in req
//if payload is to be looged
router.all('/*', function (req, res, next) {
    var env = utils.getConfiguration().getProperty('node.env');
    var logPayload = utils.getConfiguration().getProperty(env)['logPayload'];

    //add a unique request identifier
    req.id = ++reqId;

    //log request url
    logger.info(req.id + ':' + 'Request URL : ' + req.originalUrl);
    //check if security token exists
    if (req.headers.sectoken) {
        //get and populate session from store
        var session = utils.getSessionStore().get(req.headers.sectoken);
       
        if (session) {
            req.session = session;
            logger.info(req.id + ':' + 'new request from : ' + session.user.userId);
        }
    }
    else {
        logger.info(req.id + ':' + 'new request from : ' + req.connection.remoteAddress);
    }

    if (logPayload) {
        logger.info(req.id + ':' + 'Request Payload:');
        logger.info(req.id + ':' + 'Request URL:' + req.originalUrl);
        logger.info(req.id + ':' + 'Request Body:' + JSON.stringify(req.body));
        logger.info(req.id + ':' + 'Request Header:' + JSON.stringify(req.headers));
    }
     //for dev only injecting a dummy session
        if(env==='development' && !req.session){
            req.session = {user:{}}
        }
    next();
});

router.use('/public',publicRouteHandler);
router.use('/admin', adminRouteHandler);

router.use(errorHandler);

function errorHandler(err,req,res,next){
if(err.errorCode){
    logger.error(req.id+": error occured code: "+err.errorCode);
    //TODO:
    //get message corresponding to code
    //set in error message in return bean
}
var errorTag=new Date();
logger.error(req.id+" tag:"+errorTag+"error occured msg:"+err.errMsg);
logger.error(err);
//TODO:
//send response with tag 

}
module.exports = router;