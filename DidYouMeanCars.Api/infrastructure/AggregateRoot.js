(function(AggregateRoot){

    AggregateRoot = function(id){
        var self = this;
        self.id = id;
        self.version = 0;
        self.changes = [];
    };

    AggregateRoot.prototype.getUncommittedEvents = function(){
        return this.changes;
    }

    AggregateRoot.prototype.markChangesAsCommitted = function(){
        this.changes.clear();
    }

    AggregateRoot.prototype.loadFromHistory = function(events){
        events.forEach(function(e){

        });
    }

    AggregateRoot.prototype.applyChange = function(event){

    }

})(module.exports);