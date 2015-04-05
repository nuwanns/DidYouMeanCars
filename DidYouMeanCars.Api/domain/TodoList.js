(function(TodoList){

    var AggregateRoot = require('../infrastructure/AggregateRoot'),
        util = require('util');

    TodoList = function (id, name) {
        applyChange(new TodoListCreated(id, name));
    };

    util.inherits(TodoList, AggregateRoot);

    TodoList.prototype.rename = function(id,newName){
        applyChange(new TodoListRenamed(id, newName));
    };

    TodoList.prototype.archive = function(){
        applyChange(new TodoListArchived(id));
    };
    
    // Event handlers

    TodoList.prototype.applyTodoListCreated = function(event) {
        this.id = event.id;
        this.isArchived = false;
    };

    TodoList.prototype.applyTodoListArchived = function (event) {
        this.isArchived = true;
    };
    
    // Domain events

    TodoList.prototype.TodoListCreated = function (id, name) {
        this.type = 'TodoListCreated';
        this.id = id;
        this.name = name;
    };
    
    TodoList.prototype.TodoListRenamed = function (id, newName) {
        this.type = 'TodoListRenamed';
        this.id = id;
        this.newName = newName;
    };
    
    TodoList.prototype.TodoListArchived = function (id) {
        this.type = 'TodoListArchived';
        this.id = id;
    };

})(module.exports);


