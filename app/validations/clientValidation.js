module.exports=function(){
    return{
        "SIGN_UP":[checkDuplicatePrimaryUser,checkUserName]
    }

    function checkDuplicatePrimaryUser(signupData){
        //check for duplicate email
        if(found){
            return DUP_USER;
        }
        return 'valid';
    }

    function checkUserName(signupData){

    }
}