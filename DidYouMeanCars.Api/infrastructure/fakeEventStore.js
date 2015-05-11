(function (fakeEventStore) {
    
    var events = [];

    fakeEventStore.init = function (given) {
        events = given;
    };

    fakeEventStore.peekChanges = function () {
        return events;
    };

})(module.exports);