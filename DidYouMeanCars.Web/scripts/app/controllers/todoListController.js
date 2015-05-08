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

    $scope.selectedTodoList = null;

    $scope.renameTodoList = function (todoList) {
        $scope.selectedTodoList = todoList;
        $location.path('/todolist/rename');
    };

    $scope.rename = function (todoList) {
        $http.put(root + '/api/todolist', { id : todoList.id, newName: todoList.newName })
           .success(function (data) {
               alert('saved');
           })
           .error(function (data) {
               console.log(data);
           });
    }

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    $scope.open = function (size) {

        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            //windowTemplateUrl: 'modalWindowTemplte.html',
            windowClass: 'app-modal-window',
            //size: size,
            //backdrop: false,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

});

angular.module('app').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});