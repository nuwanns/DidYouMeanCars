describe('Todo list', function () {
    it('should return results', function () {
        
        element(by.id('todoListMenuItem')).click();      
        expect(element
            .all(by.repeater('todoList in todoLists'))
            .count())
            .greaterThan(1);
        
    });
});