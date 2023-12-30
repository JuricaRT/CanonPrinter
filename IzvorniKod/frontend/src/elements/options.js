import { styled } from "styled-components";

export const OptionsDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 300px;
  justify-content: space-between;
`;

export const OptionButton = styled.button`
  display: block;
  font-family: inherit;
  color: inherit;
  font-size: 20px;
  border: 2px solid black;
  background-color: white;
  padding: 1.2rem 2.4rem;
  cursor: pointer;
  border-radius: 100px;
  transition: 0.3s;
`;
