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

TodoList.prototype.addTodoItem = function (todoItemId, name, todoListId) {
    this.applyChange(new this.TodoItemCreated(todoItemId, name, todoListId));
};

TodoList.prototype.discardTodoItem = function (todoItemId, todoListId, todoListName, todoItemName) {
    this.applyChange(new this.TodoItemDiscarded(todoItemId, todoListId, todoListName, todoItemName));
};

TodoList.prototype.scheduleTodoItem = function (todoItemId, dueDate, todoListId) {
    this.applyChange(new this.TodoItemScheduled(todoItemId, dueDate, todoListId));
};

TodoList.prototype.reScheduleTodoItem = function (todoItemId, dueDate, todoListId) {
    this.applyChange(new this.TodoItemReScheduled(todoItemId, dueDate, todoListId));
};

TodoList.prototype.completeTodoItem = function (todoItemId, completedTime, todoListId) {
    this.applyChange(new this.TodoItemCompleted(todoItemId, completedTime, todoListId));
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
    this.eventType = 'TodoListCreated';
    this.eventId = uuid.v4();
    this.data = { id : id, name : name, happenedOn : Date.now() };
    this.toString = function () {
        return this.eventType;
    };
};

TodoList.prototype.TodoListRenamed = function (id, newName) {
    this.eventType = 'TodoListRenamed';
    this.eventId = uuid.v4();
    this.data = { id : id, newName : newName , happenedOn : Date.now() };
    this.toString = function () {
        return this.eventType;
    };
};

TodoList.prototype.TodoListArchived = function (id) {
    this.eventType = 'TodoListArchived';
    this.eventId = uuid.v4();
    this.data = { id : id , happenedOn : Date.now() };
    this.toString = function () {
        return this.eventType;
    };
};

TodoList.prototype.TodoItemCreated = function (todoItemId, name, todoListId){
    this.eventType = 'TodoItemCreated';
    this.eventId = uuid.v4();
    this.data = { todoItemId : todoItemId, name : name, todoListId : todoListId , happenedOn : Date.now() };
    this.toString = function () {
        return this.eventType;
    };
}

TodoList.prototype.TodoItemDiscarded = function (todoItemId, todoListId, todoListName, todoItemName){
    this.eventType = 'TodoItemDiscarded';
    this.eventId = uuid.v4();
    this.data = { todoItemId : todoItemId, todoListId : todoListId , happenedOn : Date.now(), todoListName : todoListName, todoItemName : todoItemName };
    this.toString = function () {
        return this.eventType;
    };
}

TodoList.prototype.TodoItemScheduled = function (todoItemId, dueDate, todoListId){
    this.eventType = 'TodoItemScheduled';
    this.eventId = uuid.v4();
    this.data = { todoItemId : todoItemId, todoListId : todoListId, dueDate : dueDate , happenedOn : Date.now() };
    this.toString = function () {
        return this.eventType;
    };
}

TodoList.prototype.TodoItemReScheduled = function (todoItemId, dueDate, todoListId) {
    this.eventType = 'TodoItemReScheduled';
    this.eventId = uuid.v4();
    this.data = { todoItemId : todoItemId, todoListId : todoListId, dueDate : dueDate , happenedOn : Date.now() };
    this.toString = function () {
        return this.eventType;
    };
}

TodoList.prototype.TodoItemCompleted = function (todoItemId, completedTime, todoListId) {
    this.eventType = 'TodoItemCompleted';
    this.eventId = uuid.v4();
    this.data = { todoItemId : todoItemId, todoListId : todoListId, completedTime : completedTime , happenedOn : Date.now() };
    this.toString = function () {
        return this.eventType;
    };
}

module.exports = TodoList;


