(function (todoListController) {
    
    var uuid = require('node-uuid'),
        messageBus = require('../infrastructure/messageBus'),
        todoListFacade = require('../readModel/todoListFacade');
    
    todoListController.init = function (app) {       
        app.get("/api/todolist", function (req, res) {
            var callback = function (error, results) {
                res.set("Content-Type", "application/json");
                if (error) {
                    console.log(error);
                    res.send([{ status: 'error getting data' }]);
                } else {
                    res.send(results);
                }
            };
            todoListFacade.getTodoLists(callback);
        });
        
        app.post("/api/todolist", function (req, res) {
            var callback = function (isSuccessful) {
                res.set("Content-Type", "application/json");
                if (isSuccessful) {
                    res.send([{ status: 'created' }]);
                } else {
                    res.send([{ status: 'error creating resource' }]);
                }
            };
            messageBus.send('CreateTodoList', { id : uuid.v4(), name : req.body.name }, callback);
        });
        
        app.put("/api/todolist", function (req, res) {
            var callback = function (isSuccessful) {
                res.set("Content-Type", "application/json");
                if (isSuccessful) {
                    res.send([{ status: 'updated' }]);
                } else {
                    res.send([{ status: 'error updating the resource' }]);
                }
            };
            messageBus.send('RenameTodoList', { id : req.body.id, newName : req.body.newName }, callback);
        });
    };

})(module.exports);