import {
    ADD_ADMIN_FAILURE,
    ADD_ADMIN_SUCCESS,
    GET_ADMIN_DATA_FAILURE,
    GET_ADMIN_DATA_SUCCESS,
    DELETE_USER_ADMIN_FAIL,
    DELETE_USER_ADMIN_SUCCESS,
    GET_STUDENT_DATA_FAILURE,
    GET_STUDENT_DATA_SUCCESS,
    REMOVE_ADMIN_SUCCESS,
    REMOVE_ADMIN_FAILURE,
} from '../actions/types';

const initialState = {
    students: [],
    admins: [],
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_ADMIN_DATA_SUCCESS:
            return {
                ...state,
                admins: JSON.parse(payload.admins),
            }
        case DELETE_USER_ADMIN_SUCCESS:
        case GET_STUDENT_DATA_SUCCESS:
            return {
                ...state,
                students: JSON.parse(payload.students),
            }
        case ADD_ADMIN_SUCCESS:
        case REMOVE_ADMIN_SUCCESS:
            return {
                ...state,
                admins: JSON.parse(payload.admins),
                students: JSON.parse(payload.students),
            }
        case GET_ADMIN_DATA_FAILURE:
            return {
                ...state,
                admins: [],
            }
        case GET_STUDENT_DATA_FAILURE:
            return {
                ...state,
                students: [],
            }
        case ADD_ADMIN_FAILURE:
        case REMOVE_ADMIN_FAILURE:
        case DELETE_USER_ADMIN_FAIL:
            return {
                ...state
            }
        default:
            return state
    };
};