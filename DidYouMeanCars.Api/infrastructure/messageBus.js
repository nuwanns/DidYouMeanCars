(function(messageBus){
    
    var handlers = [],
        _ = require('underscore');
    
    messageBus.registerHandler = function(type, handler){ 
        handlers.push({ type: type, handler: handler });
    };
    
    messageBus.send = function(type, command, callback){
        var wrapper = _.find(handlers, function (item) {
            return item.type === type;
        });
        if (wrapper) {
            wrapper.handler.call(this, command, callback);
        }
    };

    messageBus.publish = function (event) {
        var wrappers = _.filter(handlers, function (item) { 
            return event.eventType == item.type;
        });
        var callback = function (error){
            if (error) {
                console.log(error);
            }
        }
        _.each(wrappers, function (wrapper) {
            wrapper.handler.call(this, event, callback);
        });
    };

})(module.exports);