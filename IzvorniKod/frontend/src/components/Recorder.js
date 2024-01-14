import { useState } from "react";
import * as Element from "../elements/recorder";
import { answerQuestion2, answerQuestion } from "../actions/mode12";
import { connect } from "react-redux";
import { Fragment } from "react";
import { useEffect } from "react";
import { getSession } from "../actions/mode12";

const Recorder = ({ answerQuestion2, answerQuestion, random_grade, question, getSession }) => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [cannotSubmit, setcannotSubmit] = useState(true);
  const [disableButtons, setDisableButtons] = useState(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (e) => {
        audioChunks.push(e.data)

        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });

        const audioUrl = URL.createObjectURL(audioBlob);

        const audio = document.getElementById('audio');
        const source = document.getElementById('source');
        source.src = audioUrl;
        audio.load();
      };

      recorder.onstop = () => {

      };

      recorder.onstart = () => {
        setAudioChunks([]);

        const audio = document.getElementById('audio');
        const source = document.getElementById('source');
        source.src = "";
        audio.load();
      };

      recorder.start();
      setRecording(true);
      setcannotSubmit(true);
      setMediaRecorder(recorder);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
      setcannotSubmit(false);
    }
  };

  useEffect(() => {
    const buttons = document.getElementsByTagName("button");
    for (const button of buttons) {
      button.disabled = false;
    }

    setcannotSubmit(false);
    setDisableButtons(false);

    const resultLabel = document.getElementById("result-label");
    resultLabel.innerHTML = "&#8203;";

    const buttonFinish = document.getElementById("finish-learning-button");
    buttonFinish.disabled = false;
  }, [question])

  useEffect(() => {
    if (random_grade != null) {
      const resultLabel = document.getElementById("result-label");
      resultLabel.innerHTML = "Your score is " + random_grade;
    }
  }, [random_grade])

  function handleClick() {
    answerQuestion(audioChunks);

    setcannotSubmit(true);
    setDisableButtons(true);

    const buttons = document.getElementsByTagName("button");
    for (const button of buttons) {
      button.disabled = true;
    }

    const audio = document.getElementById('audio');
    const source = document.getElementById('source');
    source.src = "";
    audio.load();

    setTimeout(() => {
      getSession();
    }, 3001);
  }

  return (
    <Fragment>
    <Element.Recorder>
      <h4>RECORDER</h4>




      <button onClick={startRecording} disabled={recording || disableButtons}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!recording || disableButtons}>
        Stop Recording
      </button>

      <button onClick={handleClick} disabled={cannotSubmit || disableButtons}>
        Submit
      </button>
      <label>&#8203;</label>
      <label id="result-label">&#8203;</label>
      {//random_grade !== null ? <p>Your score is {random_grade}</p> : <></>
      }
    </Element.Recorder>
    <Element.AudioDiv>
      <audio controls="controls" id="audio" style={{marginTop: '10px'}}>
        Your browser does not support the &lt;audio&gt; tag. 
        <source id="source" src="" type="audio/wav" />
      </audio>
    </Element.AudioDiv>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  random_grade: state.mode12Reducer.randomGrade,
  question: state.mode12Reducer.question,
});

export default connect(mapStateToProps, { answerQuestion2, answerQuestion, getSession })(
  Recorder
);