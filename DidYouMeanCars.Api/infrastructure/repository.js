(function(repository){

    var eventStore = require('./eventStore');

    repository.save = function(aggregate, callback, expectedVersion){
        eventStore.save(aggregate, callback, expectedVersion);
    };

    repository.getById = function(streamName, id){
        var events = eventStore.getEventsForAggregate(streamName);
        var aggregate = new AggregateRoot();
        aggregate.loadFromHistory(events);
        return aggregate;
    }

})(module.exports);