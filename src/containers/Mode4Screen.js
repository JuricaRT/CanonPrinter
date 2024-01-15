import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  initializeSession,
  getSession,
  destroySession,
} from "../actions/mode12";
import Banner from "./Banner";
import { GlobalStyle } from "../elements/global";
import * as Element from "../elements/mode4Screen";
import { finishLearning } from "../actions/learningSpecs";
import VoiceRecorder from "../components/VoiceRecorder";

const Mode4Screen = ({
  dict,
  lang,
  mode,
  initializeSession,
  getSession,
  destroySession,
  question,
  finishLearning,
}) => {
  const [start, setStart] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      await initializeSession(dict, lang, mode);
      setTimeout(() => {
        getSession();
      }, 1000);
    }
    fetchData();
  }, [dict, lang, mode, getSession, initializeSession]);

  function handleClick() {
    setStart(true);
  }

  function handleNextClick() {
    getSession();
  }

  function handleFinishClick() {
    finishLearning();
    destroySession();
    navigate("/mainScreen");
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
            <>
              <VoiceRecorder question={question} />
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
  dict: state.learningSpecsReducer.selectedDictionary,
  lang: state.learningSpecsReducer.language,
  mode: state.learningSpecsReducer.selectedMode,
  question: state.mode12Reducer.question,
});

export default connect(mapStateToProps, {
  initializeSession,
  getSession,
  destroySession,
  finishLearning,
})(Mode4Screen);
