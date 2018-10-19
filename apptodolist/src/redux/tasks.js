import * as ActionTypes from './ActionTypes';
import { actions, actionTypes } from 'react-redux-form';


export const Tasks = (state = {isLoading: true, 
    errMess: null,
    tasks: []},
    action) => {
    switch(action.type){
        
        case ActionTypes.ADD_TASKS:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                tasks: action.payload
            };

        case ActionTypes.ADD_TASK:
            let tsk = action.payload;
            return {
                ...state,
                isLoading: false,
                errMess: null,
                tasks: state.tasks.concat(tsk)
            };            

        case ActionTypes.EDIT_TASK:
            return {
                ...state,
                isLoading: true,
                errMess: null,
                task: action.payload
            };

        case ActionTypes.DELETE_TASK:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload
            };
        

        default:
            return state;
    }
}