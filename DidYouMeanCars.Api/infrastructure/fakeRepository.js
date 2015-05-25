(function (repository) {
    
    var initialEvents = null;
    
    repository.init = function (given) {
        initialEvents = given;
    };

    repository.getById = function (id, Entity, next) {
        var self = this;
        var aggregate = new Entity(id);
        aggregate.loadFromHistory(initialEvents);
        next(aggregate);
    };
    
    repository.save = function (streamUrl, aggregate, callback, expectedVersion) {
        this.sut = aggregate;
    };

    repository.sut = null;

})(module.exports);