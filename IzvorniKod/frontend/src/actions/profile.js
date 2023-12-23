import Cookies from "js-cookie";
import axios from "axios";
import baseURL from "./debug";
import {
  LOAD_USER_PROFILE_SUCCESS,
  LOAD_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
} from "./types";

export const load_user = () => async (dispatch) => {
  const config = {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(`${baseURL}/profile`, config);

    if (res.data.error) {
      dispatch({
        type: LOAD_USER_PROFILE_FAIL,
      });
    } else {
      dispatch({
        type: LOAD_USER_PROFILE_SUCCESS,
        payload: res.data,
      });
    }
  } catch (error) {
    dispatch({
      type: LOAD_USER_PROFILE_FAIL,
    });
  }
};

export const update_profile =
  (username, password, _name, last_name, passwordSet) => async (dispatch) => {
    const config = {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const body = JSON.stringify({
      username,
      password,
      _name,
      last_name,
      passwordSet,
    });

    try {
      const res = await axios.put(`${baseURL}/edit_profile`, body, config);
      if (res.data.email) {
        dispatch({
          type: UPDATE_USER_PROFILE_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: UPDATE_USER_PROFILE_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: UPDATE_USER_PROFILE_FAIL,
      });
    }
  };

export const update_password = (password) => async (dispatch) => {
  const config = {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({
    password,
  });

  try {
    const res = await axios.put(`${baseURL}/update_pass`, body, config);
    if (res.data.email) {
      dispatch({
        type: UPDATE_USER_PROFILE_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: UPDATE_USER_PROFILE_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: UPDATE_USER_PROFILE_FAIL,
    });
  }
};
