(function (todoItemCommands) {
    
    todoItemCommands.CreateTodoItem = function (id, name, todoListId) {
        this.id = id;
        this.name = name;
        this.todoListId = todoListId;
        this.toString = function () {
            return 'creating a todo item with id:' + id + ' and name:' + name;
        };
    };
    
    todoItemCommands.DiscardTodoItem = function (id, name, todoListId) {
        this.id = id;
        this.todoListId = todoListId;
        this.toString = function () {
            return 'discarding the todo item "' + name + '"';
        };
    };
    
    todoItemCommands.ScheduleTodoItem = function (id, name, dueDate, todoListId) {
        this.id = id;
        this.todoListId = todoListId;
        this.toString = function () {
            return 'scheduling the todo item "' + name + '" on ' + dueDate;
        };
    };

    todoItemCommands.CompleteTodoItem = function (id, name, todoListId) {
        this.id = id;
        this.todoListId = todoListId;
        this.toString = function () {
            return 'completing the todo item "' + name + '"';
        };
    };

})(module.exports);