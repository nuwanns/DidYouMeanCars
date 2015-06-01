(function (todoListView) {
    
    var database = require('../database'),
        TodoListViewModel = require('../viewModels/TodoListViewModel'),
        TodoItemViewModel = require('../viewModels/TodoItemViewModel');
    
    todoListView.handleTodoListCreated = function (event, next) {
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
    
    todoListView.handleTodoListRenamed = function (event, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.todoList.update({ id : event.data.id }, { $set: { name: event.data.newName } }, function (err) {
                    if (err) {
                        next(err);
                    } else {
                        next(null);
                    }
                });
            }
        });
    };
    
    todoListView.handleTodoListArchived = function (event, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.todoList.update({ id : event.data.id }, { $set: { isArchived : event.data.isArchived } }, function (err) {
                    if (err) {
                        next(err);
                    } else {
                        next(null);
                    }
                });
            }
        });
    };
    
    todoListView.handleTodoItemCreated = function (event, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.todoList.update({  id : event.data.todoListId }, 
                {
                    $push: {
                        "todoItems": new TodoItemViewModel(event.data.todoItemId, event.data.name) 
                    }
                }, function (err) {
                    if (err) {
                        next(err);
                    } else {
                        next(null);
                    }
                });
            }
        });
    };
    
    todoListView.handleTodoItemDiscarded = function (event, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.todoList.update({ id : event.data.todoListId }, 
                {
                    $pull: {
                        "todoItems": { id : event.data.todoItemId }
                    }
                }, function (err) {
                    if (err) {
                        next(err);
                    } else {
                        next(null);
                    }
                });
            }
        });
    };
    
    todoListView.handleTodoItemScheduled = function (event, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.todoList.update({ id : event.data.todoListId, "todoItems.id" : event.data.todoItemId }, 
                {
                    $set: {
                        "todoItems.$.dueDate": event.data.dueDate
                    }
                }, function (err) {
                    if (err) {
                        next(err);
                    } else {
                        next(null);
                    }
                });
            }
        });
    };
    
    todoListView.handleTodoItemCompleted = function (event, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.todoList.update({ id : event.data.todoListId, "todoItems.id" : event.data.todoItemId }, 
                {
                    $set: {
                        "todoItems.$.isCompleted": true, "todoItems.$.completedTime": event.data.completedTime
                    }
                }, function (err) {
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