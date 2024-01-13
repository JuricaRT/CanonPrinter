import { useEffect, useRef, useState } from "react";
import * as Element from "../elements/voiceToTextAnalyzer";
import { getAudioFile } from "../actions/mode12";
import { connect } from "react-redux";

function VoiceToTextAnalyzer({ question, audioFile, getAudioFile }) {
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    getAudioFile(question);
  });

  function answerChange(change) {
    setAnswer(change.target.value);
  }

   useEffect(() => {
     setTimeout(() => {
      console.log(typeof(audioFile));
      if (audioFile) {
        if (audioFile.length < 1000) {
          return;
        }
        console.log(audioFile);
        const utf8EncodeText = new TextEncoder();
        var byteArray = utf8EncodeText.encode(audioFile);

        console.log(byteArray);

        var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        console.log(audioFile.length);
        const blob = new Blob([audioFile], { type: 'audio/wav' });
        const url = window.URL.createObjectURL(blob);
        const audio = document.getElementById('audio');
        const source = document.getElementById('source');

        source.src = url;
        audio.load();
        audio.play();
        
      }
     }, 1000);
   }, []);
  return (
    <Element.MainDiv>
      <Element.AnswerInputField
        type="text"
        placeholder="Your answer..."
        onChange={(change) => answerChange(change)}
      ></Element.AnswerInputField>
      <audio controls="controls" id="audio" loop>
        Your browser does not support the &lt;audio&gt; tag. 
        <source id="source" src="" type="audio/wav" />
      </audio>
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
