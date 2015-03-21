(function (todoListCommandHandlers) {

    var repository = require('../infrastructure/repository');

    todoListCommandHandlers.createToDoList = function(command) {
        var todoList = new TodoList(command.name);
        repository.save(todoList);
    };

    todoListCommandHandlers.renameTodoList = function(command){
        var todoList = repository.getById(command.id);
        todoList.rename(command.newName);
        repository.save(todoList, command.originalVersion);
    };

    todoListCommandHandlers.archiveTodoList = function(command){
        var todoList = repository.getById(command.id);
        todoList.archive();
        repository.save(todoList, command.originalVersion);
    };

})(module.exports);