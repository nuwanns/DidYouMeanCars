var proxyquire = require('proxyquire'),
    util = require('util'), 
    uuid = require('node-uuid'),
    TodoList = require('../../domain/TodoList'),
    EventSpecification = require('../../infrastructure/EventSpecification'),
    todoListCommands = require('../../commands/todoListCommands'),
    fakeRepository = require('../../infrastructure/fakeRepository'),
    todoListCommandHandlers = proxyquire('../../commandHandlers/todoListCommandHandlers', { '../infrastructure/repository' : fakeRepository });

function whenRenamingATodoList() {
    var id = uuid.v4(),
        name = 'My TodoList',
        newName = 'My TodoList Modified',
        given = function () {
            return [new TodoList.prototype.TodoListCreated(id, name)];
        },
        when = function () {
            return new todoListCommands.RenameTodoList(id, newName);
        },
        expect = function () {
            return [new TodoList.prototype.TodoListRenamed(id, newName)];
        },
        assertions = function () {
            var exactlyOneEvent = {
                toString : function(){
                    return 'only one event was raised';
                },
                assert : function (expected){
                    return expected.length === 1;
                }
            };
            return [exactlyOneEvent];
        };
    
    this.toString = function () {
        return 'when renaming a todolist';
    };  
    EventSpecification.call(this, given, when, expect, todoListCommandHandlers.renameTodoList, assertions, fakeRepository);
}

util.inherits(whenRenamingATodoList, EventSpecification);

module.exports = whenRenamingATodoList;