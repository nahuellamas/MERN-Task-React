import {useReducer} from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import clientAxios from '../../config/Axios';
import {GET_TASKS,
        ADD_TASK,
        VALIDATE_TASK,
        DELETE_TASK,
        ACTUAL_TASK,
        UPDATE_TASK,
    } from   '../../types';

const TaskState = props => {

    const initialState = {
        taskproyect: [],
        taskerror: false,
        selectedtask: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(TaskReducer, initialState);

    //Actions
    const getTask = async proyect => {
        try {
            const response = await clientAxios.get('http://localhost:5000/api/task', {params: {proyect}});
            console.log(response);
            dispatch({
                type: GET_TASKS,
                payload: response.data.tasks
            })
        } catch (error) {
            console.log(error);
        }
    }

    const addTask = async task => {
        console.log(task);
        try {
            const response = await clientAxios.post('http://localhost:5000/api/task', task);
            console.log(response);
            dispatch({
                type: ADD_TASK,
                payload: task
            })
        } catch (error) {
            console.log(error);
        }
    }

    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK
        })
    }

    const deleteTask = async (id, proyect) => {
       try {
        await clientAxios.delete(`http://localhost:5000/api/task/${id}`, {params: {proyect}}); 
        dispatch({
            type: DELETE_TASK,
            payload: id
        })
       } catch (error) {
           console.log(error);
       }
    } 


    const actualtask = task => {
        dispatch({
            type: ACTUAL_TASK,
            payload: task
        })
    }

    const updateTask = async task => {
        try {
            const response = await clientAxios.put(`http://localhost:5000/api/task/${task._id}`, task);
            dispatch({
            type: UPDATE_TASK,
            payload: response.data.actualTask
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TaskContext.Provider
            value={{
                getTask,
                taskproyect: state.taskproyect,
                addTask,
                taskerror: state.taskerror,
                validateTask,
                deleteTask,
                actualtask,
                selectedtask: state.selectedtask,
                updateTask
            }}>
            {props.children}
        </TaskContext.Provider>
    )
}


export default TaskState;