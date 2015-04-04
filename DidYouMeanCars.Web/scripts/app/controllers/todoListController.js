angular.module('app').controller('todoController', function ($scope, $http) {
    //TODO get this from config
    var root = 'http://localhost:1337';

    $http.get(root + '/api/todolist').then(function (result) {
        $scope.events = result.data;
    }, function (err) {
        console.log(err);
    });

});