import axios from 'axios';
import {REDUX_ACTION_CONSTANTS} from '../constants/reduxActionConstants';
const ROOT_URL = " http://localhost:3001/api/modules";

export function fetchModules(onSuccess, onFailure) {
    return (dispatch) => {
        return axios.get(ROOT_URL)
            .then(response => {
                dispatch({
                    type: REDUX_ACTION_CONSTANTS.FETCH_MODULES,
                    data: response.data
                })
                console.log('response', response, onSuccess)
                if (onSuccess) {
                    onSuccess(response.data)
                    console.log('ACTION RESPONSE', Response.data)
                }
            })
            .catch(error => {
                if (onFailure && error.data) {
                    onFailure(error.data)
                }
            });
    }
}

export function addModule(values, onSuccess, onFailure) {
    const finalValues = {
        group: values.group,
        displayName: values.name ? values.name.toLowerCase() : null,
        name: values.name ? values.name.replace(/\s+/g, '-') : null,
        origin: values.origin ? values.origin.toLowerCase() : null,
        insertion: values.insertion ? values.insertion.toLowerCase() : null,
        nerve: values.nerve ? values.nerve.toLowerCase() : null,
        function: values.moduleFunction ? values.moduleFunction.toLowerCase() : null
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

export function editModule(item, onSuccess, onFailure) {
    return (dispatch) => {
        return axios.put(`${ROOT_URL}/${item._id}`, item)
            .then(response => {
                dispatch({
                    type: REDUX_ACTION_CONSTANTS.EDIT_MUSCLE,
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

export function deleteModule(id, onSuccess, onFailure) {
    return (dispatch) => {
        return axios.delete(`${ROOT_URL}/${id}`)
            .then(response => {
                dispatch({
                    type: REDUX_ACTION_CONSTANTS.DELETE_MUSCLE,
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