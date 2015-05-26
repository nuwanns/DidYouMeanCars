(function (todoItemController) {
    
    var uuid = require('node-uuid'),
        messageBus = require('../infrastructure/messageBus'),
        todoListFacade = require('../readModel/todoListFacade');
    
    todoItemController.init = function (app) {      
        app.post("/api/todoitem", function (req, res) {
            var callback = function (isSuccessful) {
                res.set("Content-Type", "application/json");
                if (isSuccessful) {
                    res.send([{ status: 'created' }]);
                } else {
                    res.send([{ status: 'error creating resource' }]);
                }
            };
            messageBus.send('CreateTodoItem', { id : uuid.v4(), name : req.body.name, todoListId : req.body.todoListId }, callback);
        });
    };
    
    todoItemController.init = function (app) {
        app.delete("/api/todoitem", function (req, res) {
            var callback = function (isSuccessful) {
                res.set("Content-Type", "application/json");
                if (isSuccessful) {
                    res.send([{ status: 'deleted' }]);
                } else {
                    res.send([{ status: 'error creating resource' }]);
                }
            };
            messageBus.send('DiscardTodoItem', { id : req.body.id, todoListId : req.body.todoListId }, callback);
        });
    };

    todoItemController.init = function (app) {
        app.post("/api/todoitem-scheduler", function (req, res) {
            var callback = function (isSuccessful) {
                res.set("Content-Type", "application/json");
                if (isSuccessful) {
                    res.send([{ status: 'created' }]);
                } else {
                    res.send([{ status: 'error creating resource' }]);
                }
            };
            messageBus.send('ScheduleTodoItem', { id : req.body.id, dueDate : req.body.dueDate, todoListId : req.body.todoListId }, callback);
        });
    };

    todoItemController.init = function (app) {
        app.post("/api/todoitem-tracker", function (req, res) {
            var callback = function (isSuccessful) {
                res.set("Content-Type", "application/json");
                if (isSuccessful) {
                    res.send([{ status: 'created' }]);
                } else {
                    res.send([{ status: 'error creating resource' }]);
                }
            };
            messageBus.send('CompleteTodoItem', { id : req.body.id, todoListId : req.body.todoListId }, callback);
        });
    };

})(module.exports);