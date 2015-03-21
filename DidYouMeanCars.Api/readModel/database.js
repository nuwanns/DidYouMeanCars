(function (database) {

    var mongodb = require("mongodb");
    var mongoUrl = "mongodb://localhost:27017/todoCalendar";
    var theDb = null;

    database.getDb = function (next) {
        if (!theDb) {
            mongodb.MongoClient.connect(mongoUrl, function (err, db) {
                if (err) {
                    next(err, null);
                } else {
                    theDb = {
                        db: db,
                        todoList: db.collection("todoList")
                    };
                    next(null, theDb);
                }
            });
        } else {
            next(null, theDb);
        }
    }

})(module.exports);