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
} from "../actions/types";

const initalState = {
  sessionExists: false,
  question: "",
  answers: "",
  correct: "",
  correct_answers: 0,
  wrong_answers: 0,
  answer: null,
  selectedAnswer: null,
  randomGrade: null,
  audioFile: null,
};

export default function mode12Reducer(state = initalState, action) {
  switch (action.type) {
    case INITIALIZE_SESSION:
      return { 
        ...state,
        sessionExists: true,
      };
    case INITIALIZE_SESSION_FAIL:
      return { 
        ...state,
        sessionExists: false,
      };
    case GET_SESSION:
      return {
        ...state,
        sessionExists: true,
        question: action.payload.question,
        answers: action.payload.answers,
        correct: action.payload.correct,
        correct_answers: action.payload.correct_answers,
        wrong_answers: action.payload.wrong_answers,
        selectedAnswer: null,
        randomGrade: null,
        mode: action.payload.mode,
      };
    case GET_SESSION_FAIL:
      return { 
        ...state, 
        sessionExists: false 
      };
    case ANSWER_QUESTION:
      return { ...state, randomGrade: action.payload };
    case ANSWER_QUESTION_FAIL:
      return state;
    case DESTROY_SESSION:
      return initalState;
    case DESTROY_SESSION_FAIL:
      return state;
    case GET_AUDIO_FILE_SUCCESS:
      return { ...state, audioFile: action.payload };
    case GET_AUDIO_FILE_FAIL:
      return state;
    default:
      return state;
  }
}
