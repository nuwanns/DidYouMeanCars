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
            todoList.addTodoItem(command.todoItemId, command.name, command.todoListId);
            repository.save(getStreamName(command.todoListId), todoList, callback, command.originalVersion);
        });
    };

    todoItemCommandHandlers.discardTodoItem = function (command, callback) {
        repository.getById(command.todoListId, TodoList, function (todoList) {
            todoList.discardTodoItem(command.todoItemId, command.todoListId, command.todoListName, command.todoItemName);
            repository.save(getStreamName(command.todoListId), todoList, callback, command.originalVersion);
        });
    };

    todoItemCommandHandlers.scheduleTodoItem = function (command, callback) {
        repository.getById(command.todoListId, TodoList, function (todoList) {
            todoList.scheduleTodoItem(command.todoItemId, command.dueDate, command.todoListId);
            repository.save(getStreamName(command.todoListId), todoList, callback, command.originalVersion);
        });
    };
    
    todoItemCommandHandlers.reScheduleTodoItem = function (command, callback) {
        repository.getById(command.todoListId, TodoList, function (todoList) {
            todoList.reScheduleTodoItem(command.todoItemId, command.dueDate, command.todoListId);
            repository.save(getStreamName(command.todoListId), todoList, callback, command.originalVersion);
        });
    };

    todoItemCommandHandlers.completeTodoItem = function (command, callback) {
        repository.getById(command.todoListId, TodoList, function (todoList) {
            todoList.completeTodoItem(command.todoItemId, command.completedTime, command.todoListId);
            repository.save(getStreamName(command.todoListId), todoList, callback, command.originalVersion);
        });
    };
       
})(module.exports);