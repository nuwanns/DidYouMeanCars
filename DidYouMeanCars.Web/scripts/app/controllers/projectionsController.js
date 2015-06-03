angular.module('app').controller('projectionsController', function ($scope, $http, $location, _ ) {
    //TODO get this from config
    var root = 'http://localhost:1337';

    $http.get(root + '/api/projections').then(function (result) {
        $scope.projections = result.data;
    }, function (err) {
        console.log(err);
    });

    $scope.runProjection = function(projection){
        $http.post(root + '/api/projectionResult', { id: projection.id }).then(function (result) {
            var selectedProjection = _.find($scope.projections, function (item) {
                return item.id === projection.id;
            });
            selectedProjection.result = result.data.result;
        }, function (err) {
            console.log(err);
        });
    };

});