(function(eventStore){

    var atomEventReader = require('./../services/atomEventReader'),
        messageBus = require('./messageBus.js'),
        http = require('http'),
        _ = require('underscore'),
        url = require('url');

    eventStore.getEventsForAggregate = function(streamName, next){
        atomEventReader.getEventsFromStream(streamName, function(events){
            next(events);
        });
    };

    eventStore.save = function (streamUrl, aggregate, callback){
        var options = url.parse(streamUrl);
        options.headers = { 'Content-Type':'application/vnd.eventstore.events+json' };
        options.method = 'POST';
        var request = http.request(options, function(res){
            if (res.statusCode === 201) {
                _.each(aggregate.getUncommitedChanges(), function (event) {
                    messageBus.publish(event);
                });
                aggregate.markChangesAsCommitted();
                callback(true);
            }
        });
        request.write(JSON.stringify(aggregate.getUncommitedChanges()));
        request.end();
    };

})(module.exports);