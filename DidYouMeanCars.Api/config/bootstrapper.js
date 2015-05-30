(function (bootstrapper) {
    
    var messageBus = require('../infrastructure/messageBus'),
        todoListCommandHandlers = require('../commandHandlers/todoListCommandHandlers'),
        todoItemCommandHandlers = require('../commandHandlers/todoItemCommandHandlers'),
        todoListView = require('../readModel/viewCache/todoListView');

    bootstrapper.init = function () {
        messageBus.registerHandler('CreateTodoList', todoListCommandHandlers.createTodoList);
        messageBus.registerHandler('RenameTodoList', todoListCommandHandlers.renameTodoList);
        messageBus.registerHandler('ArchiveTodoList', todoListCommandHandlers.archiveTodoList);
        messageBus.registerHandler('CreateTodoItem', todoItemCommandHandlers.createTodoItem);
        messageBus.registerHandler('DiscardTodoItem', todoItemCommandHandlers.discardTodoItem);
        messageBus.registerHandler('ScheduleTodoItem', todoItemCommandHandlers.scheduleTodoItem);
        messageBus.registerHandler('CompleteTodoItem', todoItemCommandHandlers.completeTodoItem);

        messageBus.registerHandler('TodoListCreated', todoListView.handleTodoListCreated);
        messageBus.registerHandler('TodoListRenamed', todoListView.handleTodoListRenamed);
        messageBus.registerHandler('TodoListArchived', todoListView.handleTodoListArchived);
        messageBus.registerHandler('TodoItemCreated', todoListView.handleTodoItemCreated);
        messageBus.registerHandler('TodoItemDiscarded', todoListView.handleTodoItemDiscarded);
        messageBus.registerHandler('TodoItemScheduled', todoListView.handleTodoItemScheduled);
        messageBus.registerHandler('TodoItemCompleted', todoListView.handleTodoItemCompleted);
    };

})(module.exports);