'use strict';

const Hapi=require('hapi');
const Joi=require('joi');

const Ctrl=require('./controller/todoControl');

//import {addTask, updateTask} from './controller/todoControl';

let data = 
    [{
        id: 1,
        description: 'Tarefa 1',
        dateAdded: '2018-10-21T10:00:00',
        state: false
    },
    {
        id: 2,
        description: 'Tarefa 2',
        dateAdded: '2018-10-22T10:00:00',
        state: true
    },
    {
        id: 3,
        description: 'Tarefa 3',
        dateAdded: '2018-10-23T10:00:00',
        state: false
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



// GET TODOS
server.route({
    method:'GET',
    path:'/todos',
    handler:function(request,h) {
        let tasks = Ctrl.filterTasks(data,request.query.filter, request.query.orderBy);
        return h.response(tasks).code(200);
    }
});

//PUT TODO
server.route({
    method:'PUT',
    path:'/todos',
    handler:function(request,h) {
        return h.response(Ctrl.addTask(data, request.payload)).code(200);
    },
    options: {
        validate: {
            payload: {
                description: Joi.string().min(1).max(100)
            }
        }
    }
});

//PATCH TODO
server.route({
    method:'PATCH',
    path:'/todo/{id}',
    handler:function(request,h) {

        let statusCode = {code: 200};
        let task = {};

        
        task = Ctrl.updateTask(data, request.payload, request.params.id, statusCode);
       
        return h.response(task).code(statusCode.code);
    },
    options: {
        validate: {
            params: {
                id: Joi.number().integer().min(1)
            }
        }
    }
});

//DELETE TODO
server.route({
    method:'DELETE',
    path:'/todo/{id}',
    handler:function(request,h) {

        let statusCode = {code: 200};
        let tasks = {};
 
        tasks = Ctrl.deleteTask(data, request.params.id, statusCode);
        data = tasks;
 
        return h.response({}).code(statusCode.code);
    },
    options: {
        validate: {
            params: {
                id: Joi.number().integer().min(1)
            }
        }
    }
});

// Start the server
async function start() {

    try {
        await server.register([require('vision'), require('inert'), require('lout')]);
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();