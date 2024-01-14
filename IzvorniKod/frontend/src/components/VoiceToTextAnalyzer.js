import { useEffect, useRef, useState } from "react";
import * as Element from "../elements/voiceToTextAnalyzer";
import { getAudioFile } from "../actions/mode12";
import { connect } from "react-redux";
import { ButtonNext } from "../elements/mode12Screen";
import { answerQuestion } from "../actions/mode12";
import { getSession } from "../actions/mode12";

function VoiceToTextAnalyzer({ question, audioFile, getAudioFile, correctAnswer, getSession, answerQuestion }) {
  const [answer, setAnswer] = useState("");

  function answerChange(change) {
    setAnswer(change.target.value);
  }

  useEffect(
    function () {
      const button = document.getElementById("button-next");
      if (answer == "") {
        button.disabled = true;
      }
      else {
        button.disabled = false;
      }

    },
    [answer]
  );

  useEffect(() => {
    const buttons = document.getElementsByTagName("button");
    for (const button of buttons) {
      button.disabled = false;
    }

    const answerInput = document.getElementById("answer-input");
    answerInput.disabled = false;
    answerInput.value = "";

    const button = document.getElementById("button-next");
    button.disabled = true;

    const correctLabel = document.getElementById("correct-answer-label");
    correctLabel.innerHTML = "&#8203;";

    const buttonFinish = document.getElementById("finish-learning-button");
    buttonFinish.disabled = false;

    getAudioFile(question);
  }, [question])

   useEffect(() => {
     setTimeout(() => {
      if (audioFile) {
        const blob = new Blob([audioFile], { type: 'audio/wav' });
        const url = window.URL.createObjectURL(blob);
        const audio = document.getElementById('audio');
        const source = document.getElementById('source');

        if (source != null) {
          source.src = url;
          audio.load();        
        }
      }
     }, 1000);
   }, [audioFile]);

   const submitAnswer = () => {
    answerQuestion(answer);
    const button = document.getElementById("button-next");
    button.disabled = true;

    const answerInput = document.getElementById("answer-input");
    answerInput.disabled = true;

    const buttonFinish = document.getElementById("finish-learning-button");
    buttonFinish.disabled = true;

    const correctLabel = document.getElementById("correct-answer-label");
    correctLabel.innerHTML = "Correct Answer: " + correctAnswer;

    const audio = document.getElementById('audio');
    const source = document.getElementById('source');
    source.src = "";
    audio.load();

    const buttons = document.getElementsByTagName("button");
    for (const button of buttons) {
      button.disabled = true;
    }

    if (correctAnswer == answer) {
      correctLabel.style.color = "green";
    }
    else {
      correctLabel.style.color = "red";     
    }

    setTimeout(() => {
      getSession();
    }, 3000);
   }

  return (
    <Element.MainDiv>
      <audio controls="controls" id="audio">
        Your browser does not support the &lt;audio&gt; tag. 
        <source id="source" src="" type="audio/wav" />
      </audio>
      <Element.AnswerInputField
        id="answer-input"
        type="text"
        placeholder="Your answer..."
        onChange={(change) => answerChange(change)}
      ></Element.AnswerInputField>
      <label id="correct-answer-label" style={{color: 'green'}}>&#8203;</label>
      <ButtonNext id="button-next" onClick={submitAnswer}>Submit</ButtonNext>
    </Element.MainDiv>
  );
}

const mapStateToProps = (state) => ({
  audioFile: state.mode12Reducer.audioFile,
  correctAnswer: state.mode12Reducer.correct,
  question: state.mode12Reducer.question,
});

export default connect(mapStateToProps, {
  getAudioFile,
  getSession,
  answerQuestion
})(VoiceToTextAnalyzer);
