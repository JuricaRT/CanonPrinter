import Cookies from "js-cookie";
import axios from "axios";
import baseURL from "./debug";
import {
  SELECT_DICTIONARY,
  SELECT_DICTIONARY_FAIL,
  SELECT_MODE,
  SELECT_MODE_FAIL,
  GET_DICTIONARIES,
  GET_DICTIONARIES_FAIL,
  GET_MODES,
  GET_MODES_FAIL,
  START_LEARNING_FAIL,
  START_LEARNING,
} from "./types";
import { useSelector } from "react-redux";

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

export const select_dictionary = (dictionary) => async (dispatch) => {
  dispatch({ type: SELECT_DICTIONARY, payload: dictionary });

  // const config = {
  //   withCredentials: true,
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //     "X-CSRFToken": Cookies.get("csrftoken"),
  //   },
  // };

  // const body = JSON.stringify({
  //   dictionary,
  // });

  // try {
  //   const res = await axios.put(`${baseURL}/select_dictionary`, config, body);

  //   if (res.data.error) {
  //     dispatch({ type: SELECT_DICTIONARY_FAIL });
  //   } else {
  //     dispatch({ type: SELECT_DICTIONARY, payload: dictionary });
  //   }
  // } catch (error) {
  //   dispatch({ type: SELECT_DICTIONARY_FAIL });
  // }
};

export const start_learning = (mode) => async (dispatch) => {
  const dict = useSelector((state) => state.learningSpecs.dictionary);
  const lang = useSelector((state) => state.learningSpecs.language);

  const config = {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({
    dict,
    lang,
    mode,
  });

  try {
    const res = await axios.get(`${baseURL}/start_learning`, body, config);

    if (res.data.error) {
      dispatch({ type: START_LEARNING_FAIL });
      dispatch({ type: SELECT_MODE_FAIL, payload: mode });
    } else {
      dispatch({ type: START_LEARNING, payload: res.data });
      dispatch({ type: SELECT_MODE, payload: mode });
    }
  } catch (error) {
    dispatch({ type: START_LEARNING_FAIL });
    dispatch({ type: SELECT_MODE_FAIL, payload: mode });
  }
};
