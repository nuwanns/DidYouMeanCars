var AggregateRoot = require('../infrastructure/AggregateRoot'),
    util = require('util'), 
    uuid = require('node-uuid');

function TodoList(id, name) {
    this.streamName = 'todolist';
    AggregateRoot.call(this, id);
    this.applyChange(new this.TodoListCreated(name));
};

util.inherits(TodoList, AggregateRoot);

TodoList.prototype.rename = function (newName) {
    this.applyChange(new this.TodoListRenamed(newName));
};

TodoList.prototype.archive = function () {
    this.applyChange(new this.TodoListArchived());
};

// Event handlers

TodoList.prototype.applyTodoListCreated = function (event) {
    this.isArchived = false;
};

TodoList.prototype.applyTodoListArchived = function (event) {
    this.isArchived = true;
};

// Domain events

TodoList.prototype.TodoListCreated = function (name) {
    this.eventType = 'TodoListCreated';
    this.eventId = uuid.v4();
    this.data = {name : name};
};

TodoList.prototype.TodoListRenamed = function (newName) {
    this.eventType = 'TodoListRenamed';
    this.eventId = uuid.v4();
    this.data = {newName : newName};
};

TodoList.prototype.TodoListArchived = function () {
    this.eventType = 'TodoListArchived';
    this.eventId = uuid.v4();
};

module.exports = TodoList;


