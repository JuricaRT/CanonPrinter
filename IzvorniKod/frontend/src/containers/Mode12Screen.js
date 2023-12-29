import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getSession, initializeSession } from "../actions/mode12";
import * as Element from "../elements/mode12Screen";
import Banner from "./Banner";
import Question from "../components/Question";
import { GlobalStyle } from "../elements/global";

const Mode12Screen = ({
  question,
  answers,
  correct,
  dict,
  lang,
  mode,
  getSession,
  initializeSession,
}) => {
  const [start, setStart] = useState(false);

  useEffect(function () {
    initializeSession(dict, lang, mode);
    setTimeout(() => {
      getSession();
    }, 500);
  }, []);

  function handleClick() {
    setStart(true);
  }

  return (
    <>
      <Banner origin="MainScreen"></Banner>
      <GlobalStyle />
      <Element.MainDiv>
        <Element.TopDiv>KVIZ!!!</Element.TopDiv>
        <Element.QuestionDiv>
          {start === false ? (
            <button onClick={handleClick}>ZAPOČNI</button>
          ) : (
            <Question
              question={question}
              answers={answers}
              correct={correct}
            ></Question>
          )}
        </Element.QuestionDiv>
      </Element.MainDiv>
    </>
  );
};

const mapStateToProps = (state) => ({
  question: state.mode12Reducer.question,
  answers: state.mode12Reducer.answers,
  correct: state.mode12Reducer.correct,
  dict: state.learningSpecsReducer.selectedDictionary,
  lang: state.learningSpecsReducer.language,
  mode: state.learningSpecsReducer.selectedMode,
});

export default connect(mapStateToProps, { getSession, initializeSession })(
  Mode12Screen
);
