(function (controllers) {
    var todoListController = require("./todoListController");

    controllers.init = function (app) {
        todoListController.init(app);
    };

})(module.exports);