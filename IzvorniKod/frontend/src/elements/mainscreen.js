import { styled } from "styled-components";
import { Link } from "react-router-dom";

export const TopDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
`;

export const SearchBar = styled.div`
  width: 350px;
  height: 50px;
  font-size: large;
`;

export const ProfileSettings = styled(Link)`
  &:link,
  &:visited {
    display: flex;
    background-color: beige;
    color: var(--color-dark--1);
    text-transform: uppercase;
    text-decoration: none;
    width: 250px;
    height: 50px;
    font-size: 1.6rem;
    font-weight: 600;
    padding: 1rem 3rem;
    border-radius: 5px;
    text-align: center;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    opacity: 0.7;
  }
`;

export const LearningStart = styled.button`
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  margin-left: 46.5%;
`;

export const DictionaryBack = styled.button`
  margin-right: 90%;
  margin-top: 5%;
  border-radius: 25px;
`;

export const ModeBack = styled.button`
  margin-right: 90%;
  margin-top: 5%;
  border-radius: 25px;
`;

export const DictionarySelect = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 500px;
  height: 100px;
  margin-left: 470px;
  background-color: green;
`;

export const ModeSelect = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  // align-content: center;
  width: 500px;
  height: 200px;
  margin-left: 470px;
  background-color: green;
`;

export const LanguageSelect = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 500px;
  height: 100px;
  margin-left: 470px;
  background-color: green;
`;

export const AddDictionary = styled.button`
  margin: 10px;
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  margin-left: 46.5%;
`;

export const AddDictionaryName = styled.input`
  width: 30%;
  margin-left: 35%;
  font-size: 22px;
  for: textInput;
`;
export const LanguageSelectionForDictionary = styled.input`
  width: 30%;
  margin-left: 35%;
  font-size: 22px;
  for: textInput;
  margin-top: 15px;
`;

export const SubmitButtonForAddingDictionary = styled.button`
  font-size: 15px;
  width: 10%;
  margin-left: 55.5%;
  margin-top: 10px;
`;

export const ViewDictionary = styled.button`
  margin-top: 10px;
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  margin-left: 46.5%;
`;

export const WordSelection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  width: 500px;
  height: auto;
  margin-left: 470px;
  background-color: green;
  gap: 5px;

  button {
    font-size: 14px;
  }

  span {
    border: 1px solid black;
    background-color: white;
    padding: 2px;
  }
`;

export const DictionaryChanges = styled.div`
  margin-left: 55.1%;
  margin-top: 5px;
`;

export const DeleteWord = styled.button`
  font-size: 15px;
  margin-right: 5px;
  color: red;
`;

export const SubmitChanges = styled.button`
  font-size: 15px;
`;

export const DeleteWordNot = styled.button`
  font-size: 15px;
  margin-right: 5px;
`;

export const CustomButtonWord = styled.button`
  color: red;
`;

export const EditWordNot = styled.button`
  font-size: 15px;
  margin-right: 5px;
`;

export const EditWord = styled.button`
  font-size: 15px;
  margin-right: 5px;
  color: red;
`;

export const EditWordClickedDiv = styled.div``;
