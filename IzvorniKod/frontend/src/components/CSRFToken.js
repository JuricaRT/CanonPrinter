import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '../actions/debug';
import Cookies from 'js-cookie';

//TODO proc po ovom

const CSRFToken = () => {
    const [csrftoken, setcsrftoken] = useState('');

    const getCookie = (name) => {
        /*let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        console.log(Cookies.get('csrftoken'));
        console.log(cookieValue);*/
        return Cookies.get('csrftoken');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(`${baseURL}/csrf_cookie`, {withCredentials: true});
            } catch (err) {

            }
        };
        fetchData();
        setcsrftoken(getCookie('csrftoken'));
    }, []);

    return (
        <input type='hidden' name='csrfmiddlewaretoken' value={csrftoken} />
    );
};

export default CSRFToken;