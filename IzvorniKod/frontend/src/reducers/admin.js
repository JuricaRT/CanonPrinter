import {
    ADD_ADMIN_FAILURE,
    ADD_ADMIN_FAILURE,
    GET_ADMIN_DATA_FAILURE,
    GET_ADMIN_DATA_SUCCESS,
    DELETE_USER_ADMIN_FAIL,
    DELETE_USER_ADMIN_SUCCESS,
    GET_STUDENT_DATA_FAILURE,
    GET_ADMIN_DATA_SUCCESS,
    REMOVE_ADMIN_SUCCESS,
    REMOVE_ADMIN_FAILURE,
    ADD_ADMIN_SUCCESS
} from './types';

const initialState = {

};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        default:
            return state
    };
};