import { connect } from "react-redux";
import { useEffect, useState } from "react";
import * as Element from "../elements/options";
import { answerQuestion } from "../actions/mode12";

const Options = ({
  answers,
  correctAnswer,
  answerQuestion,
  question,
  selectedAnswer,
  setselectedAnswer,
}) => {
  // const [selectedAnswer, setselectedAnswer] = useState(null);

  // useEffect(
  //   function () {
  //     setselectedAnswer(null);
  //   },
  //   [question]
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
  question: state.mode12Reducer.question,
});

export default connect(mapStateToProps, { answerQuestion })(Options);
