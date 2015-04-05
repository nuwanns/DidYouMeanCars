(function(messageBus){
    
    var handlers = [],
        _ = require('underscore');
    
    messageBus.registerHandler = function(type, handler){ 
        handlers.push({ type: type, handler: handler });
    };
    
    messageBus.send = function(type, command){
        var handler = _.find(handlers, function (handler) {
            return handler.type === type;
        });
        if (handler) {
            handler(command);
        }
    };

})(module.exports);