var mongoose = require('mongoose');
var kingSchema = new mongoose.Schema({
    mobile: {type: String},
    from: {type: Date},
    to: {type: Date},
    rooms: {type: Number}
});

var King = mongoose.model('King', kingSchema);
module.exports = King;

module.exports.saveBooking = function(newBooking, callback){
    newBooking.save(callback);
}
module.exports.findAll = function(callback){
    King.find(callback);
}
module.exports.checkAvailability = function(fromd, tod, callback){
    var query = {$or: [{from: {$gte: tod}}, {to: {$lte: fromd}}] }
    King.find(query, callback);
}