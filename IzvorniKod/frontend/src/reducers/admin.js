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
} from "../actions/types";

const initialState = {
  students: [],
  admins: [],
  words: [],
  wordsStats: {}
};

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
    case EDIT_WORD_FAIL:
    default:
      return state;
  }
}
