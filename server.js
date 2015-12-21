var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    nodeDebugger = require('node-debugger'),
    morgan = require('morgan'),
		port = process.env.PORT || 3000,
		app = express();

// =============
// MIDDLEWARE
// =============
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use(morgan('dev'));


// =============
// DATABASE
// =============
// mongoose.connect('mongodb://localhost/todo_list');

var mongoUri =  process.env.MONGOLAB_URI || 'mongodb://localhost/todo_list';
mongoose.connect(mongoUri);

// =============
// MODELS
// =============
var Task = require('./models/Task');

// =============
// LISTENER
// =============
app.listen(port);


// =============
// LISTENER
// =============
// var seed = require('./seed.js');

// =============
// ROUTES
// =============

// Get request for all tasks. 
app.get('/tasks', function(req, res) {
	Task.find().then(function(tasks) {
		console.log(tasks);
		res.send(tasks);
		req.onload(tasks)
	}); //end of query
}); //end of get request


// app.get('/tasks/:id', function(req, res) {
// 	Task.findById(req.params.id).then(function(task) {
// 		console.log('==================');
// 		console.log(task);
// 		console.log(typeof task);
// 		console.log('==================');
// 		res.send(task);
// 	});
// });	

app.post('/tasks', function(req, res) {
	var task = new Task(req.body);
	task.save(function(err) {
		if(err) {
			console.log('ERROR: ' + err);
		} else {
			console.log("Saved!");
			res.send(task);
		} //end of if/else statement
	}); //end of save function
}); //end of post request

// Edit
app.put('/tasks/:id', function(req, res) {
	Task.findOneAndUpdate({
		_id: req.params.id
	}, {
		$set: req.body
	}, function(err, task) {
		res.send(task);
	});
}); //end of put request

// Delete
app.delete('/tasks/:id', function(req, res) {
	Task.findOneAndRemove({_id: req.params.id}, function(err) {
		if(err) console.log(err);
		console.log('Task deleted');
		res.send('Task deleted');
	}); //end of query
}); //end of delete request


