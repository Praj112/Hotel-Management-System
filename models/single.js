var mongoose = require('mongoose');
var sinSchema = new mongoose.Schema({
    mobile: {type: String},
    from: {type: Date},
    to: {type: Date},
    rooms: {type: Number}
});

var Single = mongoose.model('Single', sinSchema);
module.exports = Single;

module.exports.saveBooking = function(newBooking, callback){
    newBooking.save(callback);
}
module.exports.findAll = function(callback){
    Single.find(callback);
}
module.exports.checkAvailability = function(fromd, tod, callback){
    var query = {$or: [{from: {$gte: tod}}, {to: {$lte: fromd}}] }
    Single.find(query, callback);
}
