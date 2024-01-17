import styled from "styled-components";

export const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
`;

export const VoiceRecordDiv = styled.div`
  font-size: 20px;
`;

export const AnswerInputField = styled.input`
  font-size: 20px;
  margin-top: 15px;
  width: 100%;
  border-radius: 2px;
`;

export const SubmitButton = styled.button`
  width: 20%;
`;

export const PlayOrStopRecording = styled.button`
  width: 20%;
  height: 30px;
`;

export const RecordingControls = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;
