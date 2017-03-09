//this module is taking care of admin related entity mapping from bussiness to db 
// representation and vice versa
var admindao=require('../data_access/adminDao.js');

module.exports=(function(){
    return{
        saveClient:saveClient
    }

    function saveClient(client){
        admindao.saveClient(client);
    }
}());