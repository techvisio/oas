module.exports=function(){

    function validate(operation,data){
        var validationError=[];
        //get validation array for operation

        //for each function 
        var result=fn();
        if(result!=='valid'){
           validationError.push(result);
        }
        //for end

        return validationError;
    }
}