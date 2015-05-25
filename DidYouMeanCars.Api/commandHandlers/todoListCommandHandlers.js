(function (todoListCommandHandlers) {
    
    var repository = require('../infrastructure/repository'),
        TodoList = require('../domain/TodoList'),
        config = require('../config/config'),
        getStreamName = function (id) {
            return config.eventStoreUrl + config.streams.todoList + '-' + id;
        };
    
    todoListCommandHandlers.createTodoList = function (command, callback) {
        var todoList = new TodoList(command.id, command.name);
        repository.save(getStreamName(todoList.id), todoList, callback);
    };
    
    todoListCommandHandlers.renameTodoList = function (command, callback) {
        repository.getById(command.id, TodoList, function (todoList) {
            todoList.rename(command.newName);
            repository.save(getStreamName(command.id), todoList, callback, command.originalVersion);
        });
    };
    
    todoListCommandHandlers.archiveTodoList = function (command, callback) {
        repository.getById(command.id, TodoList, function (todoList) {
            todoList.archive();
            repository.save(todoList, callback, command.originalVersion);
        });
    };
    
})(module.exports);