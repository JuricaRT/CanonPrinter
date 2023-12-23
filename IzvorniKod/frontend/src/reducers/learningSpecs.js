import {
  SELECT_DICTIONARY,
  SELECT_DICTIONARY_FAIL,
  SELECT_MODULE,
  SELECT_MODULE_FAIL,
  GET_DICTIONARIES,
  GET_DICTIONARIES_FAIL,
  GET_MODULES,
  GET_MODULES_FAIL,
} from "../actions/types";

const initialState = {
  dictionaries: [],
  selectedDictionary: null,
  modules: [],
  selectedModule: null,
};

export default function learningSpecsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DICTIONARIES:
      return { ...state, dictionaries: action.payload.dictionaries };
    case GET_DICTIONARIES_FAIL:
      return state;
    case SELECT_DICTIONARY:
      return { ...state, selectedDictionary: action.payload.dictionary };
    case SELECT_DICTIONARY_FAIL:
      return state;
    case GET_MODULES:
      return { ...state, modules: action.payload.modules };
    case GET_MODULES_FAIL:
      return state;
    case SELECT_MODULE:
      return { ...state, selectedModule: action.payload.module };
    case SELECT_MODULE_FAIL:
      return state;
    default:
      return state;
  }
}
