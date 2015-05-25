angular.module('app').controller('specController', function ($scope, $http, $location, _ ) {
    //TODO get this from config
    var root = 'http://localhost:1337';

    $http.get(root + '/api/spec').then(function (result) {
        $scope.specs = result.data;
    }, function (err) {
        console.log(err);
    });

    $scope.runSpec = function(spec){
        $http.post(root + '/api/specResult', { id: spec.id }).then(function (result) {
            var selectedSpec = _.find($scope.specs, function (item) {
                return item.id === spec.id;
            });
            selectedSpec.result = result.data.result;
        }, function (err) {
            console.log(err);
        });
    };

});