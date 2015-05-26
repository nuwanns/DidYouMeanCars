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
        
        output += 'Assertions: \n';
        var assertions = ['Assertion 1 is true', 'Assertion 2 is true'];
        assertions.forEach(function (assertion) {
            output += '\n' + assertion;
        });
        return output;
    };

})(module.exports);