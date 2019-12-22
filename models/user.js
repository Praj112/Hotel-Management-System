const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fname: {type: String, required: true},
    lname: {type: String},
    mobile: {type: String},
    email: {type: String}
});

var User = mongoose.model('User', userSchema);
module.exports = User;

module.exports.saveUser = function(newUser, callback){
    newUser.save(callback);
}
module.exports.findByMobile = function(mobile, callback){
    User.findOne({mobile: mobile}, callback);
}