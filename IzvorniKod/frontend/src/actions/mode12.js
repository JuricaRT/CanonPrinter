import Cookies from "js-cookie";
import axios from "axios";
import baseURL from "./debug";
import modes from "./modes";

import {
  GET_SESSION,
  GET_SESSION_FAIL,
  INITIALIZE_SESSION,
  INITIALIZE_SESSION_FAIL,
  ANSWER_QUESTION,
  ANSWER_QUESTION_FAIL,
  DESTROY_SESSION,
  DESTROY_SESSION_FAIL,
  GET_AUDIO_FILE_FAIL,
  GET_AUDIO_FILE_SUCCESS,
  SESSION_EXISTS_FAIL,
  SESSION_EXISTS_SUCCESS
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

  let modeNum = null;
  if (mode === modes["mode1"]) {
    modeNum = 0;
  } else if (mode === modes["mode2"]) {
    modeNum = 1;
  } else if (mode === modes["mode3"]) {
    modeNum = 2;
  } else if (mode === modes["mode4"]) {
    modeNum = 3;
  }

  const body = JSON.stringify({
    dict_name: dict,
    language: lang,
    mode: modeNum,
  });

  try {
    const res = await axios.post(`${baseURL}/initialize_session`, body, config);

    if (res.data.error) {
      dispatch({ type: INITIALIZE_SESSION_FAIL });
    } else {
      console.log('il ovdje?');
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

export const answerQuestion = (answer) => async (dispatch) => {
  const config = {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({
    answer: answer,
  });

  try {
    const res = await axios.post(`${baseURL}/answer_question`, body, config);

    if (res.data.error) {
      dispatch({ type: ANSWER_QUESTION_FAIL });
    } else {
      if (res.data.answer_correct === "yes") {
        dispatch({ type: ANSWER_QUESTION, payload: "yes" });
      } else if (res.data.answer_correct === "yes") {
        dispatch({ type: ANSWER_QUESTION, payload: "no" });
      } else {
        dispatch({ type: ANSWER_QUESTION, payload: res.data.answer_correct });
      }
    }
  } catch (error) {
    dispatch({ type: ANSWER_QUESTION_FAIL });
  }
};

export const answerQuestion2 = () => async (dispatch) => {
  const config = {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  try {
    const res = await axios.post(`${baseURL}/answer_question`, config);

    if (res.data.error) {
      dispatch({ type: ANSWER_QUESTION_FAIL });
    } else {
      dispatch({ type: ANSWER_QUESTION, payload: res.data });
    }
  } catch (error) {
    dispatch({ type: ANSWER_QUESTION_FAIL });
  }
};

export const destroySession = () => async (dispatch) => {
  const config = {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  try {
    const res = await axios.get(`${baseURL}/destroy_session`, config);

    if (res.data.error) {
      dispatch({ type: DESTROY_SESSION_FAIL });
    } else {
      dispatch({ type: DESTROY_SESSION });
    }
  } catch (error) {
    dispatch({ type: DESTROY_SESSION_FAIL });
  }
};

export const getAudioFile = (word) => async (dispatch) => {
  const config = {
    withCredentials: true,
    responseType: 'blob',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };
  const body = JSON.stringify({ word: word });
  try {
    const res = await axios.put(`${baseURL}/get_word_audio`, body, config);
    dispatch({
      type: GET_AUDIO_FILE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: GET_AUDIO_FILE_FAIL });
  }
};

export const session_exists = () => async (dispatch) => {
  const config = {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(`${baseURL}/session_exists`, config);

    if (res.data.error) {
      dispatch({ type: SESSION_EXISTS_FAIL });
    } else {
      dispatch({ type: SESSION_EXISTS_SUCCESS, payload: res.data.session_exists });
    }
  } catch (error) {
    dispatch({ type: SESSION_EXISTS_FAIL });
  }
};
