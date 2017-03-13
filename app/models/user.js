var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var User = new Schema({
    userId : Number,
    clientId : Number,
    userName : String,
    password : String,
    firstName : String,
    lastname : String,
    dateOfBirth : Date,
    mobileNo : String,
    emailId : String,
    creationDate : Date,
    createdBy : String,
    updateDate : Date,
    updatedBy : String,
    isActive : Boolean,
    priviledges : [String],
    securityQuestion : {question : String , answer : String}
});

User.statics.getUserById = function getUserById (user) {
  this.model('user').find({ userName: user.userName, clientId: user.clientId }, function(err,users){
        return users;
  });
};

User.statics.createUser = function createUser (user) {
   this.create(user);
};

module.exports=mongoose.model('user',User);