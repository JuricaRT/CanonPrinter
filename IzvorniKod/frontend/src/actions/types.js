// Auth Dispatch States
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAIL = "LOGOUT_FAIL";
export const AUTHENTICATED_SUCCESS = "AUTHENTICATED_SUCCESS";
export const AUTHENTICATED_FAIL = "AUTHENTICATED_FAIL";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAIL = "DELETE_USER_FAIL";

// Profile Dispatch States
export const LOAD_USER_PROFILE_SUCCESS = "LOAD_USER_PROFILE_SUCCESS";
export const LOAD_USER_PROFILE_FAIL = "LOAD_USER_PROFILE_FAIL";
export const UPDATE_USER_PROFILE_SUCCESS = "UPDATE_USER_PROFILE_SUCCESS";
export const UPDATE_USER_PROFILE_FAIL = "UPDATE_USER_PROFILE_FAIL";

// Admin Dispatch States
export const GET_STUDENT_DATA_SUCCESS = "GET_STUDENT_DATA_SUCCESS";
export const GET_STUDENT_DATA_FAILURE = "GET_STUDENT_DATA_FAILURE";
export const DELETE_USER_ADMIN_SUCCESS = "DELETE_USER_ADMIN_SUCCESS";
export const DELETE_USER_ADMIN_FAIL = "DELETE_USER_ADMIN_FAIL";
export const GET_ADMIN_DATA_SUCCESS = "GET_ADMIN_DATA_SUCCESS";
export const GET_ADMIN_DATA_FAILURE = "GET_ADMIN_DATA_FAILURE";
export const REMOVE_ADMIN_SUCCESS = "REMOVE_ADMIN_SUCCESS";
export const REMOVE_ADMIN_FAILURE = "REMOVE_ADMIN_FAILURE";
export const ADD_ADMIN_SUCCESS = "ADD_ADMIN_SUCCESS";
export const ADD_ADMIN_FAILURE = "ADD_ADMIN_FAILURE";

// Process of choosing dictionary, language and modules
export const SELECT_DICTIONARY = "SELECT_DICTIONARY";
export const SELECT_DICTIONARY_FAIL = "SELECT_DICTIONARY_FAIL";
export const SELECT_MODE = "SELECT_MODE";
export const SELECT_MODE_FAIL = "SELECT_MODE_FAIL";
export const START_LEARNING = "START_LEARNING";
export const START_LEARNING_FAIL = "START_LEARNING_FAIL";
export const GET_DICTIONARIES = "GET_DICTIONARIES";
export const GET_DICTIONARIES_FAIL = "GET_DICTIONARIES_FAIL";
export const SELECT_LANGUAGE = "SELECT_LANGUAGE";

// Autofill action
export const AUTOFILL_SUGGESTIONS_FROM_API = "AUTOFILL_SUGGESTIONS_FROM_API";
export const CACHE_AUTOFILL_SUGGESTIONS = "CACHE_AUTOFILL_SUGGESTIONS";
export const AUTOFILL_SUGGESTIONS_FROM_CACHE = "AUTOFILL_SUGGESTIONS_FROM_CACHE";
