var utils=require('../utils/utilFactory');
var userDao=require('./userDao.js');

module.exports=(function(){
    return {
        getDataAccessObject:getDataAccessObject
    }
  
    function getDataAccessObject(type){
switch(type){
    case utils.getConstants().DAO_USER:
        return userDao;
}
    }
})()