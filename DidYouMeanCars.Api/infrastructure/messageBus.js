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

})(module.exports);