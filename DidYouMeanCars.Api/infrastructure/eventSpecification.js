(function(EventSpecification) {

    EventSpecification = function(){
        var self = this;
        self.caught = null;
        self.fakeStore = null;
        self.given = function() {};
        self.when = function() {};
        self.onHandler = function() {};
        self.expect = function() {};

        self.setUp = function(){
            Caught = null;
            FakeStore = new FakeEventStore(Given());
            var handler = OnHandler();
            try
            {
                handler.Handle(When());
                var produced = FakeStore.PeekChanges().ToList();
                var expected = Expect().ToList();
                compareEvents(produced, expected);
            }
            catch (ex)
            {
                Caught = ex;
            }
        };

        function compareEvents(produced, expected){

        }
    };

})(module.exports);