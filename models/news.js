const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const newsSchema = new Schema({
    email: {type: String, rerquired: true, unique: true}
});

const News = mongoose.model('News', newsSchema);
module.exports = News;

module.exports.subscribe = function(newSub, callback){
    newSub.save(callback);
}
module.exports.findEmail = function(emil, callback){
    News.find({email: emil}, callback);
}
