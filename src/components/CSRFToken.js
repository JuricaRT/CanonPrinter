import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '../actions/debug';
import Cookies from 'js-cookie';

const CSRFToken = () => {
    const [csrftoken, setcsrftoken] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(`${baseURL}/csrf_cookie`, {withCredentials: true});
            } catch (err) {

            }
        };
        fetchData();
        setcsrftoken(Cookies.get('csrftoken'));
    }, []);

    return (
        <input type='hidden' name='csrfmiddlewaretoken' value={csrftoken} />
    );
};

export default CSRFToken;