angular.module('app').controller('todoListController', function ($scope, $http, $location, $modal) {
    //TODO get this from config
    var root = 'http://localhost:1337';

    function fetchTodoLists() {
        $http.get(root + '/api/todolist').then(function (result) {
            $scope.todoLists = result.data;
        }, function (err) {
            console.log(err);
        });
    }

    fetchTodoLists();

    $scope.save = function (todoList) {
        $http.post(root + '/api/todolist', { name: todoList.name })
            .success(function (data) {
                $location.path('/todolist');
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
                $scope.renameSuccessfulNotification.show('Renaming was successful', 'info')
                fetchTodoLists();
            })
            .error(function (data) {
                $scope.errorNotification.show(data, 'error');
            });
        });
    };

    $scope.openAddTodoItemModal = function (todoList) {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'addTodoItem.html',
            controller: 'addTodoItemController',
            windowClass: 'app-modal-window',
            resolve: {
                selectedTodoList: function () {
                    return todoList;
                }
            }
        });

        modalInstance.result.then(function (todoItem) {
            $http.post(root + '/api/todoitem', { name: todoItem.name, todoListId: todoItem.todoListId })
            .success(function (data) {
                $scope.renameSuccessfulNotification.show('Todo item added', 'info')
            })
            .error(function (data) {
                $scope.errorNotification.show(data, 'error');
            });
        });
    };

    $scope.openScheduleTodoItemModal = function (todoItem, todoListId) {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'scheduleTodoItem.html',
            controller: 'scheduleTodoItemController',
            windowClass: 'app-modal-window',
            resolve: {
                selectedTodoItem: function () {
                    todoItem.todoListId = todoListId;
                    return todoItem;
                }
            }
        });

        modalInstance.result.then(function (todoItem) {
            $http.post(root + '/api/todoitem-scheduler', { todoItemId: todoItem.id, dueDate: todoItem.dueDate, todoListId: todoItem.todoListId })
            .success(function (data) {
                $scope.renameSuccessfulNotification.show('Todo item scheduled', 'info')
            })
            .error(function (data) {
                $scope.errorNotification.show(data, 'error');
            });
        });
    };

    $scope.openCompleteTodoItemModal = function (todoItem, todoListId) {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'completeTodoItem.html',
            controller: 'completeTodoItemController',
            windowClass: 'app-modal-window',
            resolve: {
                selectedTodoItem: function () {
                    todoItem.todoListId = todoListId;
                    return todoItem;
                }
            }
        });

        modalInstance.result.then(function (todoItem) {
            $http.post(root + '/api/todoitem-tracker', { todoItemId: todoItem.id, completedTime: todoItem.completedTime, todoListId: todoItem.todoListId })
            .success(function (data) {
                $scope.renameSuccessfulNotification.show('Todo item completed', 'info')
            })
            .error(function (data) {
                $scope.errorNotification.show(data, 'error');
            });
        });
    };

    $scope.discardTodoItem = function (todoItem, todoListId) {
        $http.delete(root + '/api/todoitem/' + todoItem.id + "/" + todoListId)
           .success(function (data) {
               $scope.renameSuccessfulNotification.show('Todo item discarded', 'info')
           })
           .error(function (data) {
               $scope.errorNotification.show(data, 'error');
           });
    }

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

angular.module('app').controller('addTodoItemController', ['$scope', '$modalInstance', 'selectedTodoList',
    function ($scope, $modalinstance, selectedTodoList) {

        $scope.selectedTodoList = selectedTodoList;

        $scope.ok = function (todoItem) {
            todoItem.todoListId = $scope.selectedTodoList.id;
            $modalinstance.close(todoItem);
        };

        $scope.cancel = function () {
            $modalinstance.dismiss('cancel');
        };

    }]);

angular.module('app').controller('scheduleTodoItemController', ['$scope', '$modalInstance', 'selectedTodoItem',
    function ($scope, $modalinstance, selectedTodoItem) {

        $scope.selectedTodoItem = selectedTodoItem;

        $scope.ok = function (todoItem) {
            $modalinstance.close(todoItem);
        };

        $scope.cancel = function () {
            $modalinstance.dismiss('cancel');
        };

    }]);

angular.module('app').controller('completeTodoItemController', ['$scope', '$modalInstance', 'selectedTodoItem',
    function ($scope, $modalinstance, selectedTodoItem) {

        $scope.selectedTodoItem = selectedTodoItem;

        $scope.ok = function (todoItem) {
            $modalinstance.close(todoItem);
        };

        $scope.cancel = function () {
            $modalinstance.dismiss('cancel');
        };

    }]);


