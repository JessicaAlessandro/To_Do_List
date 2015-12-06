var mongoose = require('mongoose');


var TaskSchema = mongoose.Schema({
    item    : String,
});
 
var Task = mongoose.model('Task', TaskSchema);

module.exports = Task;