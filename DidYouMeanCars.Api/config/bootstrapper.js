(function (bootstrapper) {
    
    var messageBus = require('../infrastructure/messageBus'),
        todoListCommandHandlers = require('../commandHandlers/todoListCommandHandlers'),
        todoListView = require('../readModel/viewCache/todoListView');

    bootstrapper.init = function () {
        messageBus.registerHandler('CreateTodoList', todoListCommandHandlers.createTodoList);
        messageBus.registerHandler('RenameTodoList', todoListCommandHandlers.renameTodoList);
        messageBus.registerHandler('ArchiveTodoList', todoListCommandHandlers.archiveTodoList);
        messageBus.registerHandler('TodoListCreated', todoListView.handleTodoListCreated);
        messageBus.registerHandler('TodoListRenamed', todoListView.handleTodoListRenamed);
        messageBus.registerHandler('TodoListArchived', todoListView.handleTodoListArchived);
    };

})(module.exports);