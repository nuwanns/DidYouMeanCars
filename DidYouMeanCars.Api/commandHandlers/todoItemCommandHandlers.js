(function (todoItemCommandHandlers) {
    
    var repository = require('../infrastructure/repository'),
        TodoList = require('../domain/TodoList'),
        TodoItem = require('../domain/TodoItem'),
        config = require('../config/config'),
        getStreamName = function (id) {
            return config.eventStoreUrl + config.streams.todoList + '-' + id;
        };
       
    todoItemCommandHandlers.createTodoItem = function (command, callback) {
        repository.getById(command.todoListId, TodoList, function (todoList) {
            todoList.addTodoItem(command.name);
            repository.save(getStreamName(command.todoListId), todoList, callback, command.originalVersion);
        });
    };

    todoItemCommandHandlers.discardTodoItem = function (command, callback) {
        repository.getById(command.todoListId, TodoList, function (todoList) {
            todoList.discardTodoItem(command.id);
            repository.save(getStreamName(command.todoListId), todoList, callback, command.originalVersion);
        });
    };

    todoItemCommandHandlers.scheduleTodoItem = function (command, callback) {
        repository.getById(command.todoListId, TodoList, function (todoList) {
            todoList.scheduleTodoItem(command.id, command.dueDate);
            repository.save(getStreamName(command.todoListId), todoList, callback, command.originalVersion);
        });
    };

    todoItemCommandHandlers.completeTodoItem = function (command, callback) {
        repository.getById(command.todoListId, TodoList, function (todoList) {
            todoList.completeTodoItem(command.id);
            repository.save(getStreamName(command.todoListId), todoList, callback, command.originalVersion);
        });
    };
       
})(module.exports);