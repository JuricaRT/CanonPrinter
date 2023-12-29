import { connect } from "react-redux";
import { answerQuestion } from "../actions/mode12";

const Options = ({ answers, answerQuestion }) => {
  function handleClick(ans) {
    answerQuestion(ans);
  }

  return (
    <div>
      {answers.map((ans) => (
        <button onClick={() => handleClick(ans)} key={ans}>
          {ans}
        </button>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { answerQuestion })(Options);
