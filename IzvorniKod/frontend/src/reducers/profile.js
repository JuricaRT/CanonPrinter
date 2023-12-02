import {
    LOAD_USER_PROFILE_SUCCESS,
    LOAD_USER_PROFILE_FAIL,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAIL
} from '../actions/types';

const initialState = {
    email: '',
    username: '',
    name: '',
    last_name: '',
    is_admin: null,
    has_initial_pass: null,
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case LOAD_USER_PROFILE_SUCCESS:
        case UPDATE_USER_PROFILE_SUCCESS:
            return {
                ...state,
                email: payload.email,
                username: payload.username,
                name: payload.profile.name,
                last_name: payload.profile.last_name,
                is_admin: null,
                has_initial_pass: null,
            }
        case LOAD_USER_PROFILE_FAIL:
            return {
                ...state,
                email: '',
                username: '',
                name: '',
                last_name: '',
                is_admin: null,
                has_initial_pass: null,
            }
        case UPDATE_USER_PROFILE_FAIL:
            return {
                ...state
            }
        default:
            return state
    };
};