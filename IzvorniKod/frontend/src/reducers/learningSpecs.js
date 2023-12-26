import {
  SELECT_DICTIONARY,
  SELECT_DICTIONARY_FAIL,
  START_LEARNING,
  START_LEARNING_FAIL,
  GET_DICTIONARIES,
  GET_DICTIONARIES_FAIL,
  SELECT_MODE,
  SELECT_MODE_FAIL,
} from "../actions/types";

const initialState = {
  dictionaries: [],
  language: null,
  selectedDictionary: null,
  selectedMode: null,
};

export default function learningSpecsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DICTIONARIES:
      return { ...state, dictionaries: action.payload };
    case GET_DICTIONARIES_FAIL:
      return state;
    case SELECT_DICTIONARY:
      return { ...state, selectedDictionary: action.payload };
    case SELECT_DICTIONARY_FAIL:
      return state;
    case SELECT_MODE:
      return { ...state, selectedMode: action.payload };
    case SELECT_MODE_FAIL:
      return state;
    case START_LEARNING:
      return { ...state }; // ovdje ce trebati dodati nešto kasnije
    case START_LEARNING_FAIL:
      return state;
    default:
      return state;
  }
}
