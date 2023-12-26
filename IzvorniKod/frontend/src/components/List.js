import { select_dictionary, start_learning } from "../actions/learningSpecs";

function List({ elements, type }) {
  function handleClick(elem) {
    if (type === "dict") {
      select_dictionary(elem);
    } else if (type === "lang") {
      // select_language(elem); ne znam hoće li to biti tako, kasnije ću doraditi
    } else {
      start_learning(elem);
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
}

export default List;
