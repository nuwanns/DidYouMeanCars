(function (todoListController) {
    
    var uuid = require('node-uuid'),
        messageBus = require('../infrastructure/messageBus'),
        todoListFacade = require('../readModel/todoListFacade');
    
    todoListController.init = function (app) {
        
        //app.get("/api/todolist", function(req, res){
        //    var atomEventReader = require('../services/atomEventReader');
        //    atomEventReader.getEventsFromStream('http://127.0.0.1:2113/streams/todolist-63e645ea-c577-4bad-a9cd-73dae16df91a', function(events){
        //        res.set("Content-Type", "application/json");
        //        res.send(events);
        //    });
        //});
        
        //app.post("/api/todolist", function(req, res){
        //    var eventStore = require('../infrastructure/eventStore');
        //    var events =  [{
        //            "eventId": uuid.v4(),
        //            "eventType": "TodoListCreated",
        //            "data": {
        //                "name": req.body.name
        //            }
        //        }];
        //    eventStore.save('http://127.0.0.1:2113/streams/todolist-' + uuid.v4(), events);
        //    res.set("Content-Type", "application/json");
        //    res.send([{status: 'created'}]);
        //});
        
        app.get("/api/todolist", function (req, res) {
            var callback = function (error, results) {
                res.set("Content-Type", "application/json");
                if (error) {
                    res.send(null); // return error
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
    };

})(module.exports);