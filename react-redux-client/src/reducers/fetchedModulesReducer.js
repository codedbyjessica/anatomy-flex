import {REDUX_ACTION_CONSTANTS} from '../constants/reduxActionConstants';

export default function(state = [], action) {
    switch (action.type) {
        case REDUX_ACTION_CONSTANTS.FETCH_MODULES:
        console.log('reducer', action.data)
            return action.data;
        case REDUX_ACTION_CONSTANTS.ADD_MODULE:
            return [action.data, ...state];
        default:
            return state;
    }
}