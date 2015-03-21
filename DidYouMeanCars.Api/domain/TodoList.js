(function(TodoList){

    var AggregateRoot = require('../infrastructure/AggregateRoot'),
        util = require('util');

    TodoList = function (id, name) {
        var self = this;
        self.id = id;
        self.name = name;
        self.isArchived = false;
    };

    util.inherits(TodoList, AggregateRoot);

    TodoList.prototype.rename = function(){

    };

    TodoList.prototype.archive = function(){

    };

})(module.exports);


