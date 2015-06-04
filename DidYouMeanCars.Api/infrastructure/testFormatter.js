(function(testFormatter){
    
    testFormatter.formatSpecification = function (specification){
        var output = '\t \t \t \t \t \t \t \t \t \t Specification: ' + specification.toString();
        output += '\n';
        output += 'Given that:';
        specification.given().forEach(function(event){
            output += '\t' + event.toString();
        });
        output += '\n';
        output += 'When: \t \t' + specification.when.toString();
        output += '\n';
        output += 'Expect that:';
        specification.expect().forEach(function(event){
            output += '\t' + event.toString();
        });
        
        output += '\n \n Assertions: \n';
        specification.assertionResults.forEach(function (assertionResult) {
            output += '\n' + assertionResult;
        });
        return output;
    };

})(module.exports);