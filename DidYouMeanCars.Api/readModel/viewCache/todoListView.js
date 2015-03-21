(function(todoListView){

    var database = require('../database');
    var TodoListViewModel = require('../viewModels/todoListViewModel');

    todoListView = function(){};

    todoListView.prototype.handleTodoListCreated = function(message, next){
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.todoList.insert(new TodoList(message.id, message.name), function (err) {
                    if (err) {
                        next(err);
                    } else {
                        next(null);
                    }
                });
            }
        });
    };

    todoListView.prototype.handleTodoListRenamed = function(message, next){
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.todoList.update({id : message.id}, {name : message.name}, {upsert : false}, function (err) {
                    if (err) {
                        next(err);
                    } else {
                        next(null);
                    }
                });
            }
        });
    };

    todoListView.prototype.handleTodoListArchived = function(){
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.todoList.update({id : message.id}, {isArchived : message.isArchived}, {upsert : false}, function (err) {
                    if (err) {
                        next(err);
                    } else {
                        next(null);
                    }
                });
            }
        });
    };

})(module.exports);