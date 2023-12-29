import { connect } from "react-redux";
import {
  select_dictionary,
  start_learning,
  select_language,
} from "../actions/learningSpecs";

const List = ({
  elements,
  type,
  select_dictionary,
  select_language,
  start_learning,
  dict,
  lang,
}) => {
  function handleClick(elem) {
    if (type === "dict") {
      select_dictionary(elem);
    } else if (type === "lang") {
      select_language(elem);
    } else {
      start_learning(elem, dict, lang);
    }
  }

  return (
    <div>
      {elements.map((elem) => (
        <button onClick={() => handleClick(elem)} key={elem}>
          {elem}
        </button>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  dict: state.learningSpecsReducer.selectedDictionary,
  lang: state.learningSpecsReducer.language,
});

export default connect(mapStateToProps, {
  select_dictionary,
  start_learning,
  select_language,
})(List);
