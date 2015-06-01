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
            messageBus.send('CreateTodoItem', { todoItemId : uuid.v4(), name : req.body.name, todoListId : req.body.todoListId }, callback);
        });

        app.delete("/api/todoitem/:todoItemId/:todoListId", function (req, res) {
            var callback = function (isSuccessful) {
                res.set("Content-Type", "application/json");
                if (isSuccessful) {
                    res.send([{ status: 'deleted' }]);
                } else {
                    res.send([{ status: 'error creating resource' }]);
                }
            };
            messageBus.send('DiscardTodoItem', { todoItemId : req.params.todoItemId, todoListId : req.params.todoListId }, callback);
        });

        app.post("/api/todoitem-scheduler", function (req, res) {
            var callback = function (isSuccessful) {
                res.set("Content-Type", "application/json");
                if (isSuccessful) {
                    res.send([{ status: 'updated' }]);
                } else {
                    res.send([{ status: 'error updating resource' }]);
                }
            };
            messageBus.send('ScheduleTodoItem', { todoItemId : req.body.todoItemId, dueDate : req.body.dueDate, todoListId : req.body.todoListId }, callback);
        });

        app.post("/api/todoitem-tracker", function (req, res) {
            var callback = function (isSuccessful) {
                res.set("Content-Type", "application/json");
                if (isSuccessful) {
                    res.send([{ status: 'created' }]);
                } else {
                    res.send([{ status: 'error creating resource' }]);
                }
            };
            messageBus.send('CompleteTodoItem', { todoItemId : req.body.todoItemId, todoListId : req.body.todoListId, completedTime : req.body.completedTime }, callback);
        });
    };

})(module.exports);