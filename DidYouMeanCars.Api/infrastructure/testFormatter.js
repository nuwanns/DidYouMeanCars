(function(testFormatter){

    testFormatter.print = function(specification){
        Console.WriteLine("Specification: " + specification.GetType().Name.Replace("_", ""));
        Console.WriteLine();
        Console.WriteLine("Given that:");
        specification.given().foreach(function(event){
            Console.WriteLine("\t" + event);
        });
        Console.WriteLine();
        Console.WriteLine("When " + specification.When());
        Console.WriteLine();
        Console.WriteLine("Expect that:");
        specification.expect().foreach(function(event){
            Console.WriteLine("\t" + event);
        });
    };

})(module.exports);