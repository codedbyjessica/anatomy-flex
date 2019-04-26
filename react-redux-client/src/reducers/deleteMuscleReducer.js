import {REDUX_ACTION_CONSTANTS} from '../constants/reduxActionConstants';

export default function(state = [], action) {
    switch (action.type) {
        case REDUX_ACTION_CONSTANTS.DELETE_MUSCLE:
            return action.data;
        case REDUX_ACTION_CONSTANTS.EDIT_MUSCLE:
            return action.data;
        default:
            return state;
    }
}