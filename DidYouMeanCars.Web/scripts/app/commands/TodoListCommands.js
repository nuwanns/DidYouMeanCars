function CreateTodoListCommand(name){
    var self = this;
    self.name = name;
}

function RenameTodoListCommand(newName){
    var self = this;
    self.newName = newName;
}

function ArchiveTodoListCommand(){
    
}