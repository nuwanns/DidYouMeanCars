(function(testFormatter){
    
    testFormatter.formatSpecification = function (specification){
        var output = 'Specification: ' + specification.getType().name.replace('_', '');
        output += '\n';
        output += 'Given that:';
        specification.given().foreach(function(event){
            output += '\t' + event;
        });
        output += '\n';
        output += 'When ' + specification.When();
        output += '\n';
        output += 'Expect that:';
        specification.expect().foreach(function(event){
            output += '\t' + event;
        });
        return output;
    };

})(module.exports);