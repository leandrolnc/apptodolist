'use strict';

const Hapi=require('hapi');

const Ctrl=require('./controller/todoControl');

//import {addTask, updateTask} from './controller/todoControl';

const data = 
    [{
        id: 1,
        state: false,
        description: 'Tarefa 1',
        dateAdded: '2018-10-21T10:00:00'
    },
    {
        id: 2,
        state: true,
        description: 'Tarefa 2',
        dateAdded: '2018-10-22T10:00:00'
    },
    {
        id: 3,
        state: false,
        description: 'Tarefa 3',
        dateAdded: '2018-10-23T10:00:00'
    }
    ];

// Create a server with a host and port
const server= new Hapi.server({
    host:'localhost',
    port:8000,
    routes: {cors: true}
});


server.inject({method: 'OPTIONS', url:'/', headers: {
    origin: '*',
    'access-control-request-method': 'GET',
    'access-control-request-headers': '',
    'access-control-allow-Origin': '*'
}}, (res) => {

    console.log(res.headers);
    console.log(res.payload);
    console.log(res.statusCode);
});



// Add the route
server.route({
    method:'GET',
    path:'/hello',
    handler:function(request,h) {

        return'hello world';
    }
});

// GET TODOS
server.route({
    method:'GET',
    path:'/todos',
    handler:function(request,h) {
        return h.response(data).code(200);
    }
});

//PUT TODO
server.route({
    method:'PUT',
    path:'/todos',
    handler:function(request,h) {
        return h.response(Ctrl.addTask(data, request.payload)).code(200);
    }
});

//PATCH TODO
server.route({
    method:'PATCH',
    path:'/todo/{id}',
    handler:function(request,h) {

        let statusCode = 200;
        let task = {};

        try{
            task = Ctrl.updateTask(data, request.payload, request.params.id);
        }
        catch(error){
            switch(error){
                case 'NOTFOUND': statusCode = 404; break;
                case 'BADREQUEST': statusCode = 400; break;
                default: statusCode = 500; task.error = error;
            }
        }

        return h.response(task).code(statusCode);
    }
});

//DELETE TODO
server.route({
    method:'DELETE',
    path:'/todo/{id}',
    handler:function(request,h) {

        let statusCode = 200;
        let task = {};

        try{
            task = Ctrl.deleteTask(data, request.params.id);
        }
        catch(error){
            switch(error){
                case 'NOTFOUND': statusCode = 404; break;
                default: statusCode = 500; task.error = error;
            }
        }

        return h.response(task).code(statusCode);
    }
});

// Start the server
async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();