function AggregateRoot(id) {
    this.id = id;
    this.version = 0;
    this.changes = [];
};

AggregateRoot.prototype.getUncommitedChanges = function () {
    return this.changes;
}

AggregateRoot.prototype.markChangesAsCommitted = function () {
    this.changes = [];
}

AggregateRoot.prototype.loadFromHistory = function (events) {
    var self = this;
    events.forEach(function (e) {
        self.applyChange(e, true);
    });
}

AggregateRoot.prototype.applyChange = function (event, shouldSkip) {
    if ('apply' + event.eventType in this) {
        this['apply' + event.eventType](event);
    }
    if (!shouldSkip) {
        this.changes.push(event);
    }
}

module.exports = AggregateRoot;