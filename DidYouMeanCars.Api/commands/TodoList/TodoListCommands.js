(function (todoListCommands) {
    
    todoListCommands.CreateTodoList = function (id, name) {
        this.id = id;
        this.name = name;
    };
    
    todoListCommands.RenameTodoList = function (id, newName) {
        this.id = id;
        this.newName = newName;
    };
    
    todoListCommands.ArchiveTodoList = function (id) {
        this.id = id;
    };

})(module.exports);