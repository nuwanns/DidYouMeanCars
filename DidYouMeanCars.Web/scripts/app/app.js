angular.module('app', ['ngResource', 'ngRoute', 'ui.bootstrap', 'kendo.directives']);

angular.module('app').config(function($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $routeProvider.when('/', { templateUrl: '../../views/partials/home.html', controller: 'homeController' });
    $routeProvider.when('/todolist', { templateUrl: '../../views/partials/todoList/index.html', controller: 'todoListController' });
    $routeProvider.when('/todolist/new', { templateUrl: '../../views/partials/todoList/new.html', controller: 'todoListController' });
    $routeProvider.when('/todolist/rename', { templateUrl: '../../views/partials/todoList/rename.html', controller: 'todoListController' });
});

