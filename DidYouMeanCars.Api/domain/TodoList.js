var AggregateRoot = require('../infrastructure/AggregateRoot'),
    util = require('util'), 
    uuid = require('node-uuid');

function TodoList(id, name) {
    this.isArchived = null;
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
    this.data = {id : id, name : name};
};

TodoList.prototype.TodoListRenamed = function (id, newName) {
    this.eventType = 'TodoListRenamed';
    this.eventId = uuid.v4();
    this.data = {id : id, newName : newName};
};

TodoList.prototype.TodoListArchived = function (id) {
    this.eventType = 'TodoListArchived';
    this.eventId = uuid.v4();
    this.data = { id : id };
};

module.exports = TodoList;


