import { connect } from "react-redux";
import { useEffect, useState } from "react";
import * as Element from "../elements/options";
import { answerQuestion } from "../actions/mode12";

const Options = ({
  answers,
  correctAnswer,
  answerQuestion,
  selected_Answer,
}) => {
  const [selectedAnswer, setselectedAnswer] = useState(null);
  console.log(selectedAnswer);

  // useEffect(
  //   function () {
  //     setselectedAnswer(selected_Answer);
  //   },
  //   [selected_Answer]
  // );

  function handleAnswerClick(ans) {
    answerQuestion(ans);
    setselectedAnswer(ans);
  }

  return (
    <Element.OptionsDiv>
      {answers.map((ans) => (
        <Element.OptionButton
          style={{
            backgroundColor:
              ans === selectedAnswer
                ? ans === correctAnswer
                  ? "green"
                  : "red"
                : "",
          }}
          onClick={() => handleAnswerClick(ans)}
          key={ans}
        >
          {ans}
        </Element.OptionButton>
      ))}
    </Element.OptionsDiv>
  );
};

const mapStateToProps = (state) => ({
  correctAnswer: state.mode12Reducer.correct,
  selected_Answer: state.mode12Reducer.selectedAnswer,
});

export default connect(mapStateToProps, { answerQuestion })(Options);
