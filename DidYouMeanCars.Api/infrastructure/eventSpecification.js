var FakeEventStore = require('./FakeEventStore');

function EventSpecification(given, when, expect, handle) {
    this.caught = null;
    this.fakeStore = null;
    this.given = given;
    this.when = when;
    this.expect = expect;
    this.handle = handle;
}

EventSpecification.prototype.setUp = function () {
    this.caught = null;
    this.fakeStore = new FakeEventStore(given());
    var compareEvents = function (produced, expected) {

        }, 
        callback = function () {

        };
    try {
        handle(when(), callback);
        var produced = fakeStore.peekChanges().toList();
        var expected = expect().toList();
        compareEvents(produced, expected);
    }
    catch (ex) {
        this.caught = ex;
    }
};

module.exports = EventSpecification;