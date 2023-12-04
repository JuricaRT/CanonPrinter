import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL
} from '../actions/types';

const initialState = {
    isAuthenticated: null,
    invalidEmailOrPassword: false
};

export default function(state = initialState, action) {
    const { type, isAuthenticatedPayload, invalidEmailOrPasswordPayload} = action;

    switch(type) {
        case AUTHENTICATED_SUCCESS:
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: isAuthenticatedPayload,
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
            }
        case LOGIN_SUCCESS:
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: isAuthenticatedPayload,
                invalidEmailOrPassword: invalidEmailOrPasswordPayload
            }
        case LOGOUT_SUCCESS:
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
            }
        case REGISTER_FAIL:
        case LOGOUT_FAIL:
        case DELETE_USER_FAIL:
            return state
        default:
            return state
    };
};