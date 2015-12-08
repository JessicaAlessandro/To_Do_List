var task_data  = require('./task_data');

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

for( var i=0; i<task_data.length; i++ ){


  var task = task_data[i];

  task.imgURL = 'http://placehold.it/200x300';

  var task = new Task( task );

  task.save(function(err){
    if(err) return handleError(err);
    console.log("saved: " + task.item);
  })
}

console.log('===========================');
console.log('SEEDING COMPLETE: remember to comment out');
console.log('===========================');
