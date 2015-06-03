(function (controllers) {
    var todoListController = require('./todoListController'),
        todoItemController = require('./todoItemController'),
        specController = require('./specController'),
        projectionsController = require('./projectionsController');

    controllers.init = function (app) {
        todoListController.init(app);
        todoItemController.init(app);
        specController.init(app);
        projectionsController.init(app);
    };

})(module.exports);