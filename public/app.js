angular.module('ToDoList', []).directive('ngtodolist', function() {

  return {
    controllerAs: 'todolist',
    controller: ['$http', function ToDoListCtrl($http) {
      this.$http = $http;


      var self = this;
      self.tasks = [];
      self.totalTasks = 0;

      // 
      // this.totalTasks = function() {
      //   return self.tasks.length;
      // }

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
    }]; // close controller
  }; // close return object
}); // close angular module