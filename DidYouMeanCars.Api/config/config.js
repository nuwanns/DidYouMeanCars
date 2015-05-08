var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        port: process.env.PORT || 80
    },
    eventStoreUrl : 'http://127.0.0.1:2113/streams/',
    streams: {
        todoList : 'todolist'
    }
}