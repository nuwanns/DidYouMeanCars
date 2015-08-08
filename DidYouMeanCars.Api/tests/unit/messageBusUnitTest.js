var messageBus = require("../../infrastructure/messageBus"),
    TodoList = require("../../domain/TodoList"), chai = require("chai"), expect = chai.expect,
    sinon = require('sinon'), callback = sinon.spy(), createHandler = sinon.spy(), publishHandler = sinon.spy();

describe("messageBus", function () {   
    beforeEach(function () {
        messageBus.registerHandler('CreateTodoList', createHandler);
    });

    it('should send message to the registered handler', function () {     
        messageBus.send('CreateTodoList', {
            todoItemId : req.body.todoItemId, 
            dueDate : req.body.dueDate, 
            todoListId : req.body.todoListId
        }, callback);
        
        expect(callback).to.have.been.called();
        expect(createHandler).to.have.been.called();
    });
    
    it("should multicast messages to handlers", function () {
        messageBus.registerHandler('CreateTodoList', publishHandler); // add another handler for the same event
           
        var todoListCreatedEvent = new TodoList.TodoListCreated('1111', 'My List');
        messageBus.publish(todoListCreatedEvent);
        
        expect(createHandler).to.have.been.called();
        expect(publishHandler).to.have.been.called();
    });
});
