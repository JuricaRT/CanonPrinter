import {
  GET_SESSION,
  GET_SESSION_FAIL,
  INITIALIZE_SESSION,
  INITIALIZE_SESSION_FAIL,
  ANSWER_QUESTION,
  ANSWER_QUESTION_FAIL,
} from "../actions/types";

const initalState = {
  question: "",
  answers: "",
  correct: "",
  correct_answers: 0,
  wrong_answers: 0,
  answer: "",
};

export default function mode12Reducer(state = initalState, action) {
  switch (action.type) {
    case INITIALIZE_SESSION:
      return state;
    case INITIALIZE_SESSION_FAIL:
      return state;
    case GET_SESSION:
      return {
        ...state,
        question: action.payload.question,
        answers: action.payload.answers,
        correct: action.payload.correct,
        correct_answers: action.payload.correct_answers,
        wrong_answers: action.payload.wrong_answers,
      };
    case GET_SESSION_FAIL:
      return state;
    case ANSWER_QUESTION:
      return { ...state, answer: action.payload };
    case ANSWER_QUESTION_FAIL:
      return state;
    default:
      return state;
  }
}
