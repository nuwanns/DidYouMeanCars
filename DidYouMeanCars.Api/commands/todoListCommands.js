(function (todoListCommands) {
    
    todoListCommands.CreateTodoList = function (id, name) {
        this.id = id;
        this.name = name;
        this.toString = function () {
            return 'creating a todolist with id:' + id + ' and name:' + name;
        };
    };
    
    todoListCommands.RenameTodoList = function (id, newName) {
        this.id = id;
        this.newName = newName;
        this.toString = function () {
            return 'renaming the todolist with new name "' + newName + '"';
        };
    };
    
    todoListCommands.ArchiveTodoList = function (id, name) {
        this.id = id;
        this.toString = function () {
            return 'archiving the todolist with id:' + id + 'and name:' + name;
        };
    };

})(module.exports);