var FakeEventStore = require('./FakeEventStore');

function EventSpecification() {
    this.caught = null;
    this.fakeStore = null;
    this.given = function () { };
    this.when = function () { };
    this.onHandler = function () { };
    this.expect = function () { };
}

EventSpecification.prototype.setUp = function () {
    this.caught = null;
    this.fakeStore = new FakeEventStore(given());
    var handler = onHandler();
    var compareEvents = function (produced, expected) {

    };
    try {
        handler.handle(When());
        var produced = fakeStore.peekChanges().toList();
        var expected = Expect().toList();
        compareEvents(produced, expected);
    }
    catch (ex) {
        this.caught = ex;
    }
};

module.exports = EventSpecification;