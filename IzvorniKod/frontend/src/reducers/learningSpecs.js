import {
  SELECT_DICTIONARY,
  SELECT_DICTIONARY_FAIL,
  START_LEARNING,
  START_LEARNING_FAIL,
  GET_DICTIONARIES,
  GET_DICTIONARIES_FAIL,
  SELECT_MODE,
  SELECT_MODE_FAIL,
  SELECT_LANGUAGE,
  CLOSE_ADDING_WORD,
  SELECT_LANGUAGE_VIEW,
  SELECT_DICTIONARY_VIEW,
  CLOSE_VIEW_DICTIONARY,
  FINISH_LEARNING,
} from "../actions/types";

const initialState = {
  dictionaries: [], // used by: ModifyDictionaries.js
  uniqueLang: null, // used by: ModifyDictionaries.js
  language: null,
  selectedDictionary: null,
  selectedMode: null,
  languageView: null,
  selectedDictionaryView: null,
};

export default function learningSpecsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DICTIONARIES:
      return {
        ...state,
        dictionaries: action.payload,
        uniqueLang: [
          ...new Set(
            Object.keys(action.payload)
              .filter((key) => Array.isArray(action.payload[key]))
              .map((key) => key) //.toLowerCase()
          ),
        ],
      };
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
      return state; // ovdje ce trebati dodati nešto kasnije
    case START_LEARNING_FAIL:
      return state;
    case SELECT_LANGUAGE:
      return { ...state, language: action.payload };
    case CLOSE_ADDING_WORD:
      return { ...state, selectedDictionary: null, language: null };
    case SELECT_LANGUAGE_VIEW:
      return { ...state, languageView: action.payload };
    case SELECT_DICTIONARY_VIEW:
      return { ...state, selectedDictionaryView: action.payload };
    case CLOSE_VIEW_DICTIONARY:
      return { ...state, selectedDictionaryView: null, languageView: null };
    case FINISH_LEARNING:
      return {
        ...initialState,
        // dictionaries: state.dictionaries,
        // uniqueLang: state.uniqueLang,
      };
    default:
      return state;
  }
}
