// import { useState } from "react";
import { useEffect, useState } from "react";
import { GlobalStyle } from "../elements/global";
import Options from "./Options";

function Question({
  question,
  answers,
  correct,
  selectedAnswer,
  setselectedAnswer,
}) {
  const newArray = [correct, ...answers];

  return (
    <div>
      <GlobalStyle />
      <h2>{question}</h2>
      <Options
        answers={newArray}
        selectedAnswer={selectedAnswer}
        setselectedAnswer={setselectedAnswer}
      ></Options>
    </div>
  );
}

export default Question;
