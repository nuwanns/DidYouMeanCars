(function (todoListCommandHandlers) {

    var repository = require('../infrastructure/repository'),
        TodoList = require('../domain/TodoList');

    todoListCommandHandlers.createTodoList = function(command, callback) {
        var todoList = new TodoList(command.id, command.name);
        repository.save(todoList, callback);
    };

    todoListCommandHandlers.renameTodoList = function(command, callback){
        var todoList = repository.getById(command.id);
        todoList.rename(command.newName);
        repository.save(todoList, callback, command.originalVersion);
    };

    todoListCommandHandlers.archiveTodoList = function(command, callback){
        var todoList = repository.getById(command.id);
        todoList.archive();
        repository.save(todoList, callback, command.originalVersion);
    };

})(module.exports);