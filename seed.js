// Modules & Reqs
var mongoose = require('mongoose'),
	Task = require('./models/task.js');

// Connect to DB
mongoose.connect('mongodb://localhost/todo_list', function(err) {
	if(err) {
		console.log('Connection error: ', err);
	} else {
		console.log('Connection Successful');
	}
});

var task1 = new Task({
	item: "Walk the dog.",
	done: false
});

var task2 = new Task({
	item: "Lose the cat.",
	done:false
});