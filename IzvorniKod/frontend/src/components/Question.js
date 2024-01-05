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
  const [shuffledAnswers, setshuffledAnswers] = useState([]);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(
    function () {
      const newArray = [correct, ...answers];
      const shuffled = shuffleArray(newArray);

      setshuffledAnswers(shuffled);
    },
    [question]
  );

  return (
    <div>
      <GlobalStyle />
      <h2>{question}</h2>
      <Options
        answers={shuffledAnswers}
        selectedAnswer={selectedAnswer}
        setselectedAnswer={setselectedAnswer}
      ></Options>
    </div>
  );
}

export default Question;
