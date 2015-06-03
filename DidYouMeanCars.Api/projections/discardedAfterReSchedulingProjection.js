fromCategory("todolist").
    foreachStream().
    when({
    $init : function () {
        return {
            reSheduledTime : null
        };
    },
    TodoItemReScheduled : function (s, e) {
        s.reScheduledTime = e.body.happenedOn;
    },
    TodoItemDiscarded : function (s, e) {
        if (new Date(s.reScheduledTime).setMinutes(2) < new Date(e.body.happenedOn)) {
            emit("DiscardedAfterReSchedulingStream", 
                            "DiscardedAfterReScheduling",
                            {
                "todoItemId" : e.body.todoItemId,
                "todoItemName" : e.body.todoItemName,
                "todoListId" : e.body.todoListId,
                "todoListName": e.body.todoListName
            }
            );
        }
    }
});