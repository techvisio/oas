var router = require('../routes/frontRouter.js');
var jwt = require('jwt-simple');
var User = require('../models/user.js');
var sessionStore = require('../utils/sessionStore.js');
var daoFactory = require('../data_access/daoFactory');
var utils = require('../utils/utilFactory');

module.exports = (function () {
  return {
    login: login,
    logout: logout,
    validateToken: validateToken
  }

  function logout(req) {

    var result = {};
    try{
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var session = getSessionFromStore(token);
    sessionStore.remove(token);
    result.loggedOut = true;
  }
  catch(err){

  }
  };

  function validateToken(req) {
    var result = {};
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var session = getSessionFromStore(token);

    if (!session) {
      result.err = 'No token Found For User. Please Login First';
      result.isValid = false;
    }

    if (!isSameClient(session.remoteIP, req.connection.remoteAddress)) {
      result.err = 'Possible attack. Please fresh Login';
      result.isValid = false;
    }

    if (isTokenExpired(session)) {
      result.err = 'No token Found For User. Please Login First';
      result.isValid = false;
    }

    refreshTokenExpiration(token, session);
    return result;
  };

  function login(req) {
    var defer = utils.createPromise();
    var userDao = daoFactory.getDataAccessObject(utils.getConstants().DAO_USER);
    userDao.getUserByUserName(req.body).then(userFetchSuccessHandler, userFetchErrorHandler)
    function userFetchSuccessHandler(user) {

      if (!user) {
        // incorrect username
        throw new Error('Authentication failed. User Not Found');
      }
      var userPassword = req.body.password;
      var encryptedPassword = utils.getUtils().encrypt(userPassword);
      if (user.password != encryptedPassword) {
        // incorrect password
        throw new Error('Authentication failed. Password Not Matched');

      }
      if (!user.isActive) {
        throw new Error('Authentication failed. User Is Not Active');
      }

      //create token
      var tokenExpires = utils.getConfiguration().getProperty('tokenExpireTime');
      var expires = new Date();
      var expires = expires.setMinutes(expires.getMinutes() + tokenExpires);
      var tokenData = {
        remoteIP: req.connection.remoteAddress,
        tokenExpires: expires,
        user: req.body
      }
      var token = createToken(tokenData);
      //add token to sessionStore

      sessionStore.put(token, tokenData);
      defer.resolve(token);

    }

    function userFetchErrorHandler(err) {
      var err = new Error('Something Wrong Happened');
    }
    return defer.promise;
  }

  function createToken(tokenVariable) {
    var secretKey = utils.getConfiguration().getProperty('secretKey');

    var token = jwt.encode({
      iss: tokenVariable.userId,
      clientAddress: tokenVariable.remoteIP

    }, secretKey);
    return token;
  };

  function getSessionFromStore(token) {
    return sessionStore.get(token);
  }

  function isSameClient(sessionIp, reqIp) {
    if (sessionIp != reqIp) {
      return false;
    }
    return true;

  }

  function isTokenExpired(expiredTime) {

    if (expiredTime > new Date()) {
      return true;
    }
    return false;
  }

  function refreshTokenExpiration(token, session) {
    var tokenExpires = utils.getConfiguration().getProperty('tokenExpireTime');
    var expires = new Date();
    var expires = expires.setMinutes(expires.getMinutes() + tokenExpires);
    var newTokenExpireTime = new Date().getMinutes() + expires;
    session.tokenExpires = newTokenExpireTime;
    sessionStore.put(token, session);
  }

}())
