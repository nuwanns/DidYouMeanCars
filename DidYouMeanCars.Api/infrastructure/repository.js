(function (repository) {
    
    var eventStore = require('./eventStore'),
        AggregateRoot = require('./AggregateRoot'),
        config = require('../config/config'),
        getStreamName = function (id) {
            return config.eventStoreUrl + config.streams.todoList + '-' + id;
        };
    
    repository.save = function (streamUrl, aggregate, callback, expectedVersion) {
        eventStore.save(streamUrl, aggregate, callback, expectedVersion);
    };
    
    repository.getById = function (id, Entity, next) {
        eventStore.getEventsForAggregate(getStreamName(id) , function (events) {
            var aggregate = new Entity(id);
            aggregate.loadFromHistory(events);
            next(aggregate);
        });
    };

})(module.exports);