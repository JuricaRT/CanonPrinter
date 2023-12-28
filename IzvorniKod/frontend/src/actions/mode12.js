import Cookies from "js-cookie";
import axios from "axios";
import baseURL from "./debug";

import {
  GET_SESSION,
  GET_SESSION_FAIL,
  INITIALIZE_SESSION,
  INITIALIZE_SESSION_FAIL,
} from "./types";

export const initializeSession = (dict, lang, mode) => async (dispatch) => {
  const config = {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({
    dict_name: dict,
    language: lang,
    mode: 0,
  });

  try {
    const res = await axios.post(`${baseURL}/initialize_session`, body, config);

    if (res.data.error) {
      dispatch({ type: INITIALIZE_SESSION_FAIL });
    } else {
      dispatch({ type: INITIALIZE_SESSION, payload: res.data });
    }
  } catch (error) {
    dispatch({ type: INITIALIZE_SESSION_FAIL });
  }
};

export const getSession = () => async (dispatch) => {
  const config = {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  try {
    const res = await axios.get(`${baseURL}/get_session`, config);

    if (res.data.error) {
      dispatch({ type: GET_SESSION_FAIL });
    } else {
      dispatch({ type: GET_SESSION, payload: res.data });
    }
  } catch (error) {
    dispatch({ type: GET_SESSION_FAIL });
  }
};
