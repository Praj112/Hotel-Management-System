var mongoose = require('mongoose');
var delSchema = new mongoose.Schema({
    mobile: {type: String},
    from: {type: Date},
    to: {type: Date},
    rooms: {type: Number}
});

var Deluxe = mongoose.model('Deluxe', delSchema);
module.exports = Deluxe;

module.exports.saveBooking = function(newBookDel, callback){
    newBookDel.save(callback);
}

module.exports.findAll = function(callback){
    Deluxe.find(callback);
}
module.exports.checkAvailability = function(fromd, tod, callback){
    var query = {$or: [{from: {$gte: tod}}, {to: {$lte: fromd}}] }
    Deluxe.find(query, callback);
}