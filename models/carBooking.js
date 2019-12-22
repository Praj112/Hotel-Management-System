const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    mobile: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
    loc: {type: String, required: true}
});

var Car = mongoose.model('Car', carSchema);
module.exports = Car;

module.exports.saveBooking = function(newCar, callback) {
    newCar.save(callback);
}   