(function (specController) {
    
    specController.init = function (app) {
        app.get("/api/spec", function (req, res) {
            res.set("Content-Type", "application/json");
            var results = [
                { id : 'whenRenamingATodoList', name: 'when renaming a todolist' } , 
                { id : 'whenArchivingATodoList', name: 'when archiving a todolist' }
            ];
            res.send(results);
        });
        
        app.post("/api/specResult", function (req, res) {
            var specRunner = require('../tests/specRunner');
            var result = specRunner.run(req.body.id);
            res.set("Content-Type", "application/json");
            res.send({ result: result });
        });
    };

})(module.exports);