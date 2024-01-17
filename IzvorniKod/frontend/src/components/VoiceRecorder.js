import Recorder from "./Recorder";

function VoiceRecorder({ question }) {
  return (
    <div>
      <h2>{question}</h2>
      <Recorder />
    </div>
  );
}

export default VoiceRecorder;
