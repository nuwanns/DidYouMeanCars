(function(todoListView){

    var database = require('../database');
    var TodoListViewModel = require('../viewModels/todoListViewModel');

    todoListView.handleTodoListCreated = function(event, next){
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.todoList.insert(new TodoListViewModel(event.data.id, event.data.name), function (err) {
                    if (err) {
                        next(err);
                    } else {
                        next(null);
                    }
                });
            }
        });
    };

    todoListView.handleTodoListRenamed = function(event, next){
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.todoList.update({id : event.data.id}, {name : event.data.name}, {upsert : false}, function (err) {
                    if (err) {
                        next(err);
                    } else {
                        next(null);
                    }
                });
            }
        });
    };

    todoListView.handleTodoListArchived = function(event, next){
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.todoList.update({id : event.data.id}, {isArchived : event.data.isArchived}, {upsert : false}, function (err) {
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