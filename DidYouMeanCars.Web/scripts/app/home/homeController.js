angular.module('app').controller('homeController', function($scope, $http){
    //TODO get this from config
    var root = 'http://localhost:3030';

    $http.get(root + '/api/todolist').then(function(result){
        $scope.events = result.data;
    }, function(err){
        console.log(err);
    });
});