import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getSession, initializeSession } from "../actions/mode12";
import * as Element from "../elements/mode12Screen";
import Banner from "./Banner";
import Question from "../components/Question";
import { GlobalStyle } from "../elements/global";
import { answerQuestion } from "../actions/mode12";

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
  const [selectedAnswer, setselectedAnswer] = useState(null);

  useEffect(function () {
    initializeSession(dict, lang, mode);
    setTimeout(() => {
      getSession();
    }, 500);
  }, []);

  function handleClick() {
    setStart(true);
  }

  function handleNextClick() {
    getSession();
    setselectedAnswer(null);
  }

  // function handleNewAnswer(ans) {
  //   answerQuestion(ans);
  // }

  return (
    <>
      <Banner origin="MainScreen"></Banner>
      <GlobalStyle />
      <Element.MainDiv>
        <Element.TopDiv>QUIZ!!!</Element.TopDiv>
        <Element.QuestionDiv>
          {start === false ? (
            <button onClick={handleClick}>START</button>
          ) : (
            <>
              <Question
                question={question}
                answers={answers}
                correct={correct}
                selectedAnswer={selectedAnswer}
                setselectedAnswer={setselectedAnswer}
                // newAnswer={handleNewAnswer}
              ></Question>
            </>
          )}
        </Element.QuestionDiv>
        <Element.FooterDiv>
          {start && (
            <Element.ButtonNext onClick={handleNextClick}>
              &rarr;
            </Element.ButtonNext>
          )}
        </Element.FooterDiv>
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

export default connect(mapStateToProps, {
  getSession,
  initializeSession,
  answerQuestion,
})(Mode12Screen);
