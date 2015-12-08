angular.module('ToDoList', []).directive('ngtodolist', function() {

      // window.onload = function() {
      // this.getTasks()
      // }

  return {
    controllerAs: 'todolist',
    controller: ['$http', function ToDoListCtrl($http) {
      this.$http = $http;


      var self = this;
      self.tasks = [];
      self.totalTasks = 0;

      
      this.totalTasks = function() {
        return self.tasks.length;
      }

      // ==================
      // all tasks
      // ==================
      this.getTasks = function() {
        console.log('All your tasks!');
        // ajax get request to /tasks
        self.$http.get('/tasks').then(function(response) {
          self.tasks = response.data;
        });

        return self.tasks;      
      };  


      this.addTask = function() {
        self.$http.post('/tasks', {item: this.formTaskItem}).then(function success(response) {
          self.tasks.push(response.data);
          self.formTaskItem = '';
           self.getTasks();         
        }, function error() {
          console.log('error');
        });
      }      


      this.editForm = function(task) {
        // Lets populate the form
        self.formTaskId = task._id;
        self.formTaskItem = task.item;
      };


      this.editTask = function() {
        // Now that it's populated
        var id = this.formTaskId;
        self.$http.put('/tasks/' + id, {item: this.formTaskItem}).then(function success (response) {
          console.log(response);
          self.getTasks();

          // Empty form
        self.formTaskId = '';
        self.formTaskItem = '';
        }, function error() {
          console.log('error');
        });
      }

      this.deleteTask = function(id){
        self.$http.delete('/tasks/' + id).then(function success(response){
          console.log(response);
          self.getTasks();
        })
      }

    }] // close controller
  }; // close return object
}); // close angular module

