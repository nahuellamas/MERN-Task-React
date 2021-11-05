import {GET_TASKS, 
        ADD_TASK,
        VALIDATE_TASK,
        DELETE_TASK,
        ACTUAL_TASK,
        UPDATE_TASK
        } from   '../../types';

//Aque tenemos las condiciones de nuestro State
const taskReducer = (state, action) => {
    switch (action.type) {
        
        case GET_TASKS:
            return {
                ...state,
                taskproyect: action.payload
            }
        case ADD_TASK:
            return {
                ...state,
                taskproyect: [action.payload, ...state.taskproyect],
                taskerror: false
            }
        case VALIDATE_TASK:
            return {
                ...state,
                taskerror: true
            }
        case DELETE_TASK:
            return {
                ...state,
                taskproyect: state.taskproyect.filter(task => task._id !== action.payload)
            }
        case UPDATE_TASK:
            return {
                ...state,
                taskproyect: state.taskproyect.map(task => task._id === action.payload._id ? action.payload : task)
            }
        case ACTUAL_TASK:
            return {
                ...state,
                selectedtask: action.payload
            }
        
        default: 
            return state;
    }
}
export default taskReducer;