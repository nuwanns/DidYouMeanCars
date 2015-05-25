angular.module('app').controller('specController', function ($scope, $http, $location) {
    //TODO get this from config
    var root = 'http://localhost:1337';

    $http.get(root + '/api/spec').then(function (result) {
        $scope.specs = result.data;
    }, function (err) {
        console.log(err);
    });

    $scope.runSpec = function(spec){
        $http.post(root + '/api/specResult', {id : spec.id}).then(function (result) {
            alert(result.data.result);
        }, function (err) {
            console.log(err);
        });
    };

});