import { styled } from "styled-components";

export const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: blue;
  height: 780px;
`;

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
  justify-content: space-evenly;
  // margin-left: 200px;
  padding: 20px;
`;

export const ButtonNext = styled.button`
  background-color: white;
  border-radius: 100px;
  border: 2px solid black;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 450px;
`;

export const ButtonFinish = styled.button`
  background-color: white;
  border-radius: 100px;
  border: 2px solid black;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 450px;
`;
