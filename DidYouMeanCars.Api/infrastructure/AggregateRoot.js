function AggregateRoot(id) {
    this.id = id;
    this.version = 0;
    this.eventStoreUrl = 'http://127.0.0.1:2113/streams/';
    this.changes = [];
};

AggregateRoot.prototype.getUncommitedChanges = function () {
    return this.changes;
}

AggregateRoot.prototype.markChangesAsCommitted = function () {
    this.changes.clear();
}

AggregateRoot.prototype.loadFromHistory = function (events) {
    events.forEach(function (e) {
        this.applyChange(e, true);
    });
}

AggregateRoot.prototype.applyChange = function (event, shouldSkip) {
    if ('apply' + event.eventType in this) {
        this['apply' + event.eventType](event);
        if (!shouldSkip) {
            this.changes.push(event);
        }
    }
}

module.exports = AggregateRoot;