(function (controllers) {
    var todoListController = require('./todoListController'),
        todoItemController = require('./todoItemController'),
        specController = require('./specController');

    controllers.init = function (app) {
        todoListController.init(app);
        todoItemController.init(app);
        specController.init(app);
    };

})(module.exports);