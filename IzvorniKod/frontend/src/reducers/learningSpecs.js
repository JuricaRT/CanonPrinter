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
  dictionaries: null, // used by: ModifyDictionaries.js, MainScreen.js
  learnableDictionaries: null, // used by: MainScreen.js
  uniqueLang: null, // used by: ModifyDictionaries.js, MainScreen.js
  learnableLanguages: null, // used by: MainScreen.js
  language: null,
  selectedDictionary: null,
  selectedMode: null, // used by: MainScreen.js
  languageView: null, // not used
  selectedDictionaryView: null, // not used
};

export default function learningSpecsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DICTIONARIES:
      let learnable = {}
      let all = {}
      
      for (const [lang, dictsInLang] of Object.entries(action.payload)) {
        let currentLangLearnable = []
        let currentLangAll = []

         for (const dict of dictsInLang) {
          if (dict.isLearnable) {
            currentLangLearnable.push(dict.dict_name)
          }
          currentLangAll.push(dict.dict_name)
        }
        
        if (currentLangLearnable.length > 0) learnable[lang] = currentLangLearnable
        all[lang] = currentLangAll
      }

      return {
        ...state,
        dictionaries: all,
        learnableDictionaries: learnable,
        uniqueLang: Object.keys(all),
        learnableLanguages: Object.keys(learnable)
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
