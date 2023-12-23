import Cookies from "js-cookie";
import axios from "axios";
import baseURL from "./debug";
import {
  SELECT_DICTIONARY,
  SELECT_DICTIONARY_FAIL,
  SELECT_MODULE,
  SELECT_MODULE_FAIL,
  GET_DICTIONARIES,
  GET_DICTIONARIES_FAIL,
  GET_MODULES,
  GET_MODULES_FAIL,
} from "./types";

export const get_dictionaries = () => async (dispatch) => {
  const config = {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(`${baseURL}/dictionaries`, config);

    if (res.data.error) {
      dispatch({ type: GET_DICTIONARIES_FAIL });
    } else {
      dispatch({ type: GET_DICTIONARIES, payload: res.data });
    }
  } catch (error) {
    dispatch({ type: GET_DICTIONARIES_FAIL });
  }
};

export const get_modules = () => async (dispatch) => {
  const config = {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(`${baseURL}/modules`, config);

    if (res.data.error) {
      dispatch({ type: GET_MODULES_FAIL });
    } else {
      dispatch({ type: GET_MODULES, payload: res.data });
    }
  } catch (error) {
    dispatch({ type: GET_MODULES_FAIL });
  }
};

export const select_dictionary = (dictionary) => async (dispatch) => {
  const config = {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({
    dictionary,
  });

  try {
    const res = await axios.put(`${baseURL}/select_dictionary`, config, body);

    if (res.data.error) {
      dispatch({ type: SELECT_DICTIONARY_FAIL });
    } else {
      dispatch({ type: SELECT_DICTIONARY, payload: res.data });
    }
  } catch (error) {
    dispatch({ type: SELECT_DICTIONARY_FAIL });
  }
};

export const select_module = (module) => async (dispatch) => {
  const config = {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({
    module,
  });

  try {
    const res = await axios.put(`${baseURL}/select_module`, body, config);

    if (res.data.error) {
      dispatch({ type: SELECT_MODULE_FAIL });
    } else {
      dispatch({ type: SELECT_MODULE, payload: res.data });
    }
  } catch (error) {
    dispatch({ type: SELECT_MODULE_FAIL });
  }
};
