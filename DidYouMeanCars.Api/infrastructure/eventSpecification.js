var testFormatter = require('./testFormatter');

function EventSpecification(given, when, expect, handle, repository) {
    this.sut = null;
    this.given = given;
    this.when = when();
    this.expect = expect;
    this.handle = handle;
    this.repository = repository;
    this.caught = null;
    this.produced = null;
}

EventSpecification.prototype.assert = function () {
    try {
        this.repository.init(this.given());
        this.handle(this.when);
        this.sut = this.repository.sut;
    }
    catch (ex) {
        this.caught = ex;
    }
    
    if (this.caught) {
        return 'An error occured';
    }
    var produced = this.sut.getUncommitedChanges(),
        expected = this.expect(),
        compareEvents = function (expected, produced) {
            return true;
        }, 
        areEqual = null,
        output = null;
    compareEvents(expected, produced);
    output = testFormatter.formatSpecification(this);
    return output;
};

module.exports = EventSpecification;