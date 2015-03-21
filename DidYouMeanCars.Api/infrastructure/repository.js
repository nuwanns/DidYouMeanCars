(function(repository){

    var eventStore = require('eventStore');

    repository.save = function(aggregate, expectedVersion){
        eventStore.save(aggregate.streamName, aggregate.getUncommitedChanges());
    };

    repository.getById = function(streamName, id){
        var events = eventStore.getEventsForAggregate(streamName);
        var aggregate = new AggregateRoot();
        aggregate.loadFromHistory(events);
        return aggregate;
    }

})(module.exports);