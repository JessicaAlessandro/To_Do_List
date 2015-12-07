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
mongoose.connect('mongodb://localhost/todo_list');

// =============
// MODELS
// =============
var Task = require('./models/task');

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
	});
});
