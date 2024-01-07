import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
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
import modes from "../actions/modes";
import VoiceRecorder from "../components/VoiceRecorder";

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
  finishLearning,
}) => {
  const [start, setStart] = useState(false);
  const [selectedAnswer, setselectedAnswer] = useState(null);

  // const location = useLocation();
  // const selectedMode = location.state || {};

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

  function renderComponent() {
    switch (mode) {
      case modes.mode1:
        return (
          <Question
            question={question}
            answers={answers}
            correct={correct}
            selectedAnswer={selectedAnswer}
            setselectedAnswer={setselectedAnswer}
            // newAnswer={handleNewAnswer}
          ></Question>
        );
      case modes.mode2:
        return (
          <Question
            question={question}
            answers={answers}
            correct={correct}
            selectedAnswer={selectedAnswer}
            setselectedAnswer={setselectedAnswer}
            // newAnswer={handleNewAnswer}
          ></Question>
        );
      case modes.mode3:
        return <></>;
      case modes.mode4:
        return <VoiceRecorder question={question} />;
      default:
        return <></>;
    }
  }

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
            <>{renderComponent()}</>
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
