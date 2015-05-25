(function (controllers) {
    var todoListController = require("./todoListController"),
        specController = require('./specController');

    controllers.init = function (app) {
        todoListController.init(app);
        specController.init(app);
    };

})(module.exports);