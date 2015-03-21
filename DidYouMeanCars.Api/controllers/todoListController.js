(function (todoListController) {

    var uuid = require('node-uuid');

    todoListController.init  = function (app) {

        app.get("/api/todolist", function(req, res){
            var atomEventReader = require('../services/atomEventReader');
            atomEventReader.getEventsFromStream('http://127.0.0.1:2113/streams/todolist', function(events){
                res.set("Content-Type", "application/json");
                res.send(events);
            });
        });

        app.get("/api/create", function(req, res){
            var eventStore = require('../infrastructure/eventStore');
            var events =  [{
                    "eventId": uuid.v4(),
                    "eventType": "ToDoListRenamed",
                    "data": {
                        "name": "Personal Tasks x"
                    }
                }];
            eventStore.save('http://127.0.0.1:2113/streams/todolist', events);
            res.set("Content-Type", "application/json");
            res.send([{status: 'created'}]);
        });
    };

})(module.exports);