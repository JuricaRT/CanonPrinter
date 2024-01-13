import { styled } from "styled-components";

export const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const AnswerLayout = styled.div`
  margin: 20px auto;
  width:400px;
  height:400px;
  background-color:#fff;
  display:grid;
  grid-template-columns: 200px 200px;
  grid-row: auto auto;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  justify-content: center;
  text-align: center;
`

export const TopDiv = styled.div`
  display: flex;
  justify-content: center;
  font-size: 40px;
  margin: 10px;
`;

export const QuestionDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

export const FooterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  // margin-left: 200px;
  padding: 20px;
  align-items: center;
  gap: 20px;
`;

export const ButtonNext = styled.button`
  background-color: white;
  border-radius: 100px;
  border: 2px solid black;
  padding: 5px 10px;
  cursor: pointer;
`;

export const ButtonFinish = styled.button`
  background-color: white;
  border-radius: 100px;
  border: 2px solid black;
  padding: 5px 10px;
  cursor: pointer;
`;
