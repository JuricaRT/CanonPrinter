import Cookies from 'js-cookie';
import axios from 'axios'
import baseURL from './debug';
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
} from './types';

export const delete_account = (email) => async dispatch => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({
        'withCredentials': true,
        email
    });

    try {
        const res = await axios.put(`${baseURL}/delete_user_admin`, config, body);

        if (res.data.success) {
            dispatch({
                type: DELETE_USER_ADMIN_SUCCESS
            });
        } else {
            dispatch({
                type: DELETE_USER_ADMIN_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_USER_ADMIN_FAIL
        });
    }
};

export const get_students = () => async dispatch => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.get(`${baseURL}/get_students`, config);

        if (res.data.error) {
            dispatch({
                type: GET_STUDENT_DATA_FAILURE
            });
        } else {
            dispatch({
                type: GET_STUDENT_DATA_SUCCESS,
                payload: res.data
            });
        }
    } catch(error) {
        dispatch({
            type: GET_STUDENT_DATA_FAILURE
        });
    }
};

export const get_admins = () => async dispatch => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.get(`get_admins`, config);

        if (res.data.error) {
            dispatch({
                type: GET_ADMIN_DATA_FAILURE
            });
        } else {
            dispatch({
                type: GET_ADMIN_DATA_SUCCESS,
                payload: res.data
            });
        }
    } catch(error) {
        dispatch({
            type: GET_ADMIN_DATA_FAILURE
        });
    }
};

export const remove_admin = (email) => async dispatch => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({
       'withCredentials': true,
       email,
    });
    
    try {
        const res = await axios.put(`remove_admin`, body, config); 

    if (res.data.profile && res.data.email) {
        dispatch({
            type: REMOVE_ADMIN_SUCCESS,
            payload: res.data
        });
    } else {
        dispatch({
            type: REMOVE_ADMIN_FAILURE
        });
    }
    } catch (err) {
        dispatch({
            type: REMOVE_ADMIN_FAILURE
        });
    }
};

export const add_admin = (email) => async dispatch => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({
       'withCredentials': true,
       email,
    });
    
    try {
        const res = await axios.put(`add_admin`, body, config); 

    if (res.data.profile && res.data.email) {
        dispatch({
            type: ADD_ADMIN_SUCCESS,
            payload: res.data
        });
    } else {
        dispatch({
            type: ADD_ADMIN_FAILURE
        });
    }
    } catch (err) {
        dispatch({
            type: ADD_ADMIN_FAILURE
        });
    }
};