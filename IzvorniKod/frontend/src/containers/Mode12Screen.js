import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getSession, initializeSession } from "../actions/mode12";

const Mode12Screen = ({
  question,
  dict,
  lang,
  mode,
  getSession,
  initializeSession,
}) => {
  useEffect(function () {
    initializeSession(dict, lang, mode);
    getSession();
  }, []);

  return <div>{question}</div>;
};

const mapStateToProps = (state) => ({
  question: state.mode12Reducer.question,
  answers: state.mode12Reducer.answers,
  dict: state.learningSpecsReducer.selectedDictionary,
  lang: state.learningSpecsReducer.language,
  mode: state.learningSpecsReducer.selectedMode,
});

export default connect(mapStateToProps, { getSession, initializeSession })(
  Mode12Screen
);
