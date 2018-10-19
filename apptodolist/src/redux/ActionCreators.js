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
    
    return fetch(baseUrl + 'newtask', {
        method: "POST",
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

export const fetchTasks = () => (dispatch) => {

    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'tasks')
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
    .then(dishes => dispatch(addTasks(tasks)))
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

