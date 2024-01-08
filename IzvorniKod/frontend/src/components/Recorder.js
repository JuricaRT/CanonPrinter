import { useState } from "react";
import * as Element from "../elements/recorder";
import { answerQuestion2, answerQuestion } from "../actions/mode12";
import { connect } from "react-redux";

const Recorder = ({ answerQuestion2, answerQuestion, random_grade }) => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [cannotSubmit, setcannotSubmit] = useState(true);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setAudioChunks((prevChunks) => [...prevChunks, e.data]);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        console.log(audioUrl);
      };

      recorder.start();
      setRecording(true);
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

  function handleClick() {
    answerQuestion(audioChunks);
    setcannotSubmit(true);
  }

  return (
    <Element.Recorder>
      <h4>RECORDER</h4>
      <button onClick={startRecording} disabled={recording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </button>
      <button onClick={handleClick} disabled={cannotSubmit}>
        Submit
      </button>
      {random_grade !== null ? <p>Your score is {random_grade}</p> : <></>}
    </Element.Recorder>
  );
};

const mapStateToProps = (state) => ({
  random_grade: state.mode12Reducer.randomGrade,
});

export default connect(mapStateToProps, { answerQuestion2, answerQuestion })(
  Recorder
);
