// Test route
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to the MEAN stack Todo list API!' });
});

// actual useful API routes

// Routes that begin in /tasks
router.route('/tasks')
  .post(function(request, response) {
    var task = new Task();
    task.name = request.body.name;

    task.save(function(err) {
      if (err) {
        response.send(err);
      }

      Task.find(function(err, tasks) {
        if (err) {
          response.send(err);
        }
        response.json(tasks);
      })
    });
  })

  .get(function(request, response) {
    Task.find(function(err, tasks) {
      if (err) {
        response.send(err);
      }
      response.json(tasks);
    })
  })

// Routes ending in :task_id
router.route('/tasks/:task_id')
  .get(function(request, response) {
    Task.findById(request.params.task_id, function(err, task) {
      if (err) {
        response.send(err);
      }
      response.json(task);
    })
  })

  .put(function(request, response) {
    Task.findById(request.params.task_id, function(err, task) {
      if (err) {
        response.send(err);
      }
      task.name = request.body.name;

      task.save(function(err) {
        if (err) {
          response.send(err);
        }
        response.json({ message: 'Task updated!' });
      });
    });
  })

  .delete(function(request, response) {
    Task.remove({
      _id: request.params.task_id
    }, function(err, task) {
      if (err) {
        response.send(err);
      }

      Task.find(function(err, tasks) {
        if (err) {
          response.send(err);
        }
        response.json(tasks);
      });
    });
  });

module.exports = router;