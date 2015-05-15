var TodoList = require('../../domain/TodoList'),
    EventSpecification = require('../../infrastructure/EventSpecification'),
    util = require('util'), 
    uuid = require('node-uuid'),
    todoListCommands = require('../../commands/todoListCommands');

function when_renaming_a_todolist() {
    var id = uuid.v4(),
        name = 'My TodoList',
        newName = 'My TodoList Modified',
        given = function () {
            return TodoList.TodoListCreated(id, name);
        },
        when = function () {
            return new todoListCommands.RenameTodoList(id, newName);
        },
        expect = function () {
            return new TodoList.TodoListRenamed(id, newName);
        };

    EventSpecification.call(this, given, when, expect);
}

util.inherits(when_renaming_a_todolist, EventSpecification);

module.exports = when_renaming_a_todoList;