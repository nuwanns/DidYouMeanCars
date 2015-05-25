(function (specRunner) {
    
    var _ = require('underscore'),
        whenRenamingATodoList = require('./TodoList/whenRenamingATodoList'),
        specList = [
            { id : 'whenRenamingATodoList', handler : new whenRenamingATodoList() }
        ];
    
    specRunner.runAll = function () {
        var results = [];
        results.push(whenRenamingATodoList.assert());
        return results;
    };
    
    specRunner.run = function (specId) {
        var spec = _.find(specList, function (item) {
            return item.id === specId;
        });
        return spec.handler.assert();
    };

})(module.exports);