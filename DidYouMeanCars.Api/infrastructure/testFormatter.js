(function(testFormatter){
    
    testFormatter.formatSpecification = function (specification){
        var output = 'Specification: ' + specification.toString();
        output += '\n';
        output += 'Given that:';
        specification.given().forEach(function(event){
            output += '\t' + event.toString();
        });
        output += '\n';
        output += 'When ' + specification.when.toString();
        output += '\n';
        output += 'Expect that:';
        specification.expect().forEach(function(event){
            output += '\t' + event.toString();
        });
        return output;
    };

})(module.exports);