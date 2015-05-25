var AggregateRoot = require('../infrastructure/AggregateRoot'),
    util = require('util'), 
    uuid = require('node-uuid');

function TodoList(id, name) {
    this.isArchived = null;
    //this.todoItems = [];
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

TodoList.prototype.addTodoItem = function () {
    this.applyChange(new this.TodoItemAdded(this.id, name, dueDate));
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

TodoList.prototype.TodoItemAdded = function (id, name, dueDate){
    this.eventType = 'TodoItemAdded';
    this.eventId = uuid.v4();
    this.data = { id : id, name : name, dueDate : dueDate };
    this.toString = function () {
        return this.eventType;
    };
}

module.exports = TodoList;


