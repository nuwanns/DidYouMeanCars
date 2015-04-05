angular.module('app').controller('todoListController', function ($scope, $http) {
    //TODO get this from config
    var root = 'http://localhost:1337';

    $http.get(root + '/api/todolist').then(function (result) {
        $scope.events = result.data;
    }, function (err) {
        console.log(err);
    });

    $scope.save = function (todoList) {
        $http.post(root + '/api/todolist', { name: todoList.name })
            .success(function (data) { })
            .error(function (data) {
                console.log(data);
            });
    };

});