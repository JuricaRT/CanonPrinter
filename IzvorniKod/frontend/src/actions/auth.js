import Cookies from 'js-cookie';
import axios from 'axios'
import { load_user } from './profile';
import baseURL from './debug';
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
} from './types';

export const checkAuthenticated = () => async dispatch => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${baseURL}/authenticated`, config);

        if (res.data.error || res.data.isAuthenticated === 'error') {
            dispatch({
                type: AUTHENTICATED_FAIL,
                isAuthenticatedPayload: false
            });
        }
        else if (res.data.isAuthenticated === 'success') {
            dispatch({
                type: AUTHENTICATED_SUCCESS,
                isAuthenticatedPayload: true
            });
        }
        else {
            dispatch({
                type: AUTHENTICATED_FAIL,
                isAuthenticatedPayload: false
            });
        }
    } catch(err) {
        dispatch({
            type: AUTHENTICATED_FAIL,
            isAuthenticatedPayload: false
        });
    }
};

export const login = (email, password) => async dispatch => {
    dispatch({
        type: LOGIN_FAIL,
        isAuthenticatedPayload: false,
        invalidEmailOrPasswordPayload: false
    })
    
    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${baseURL}/login`, body, config);

        if (res.data.success) {
            dispatch({
                type: LOGIN_SUCCESS,
                isAuthenticatedPayload: true,
                invalidEmailOrPasswordPayload: false
            });

            dispatch(load_user());
        } else {
            dispatch({
                type: LOGIN_FAIL,
                isAuthenticatedPayload: false,
                invalidEmailOrPasswordPayload: true
            });
        }
    } catch(err) {
        dispatch({
            type: LOGIN_FAIL,
            isAuthenticatedPayload: false,
            invalidEmailOrPasswordPayload: true
        });
    }
};

export const register = (email) => async dispatch => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({ email });

    try {
        const res = await axios.post(`${baseURL}/signup`, body, config);

        if (res.data.error) {
            dispatch({
                type: REGISTER_FAIL
            });
        } else {
            dispatch({
                type: REGISTER_SUCCESS
            });
        }
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL
        });
    }
};

export const logout = () => async dispatch => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({

    });

    try {
        const res = await axios.post(`${baseURL}/logout`, body, config);

        if (res.data.success) {
            dispatch({
                type: LOGOUT_SUCCESS
            });
        } else {
            dispatch({
                type: LOGOUT_FAIL
            });
        }
    } catch(err) {
        dispatch({
            type: LOGOUT_FAIL
        });
    }
};

export const delete_account = () => async dispatch => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({

    });

    try {
        const res = await axios.delete(`${baseURL}/delete_user`, config, body);

        if (res.data.success) {
            dispatch({
                type: DELETE_USER_SUCCESS
            });
        } else {
            dispatch({
                type: DELETE_USER_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_USER_FAIL
        });
    }
};