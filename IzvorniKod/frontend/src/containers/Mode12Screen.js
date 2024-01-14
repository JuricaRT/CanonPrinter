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
import VoiceToTextAnalyzer from "../components/VoiceToTextAnalyzer";

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
  randomGrade,
  sessionExists
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    getSession();
  }, []);

  useEffect(() => {
    if (!sessionExists) {
      navigate("/");
    }
  }, [sessionExists])

  function handleFinishClick() {
    finishLearning();

    destroySession();
    
    if (!sessionExists) {
      navigate("/mainScreen")
    }
  }

  function renderComponent() {
    switch (mode) {
      case modes.mode1:
      case 0:
        return (
          <Question
            question={question}
            answers={answers}
            correct={correct}
            // newAnswer={handleNewAnswer}
          ></Question>
        );
      case modes.mode2:
      case 1:
        return (
          <Question
            question={question}
            answers={answers}
            correct={correct}
            // newAnswer={handleNewAnswer}
          ></Question>
        );
      case modes.mode3:
      case 2:
        return <VoiceToTextAnalyzer question={question}></VoiceToTextAnalyzer>;
      case modes.mode4:
      case 3:
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
        <>{renderComponent()}</>
        <Element.FooterDiv>
              {//<Element.ButtonNext onClick={handleNextClick}>
               // Submit Answer
              //</Element.ButtonNext>
            }
              <Element.ButtonFinish onClick={handleFinishClick} id="finish-learning-button">
                Quit
              </Element.ButtonFinish>

        </Element.FooterDiv>
      </Element.MainDiv>
    </>
  );
};

const mapStateToProps = (state) => ({
  sessionExists: state.mode12Reducer.sessionExists,
  question: state.mode12Reducer.question,
  answers: state.mode12Reducer.answers,
  correct: state.mode12Reducer.correct,
  dict: state.learningSpecsReducer.selectedDictionary,
  lang: state.learningSpecsReducer.language,
  mode: state.mode12Reducer.mode,
  randomGrade: state.mode12Reducer.randomGrade,
});

export default connect(mapStateToProps, {
  getSession,
  initializeSession,
  answerQuestion,
  destroySession,
  finishLearning,
})(Mode12Screen);
