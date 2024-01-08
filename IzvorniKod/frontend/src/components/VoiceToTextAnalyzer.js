import { useState } from "react";
import * as Element from "../elements/voiceToTextAnalyzer";

function VoiceToTextAnalyzer({ question }) {
  const [answer, setAnswer] = useState("");
  const [stopOrPlay, setStopOrPlay] = useState("");

  function answerChange(change) {
    setAnswer(change.target.value);
  }

  function recordOptionClicked(text) {
    setStopOrPlay(text);
  }

  return (
    <Element.MainDiv>
      <Element.VoiceRecordDiv>
        ------VOICE RECORDING------
        <Element.RecordingControls>
          <Element.PlayOrStopRecording
            onClick={() => recordOptionClicked("Play")}
          >
            Play
          </Element.PlayOrStopRecording>
          <Element.PlayOrStopRecording
            onClick={() => recordOptionClicked("Stop")}
          >
            Stop
          </Element.PlayOrStopRecording>
        </Element.RecordingControls>
      </Element.VoiceRecordDiv>
      <Element.AnswerInputField
        type="text"
        placeholder="Your answer..."
        onChange={(change) => answerChange(change)}
      ></Element.AnswerInputField>
      <Element.SubmitButton>Submit</Element.SubmitButton>
    </Element.MainDiv>
  );
}

export default VoiceToTextAnalyzer;
