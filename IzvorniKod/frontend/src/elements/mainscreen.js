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

export const DictionarySelect = styled.div`
  display: flex;
  justify-content: center;
  width: 500px;
  height: 400px;
  margin-left: 470px;
  background-color: green;
`;

export const ModeSelect = styled.div`
  display: flex;
  justify-content: center;
  width: 500px;
  height: 400px;
  margin-left: 470px;
`;

export const LanguageSelect = styled.div`
  display: flex;
  justify-content: center;
  width: 500px;
  height: 400px;
  margin-left: 470px;
  background-color: green;
`;

export const ModifyUsersButton = styled.button`
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  margin-left: 46.5%;
`;
