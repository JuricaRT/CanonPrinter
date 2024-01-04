import { connect } from "react-redux";
import {
  select_dictionary,
  start_learning,
  select_language,
  select_language_view,
  select_dictionary_view,
} from "../actions/learningSpecs";
import { get_dictionary_words } from "../actions/admin";

const List = ({
  elements,
  type,
  select_dictionary,
  select_language,
  start_learning,
  select_language_view,
  select_dictionary_view,
  get_dictionary_words,
  dict,
  lang,
  languageView,
}) => {
  function handleClick(elem) {
    if (type === "dict") {
      select_dictionary(elem);
    } else if (type === "lang") {
      select_language(elem);
    } else if (type === "langView") {
      select_language_view(elem);
    } else if (type === "dictView") {
      select_dictionary_view(elem);
      get_dictionary_words(languageView, elem);
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
  languageView: state.learningSpecsReducer.languageView,
});

export default connect(mapStateToProps, {
  select_dictionary,
  start_learning,
  select_language,
  select_dictionary_view,
  select_language_view,
  get_dictionary_words,
})(List);
