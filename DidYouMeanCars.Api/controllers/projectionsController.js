(function (projectionsController) {
    
    projectionsController.init = function (app) {
        app.get("/api/projections", function (req, res) {
            res.set("Content-Type", "application/json");
            var results = [
                { id : 'DiscardedAfterReSchedulingStream', name: 'Discarded after re-scheduling', result: '' } 
            ];
            res.send(results);
        });
        
        app.post("/api/projectionResult", function (req, res) {
            var eventStore = require('../infrastructure/eventStore'),
                config = require('../config/config');
            var callback = function (result) {
                res.set("Content-Type", "application/json");
                res.send({ result: result });
            };
            eventStore.getEventsForAggregate(config.eventStoreUrl + req.body.id, callback);          
        });
    };

})(module.exports);