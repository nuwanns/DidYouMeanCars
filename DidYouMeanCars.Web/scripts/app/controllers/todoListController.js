angular.module('app').controller('todoListController', function ($scope, $http) {
    //TODO get this from config
    var root = 'http://localhost:1337';

    $http.get(root + '/api/todolist').then(function (result) {
        $scope.todoLists = result.data;
    }, function (err) {
        console.log(err);
    });

    $scope.save = function (todoList) {
        $http.post(root + '/api/todolist', { name: todoList.name })
            .success(function (data) {
                alert('saved');
            })
            .error(function (data) {
                console.log(data);
            });
    };

});