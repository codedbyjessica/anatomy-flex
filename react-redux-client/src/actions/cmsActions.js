import axios from 'axios';
import {REDUX_ACTION_CONSTANTS} from '../constants/reduxActionConstants';
const ROOT_URL = " http://localhost:3001/api/muscles";

export function fetchMuscles(onSuccess, onFailure) {
    return (dispatch) => {
        return axios.get(ROOT_URL)
            .then(response => {
                dispatch({
                    type: REDUX_ACTION_CONSTANTS.FETCH_MUSCLES,
                    data: response.data
                })
                if (onSuccess) {
                    onSuccess(response.data)
                }
            })
            .catch(error => {
                if (onFailure && error.data) {
                    onFailure(error.data)
                }
            });
    }
}

export function addMuscle(values, onSuccess, onFailure) {
    const finalValues = {
        group: values.group,
        displayName: values.name ? values.name.toLowerCase() : null,
        name: values.name ? values.name.replace(/\s+/g, '-') : null,
        origin: values.origin ? values.origin.toLowerCase() : null,
        insertion: values.insertion ? values.insertion.toLowerCase() : null,
        nerve: values.nerve ? values.nerve.toLowerCase() : null,
        function: values.muscleFunction ? values.muscleFunction.toLowerCase() : null
    }
    return (dispatch) => {
        dispatch({
            type: REDUX_ACTION_CONSTANTS.LOADING_IN_PROGRESS,
            data: {
                message: "loading"
            }
        });
        // spinnerTimeout(dispatch);
        return axios.post(`${ROOT_URL}/new`, finalValues)
            .then(response => {
                dispatch({
                    type: REDUX_ACTION_CONSTANTS.ADD_MUSCLE,
                    data: response.data
                });
                onSuccess(response.data);
            }).catch(error => {
                if (onFailure && error.data) {
                    onFailure(error.data)
                }
            }).then(() => {
                dispatch({
                    type: REDUX_ACTION_CONSTANTS.LOADING_COMPLETE
                });
            });
    }
}