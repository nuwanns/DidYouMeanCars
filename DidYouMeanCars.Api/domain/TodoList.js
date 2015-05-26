var AggregateRoot = require('../infrastructure/AggregateRoot'),
    util = require('util'), 
    uuid = require('node-uuid');

function TodoList(id, name) {
    this.isArchived = null;
    this.todoItems = [];
    AggregateRoot.call(this, id);
    if (name) {
        this.applyChange(new this.TodoListCreated(id, name));
    }
};

util.inherits(TodoList, AggregateRoot);

TodoList.prototype.rename = function (newName) {
    this.applyChange(new this.TodoListRenamed(this.id, newName));
};

TodoList.prototype.archive = function () {
    this.applyChange(new this.TodoListArchived(this.id));
};

TodoList.prototype.addTodoItem = function (id, name) {
    this.applyChange(new this.TodoItemAdded(id, name));
};

TodoList.prototype.discardTodoItem = function (id) {
    this.applyChange(new this.TodoItemDiscarded(id));
};

TodoList.prototype.scheduleTodoItem = function (id, dueDate) {
    this.applyChange(new this.TodoItemScheduled(id, dueDate));
};

TodoList.prototype.completeTodoItem = function (id) {
    this.applyChange(new this.TodoItemCompleted(id));
};

// Event handlers

TodoList.prototype.applyTodoListCreated = function (event) {
    this.isArchived = false;
};

TodoList.prototype.applyTodoListArchived = function (event) {
    this.isArchived = true;
};

// Domain events

TodoList.prototype.TodoListCreated = function (id, name) {
    var self = this;
    this.eventType = 'TodoListCreated';
    this.eventId = uuid.v4();
    this.data = { id : id, name : name };
    this.toString = function () {
        return this.eventType;
    };
};

TodoList.prototype.TodoListRenamed = function (id, newName) {
    this.eventType = 'TodoListRenamed';
    this.eventId = uuid.v4();
    this.data = { id : id, newName : newName };
    this.toString = function () {
        return this.eventType;
    };
};

TodoList.prototype.TodoListArchived = function (id) {
    this.eventType = 'TodoListArchived';
    this.eventId = uuid.v4();
    this.data = { id : id };
    this.toString = function () {
        return this.eventType;
    };
};

TodoList.prototype.TodoItemAdded = function (id, name, todoListId){
    this.eventType = 'TodoItemAdded';
    this.eventId = uuid.v4();
    this.data = { id : id, name : name, todoListId : todoListId };
    this.toString = function () {
        return this.eventType;
    };
}

TodoList.prototype.TodoItemDiscarded = function (id, todoListId){
    this.eventType = 'TodoItemDiscarded';
    this.eventId = uuid.v4();
    this.data = { id : id, todoListId : todoListid };
    this.toString = function () {
        return this.eventType;
    };
}

TodoList.prototype.TodoItemScheduled = function (id, todoListId, dueDate){
    this.eventType = 'TodoItemScheduled';
    this.eventId = uuid.v4();
    this.data = { id : id, todoListId : todoListid, dueDate : dueDate };
    this.toString = function () {
        return this.eventType;
    };
}

TodoList.prototype.TodoItemCompleted = function (id, todoListId) {
    this.eventType = 'TodoItemCompleted';
    this.eventId = uuid.v4();
    this.data = { id : id, todoListId : todoListid };
    this.toString = function () {
        return this.eventType;
    };
}

module.exports = TodoList;


