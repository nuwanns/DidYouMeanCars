angular.module('app').controller('todoListController', function ($scope, $http, $location, $modal) {
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

    $scope.openRenameModal = function (todoList) {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'renameTodoList.html',
            controller: 'renameTodoListController',
            windowClass: 'app-modal-window',
            resolve: {
                selectedTodoList: function () {
                    return todoList;
                }
            }
        });

        modalInstance.result.then(function (selectedTodoList) {
            $http.put(root + '/api/todolist', { id: selectedTodoList.id, newName: selectedTodoList.newName })
            .success(function (data) {
                alert('saved');
            })
            .error(function (data) {
                console.log(data);
            });
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

});

angular.module('app').controller('renameTodoListController', ['$scope', '$modalInstance', 'selectedTodoList',
    function ($scope, $modalinstance, selectedTodoList) {

        $scope.selectedTodoList = selectedTodoList;

        $scope.ok = function () {
            $modalinstance.close($scope.selectedTodoList);
        };

        $scope.cancel = function () {
            $modalinstance.dismiss('cancel');
        };

    }]);