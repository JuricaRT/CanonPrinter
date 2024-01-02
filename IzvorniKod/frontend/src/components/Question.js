// import { useState } from "react";
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
  //   const [shuffledArray, setShuffledArray] = useState(newArray.slice());

  //   const shuffleArray = () => {
  //     for (let i = shuffledArray.length - 1; i > 0; i--) {
  //       const j = Math.floor(Math.random() * (i + 1));
  //       [shuffledArray[i], shuffledArray[j]] = [
  //         shuffledArray[j],
  //         shuffledArray[i],
  //       ];
  //     }
  //     setShuffledArray([...shuffledArray]);
  //   };
  //   shuffleArray();

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
