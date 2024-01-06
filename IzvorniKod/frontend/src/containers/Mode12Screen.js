import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getSession,
  initializeSession,
  answerQuestion,
  destroySession,
} from "../actions/mode12";
import * as Element from "../elements/mode12Screen";
import Banner from "./Banner";
import Question from "../components/Question";
import { GlobalStyle } from "../elements/global";
import { finishLearning } from "../actions/learningSpecs";

const Mode12Screen = ({
  question,
  answers,
  correct,
  dict,
  lang,
  mode,
  getSession,
  initializeSession,
  destroySession,
}) => {
  const [start, setStart] = useState(false);
  const [selectedAnswer, setselectedAnswer] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      await initializeSession(dict, lang, mode);
      setTimeout(() => {
        getSession();
      }, 1000);
    }
    fetchData();
  }, [dict, getSession, initializeSession, lang, mode]);

  function handleClick() {
    setStart(true);
  }

  function handleNextClick() {
    getSession();
    setselectedAnswer(null);
  }

  function handleFinishClick() {
    finishLearning();

    destroySession();

    navigate("/mainScreen");
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
            <>
              <Element.ButtonFinish onClick={handleFinishClick}>
                FINISH
              </Element.ButtonFinish>
              <Element.ButtonNext onClick={handleNextClick}>
                &rarr;
              </Element.ButtonNext>
            </>
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
  destroySession,
  finishLearning,
})(Mode12Screen);
