import { useEffect, useRef, useState } from "react";
import * as Element from "../elements/voiceToTextAnalyzer";
import { getAudioFile } from "../actions/mode12";
import { connect } from "react-redux";

function VoiceToTextAnalyzer({ question, audioFile, getAudioFile }) {
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    getAudioFile(question);
  });

  // function playWave(byteArray) {
  //   var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  //   var myAudioBuffer = audioCtx.createBuffer(1, byteArray.length, 8000);
  //   var nowBuffering = myAudioBuffer.getChannelData(0);
  //   for (var i = 0; i < byteArray.length; i++) {
  //     nowBuffering[i] = byteArray[i];
  //   }
  //   var source = audioCtx.createBufferSource();
  //   source.buffer = myAudioBuffer;
  //   source.connect(audioCtx.destination);
  //   source.start();
  // }
  function answerChange(change) {
    setAnswer(change.target.value);
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     const byteArray = new Uint8Array(audioFile);
  //     console.log(byteArray);
  //     playWave(byteArray);
  //   }, 4000);
  // });
  return (
    <Element.MainDiv>
      <Element.AnswerInputField
        type="text"
        placeholder="Your answer..."
        onChange={(change) => answerChange(change)}
      ></Element.AnswerInputField>
      <Element.SubmitButton>Submit</Element.SubmitButton>
    </Element.MainDiv>
  );
}

const mapStateToProps = (state) => ({
  audioFile: state.mode12Reducer.audioFile,
});

export default connect(mapStateToProps, {
  getAudioFile,
})(VoiceToTextAnalyzer);
