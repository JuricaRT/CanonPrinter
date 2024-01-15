import {
  ADD_ADMIN_FAILURE,
  ADD_ADMIN_SUCCESS,
  GET_ADMIN_DATA_FAILURE,
  GET_ADMIN_DATA_SUCCESS,
  DELETE_USER_ADMIN_FAIL,
  DELETE_USER_ADMIN_SUCCESS,
  GET_STUDENT_DATA_FAILURE,
  GET_STUDENT_DATA_SUCCESS,
  REMOVE_ADMIN_SUCCESS,
  REMOVE_ADMIN_FAILURE,
  ADD_DICTIONARY_SUCCESS,
  ADD_DICTIONARY_FAILURE,
  ADD_WORD_SUCCESS,
  ADD_WORD_FAILURE,
  REMOVE_WORD_SUCCESS,
  REMOVE_WORD_FAILURE,
  GET_DICTIONARY_WORDS_FAIL,
  GET_DICTIONARY_WORDS_SUCCESS,
  CLOSE_VIEW_DICTIONARY_ADMIN,
  EDIT_WORD_FAIL,
  EDIT_WORD_SUCCESS,
  REMOVE_WORD_FROM_REDUCER_STATE,
  UPDATE_WORD_IN_REDUCER_STATE
} from "../actions/types";

const initialState = {
  students: [],
  admins: [],
  words: [],
  wordsStats: {}
};


function getWordCat(wordType) {
  if (wordType === "imenica") return "nounCount"
  else if (wordType === "pridjev") return "adjectiveCount"
  else if (wordType === "glagol") return "verbCount"
  else if (wordType === "prilog") return "adverbCount"
}

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ADMIN_DATA_SUCCESS:
      return {
        ...state,
        admins: JSON.parse(payload.admins),
      };
    case DELETE_USER_ADMIN_SUCCESS:
      return {
        ...state,
        students: state.students.filter((item) => item.email !== payload.email),
      };
    case GET_STUDENT_DATA_SUCCESS:
      return {
        ...state,
        students: JSON.parse(payload.students),
      };
    case ADD_ADMIN_SUCCESS:
      state.admins.push(
        state.students[
        state.students.findIndex((item) => item.email === payload.email)
        ]
      );
      return {
        ...state,
        admins: state.admins,
        students: state.students.filter((item) => item.email !== payload.email),
      };
    case REMOVE_ADMIN_SUCCESS:
      state.students.push(
        state.admins[
        state.admins.findIndex((item) => item.email === payload.email)
        ]
      );
      return {
        ...state,
        admins: state.admins.filter((item) => item.email !== payload.email),
        students: state.students,
      };
    case GET_ADMIN_DATA_FAILURE:
      return {
        ...state,
        admins: [],
      };
    case GET_STUDENT_DATA_FAILURE:
      return {
        ...state,
        students: [],
      };
    case ADD_ADMIN_FAILURE:
    case REMOVE_ADMIN_FAILURE:
    case DELETE_USER_ADMIN_FAIL:
      return {
        ...state,
      };
    case ADD_DICTIONARY_SUCCESS:
    case ADD_DICTIONARY_FAILURE:
    case ADD_WORD_SUCCESS:
      return state;
    case ADD_WORD_FAILURE:
      return state;
    case REMOVE_WORD_SUCCESS:
      return state
    case REMOVE_WORD_FAILURE:
      return state
    case GET_DICTIONARY_WORDS_SUCCESS:
      return { ...state, words: payload.words, wordsStats: payload.words_stats };
    case GET_DICTIONARY_WORDS_FAIL:
      return state;
    case CLOSE_VIEW_DICTIONARY_ADMIN:
      return { ...state, words: [] };
    case EDIT_WORD_SUCCESS:
      return state;
    case EDIT_WORD_FAIL:
      return state;
    case REMOVE_WORD_FROM_REDUCER_STATE:
      let wordType = state.words.filter((word) => (word.word_str === payload))[0].word_type

      state.wordsStats[getWordCat(wordType)] -= 1

      return { ...state, words: state.words.filter((word) => !(word.word_str === payload)) }
    case UPDATE_WORD_IN_REDUCER_STATE:
      const new_words = state.words.map((word) => {
        if (word.word_str !== payload.word) return word
        else {
          state.wordsStats[getWordCat(word.word_type)] -= 1
          state.wordsStats[getWordCat(payload.newWordType)] += 1
          return {
            word_str: payload.newWord,
            cro_translation: payload.newTranslation,
            definition: payload.newDefinition,
            word_type: payload.newWordType
          }
        }
      })

      return {... state, words: new_words};
    default:
      return state;
  }
}
