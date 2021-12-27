var mongoose = require ('mongoose');


mongoose.Promise = global.Promise;

//change the database with yours
mongoose.connect("mongodb://172.21.2.236:27017/190110910337");

module.exports = {mongoose};
