import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addTask = (task) => ({
    type: ActionTypes.ADD_TASK,
    payload: task
});

export const postTask = (description) => (dispatch) => {

    const newTask = {
        description: description
    };
    
    return fetch(baseUrl + 'todos', {
        method: "PUT",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => dispatch(addTask(response)))
    .catch(error =>  { console.log('post task', error.message); alert('Your task could not be posted\nError: '+error.message); });
};

export const fetchTasks = (filter, orderBy) => (dispatch) => {

    dispatch(tasksLoading(true));

    let url = baseUrl + 'todos';
    if(filter) url = url+'?filter=' + filter;
    url = url + (filter && orderBy ? '&' : '?');
    if(orderBy) url += 'orderBy=' + orderBy;

    console.log('filter: ' + filter);
    console.log('orderBy: ' + orderBy);
    console.log(url);

    return fetch(url, {
      crossDomain:true})
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(tasks => dispatch(addTasks(tasks)))
    .catch(error => dispatch(tasksFailed(error.message)));
}

export const tasksLoading = () => ({
    type: ActionTypes.TASKS_LOADING
});

export const tasksFailed = (errmess) => ({
    type: ActionTypes.FAILED_TASK,
    payload: errmess
});

export const addTasks = (tasks) => ({
    type: ActionTypes.ADD_TASKS,
    payload: tasks
});

export const refreshTask = (task) =>({
    type: ActionTypes.REFRESH_TASK,
    payload: task
});

export const deleteTaskId = (id) =>({
  type: ActionTypes.DELETE_TASK,
  payload: id
});

export const updateTask = (task => (dispatch) => {

    let obj = {};
    if(task.description != undefined) obj.description = task.description;
    if(task.state != undefined) obj.state = task.state;

    return fetch(baseUrl + 'todo/' + task.id, {
        method: "PATCH",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(task => dispatch(refreshTask(task)))
    .catch(error =>  { console.log('edit task', error.message); alert('Your task could not be saved\nError: '+error.message); });
});

export const deleteTask = (id => (dispatch) => {

    return fetch(baseUrl + 'todo/' + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "text/html"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return id;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(id => dispatch(deleteTaskId(id)))
    .catch(error =>  { console.log('delete task', error.message); alert('Your task could not be deleted\nError: '+error.message); });
});