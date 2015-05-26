(function (todoListView) {
    
    var database = require('../database'),
        TodoListViewModel = require('../viewModels/todoListViewModel'),
        handleErrors = function (err) {
            if (err) {
                next(err);
            } else {
                next(null);
            }
        };
    
    todoListView.handleTodoListCreated = function (event, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.todoList.insert(new TodoListViewModel(event.data.id, event.data.name), handleErrors);
            }
        });
    };
    
    todoListView.handleTodoListRenamed = function (event, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.todoList.update({ id : event.data.id }, { $set: { name: event.data.newName } }, handleErrors);
            }
        });
    };
    
    todoListView.handleTodoListArchived = function (event, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.todoList.update({ id : event.data.id }, { $set: { isArchived : event.data.isArchived } }, handleErrors);
            }
        });
    };
    
    todoListView.handleTodoItemCreated = function (event, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                //db.todoList.update({ id : event.data.id }, { $set: { isArchived : event.data.isArchived } }, handleErrors);
            }
        });
    };

    todoListView.handleTodoItemDiscarded = function (event, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                //db.todoList.update({ id : event.data.id }, { $set: { isArchived : event.data.isArchived } }, handleErrors);
            }
        });
    };

    todoListView.handleTodoItemScheduled = function (event, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                //db.todoList.update({ id : event.data.id }, { $set: { isArchived : event.data.isArchived } }, handleErrors);
            }
        });
    };

    todoListView.handleTodoItemCompleted = function (event, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                //db.todoList.update({ id : event.data.id }, { $set: { isArchived : event.data.isArchived } }, handleErrors);
            }
        });
    };

})(module.exports);