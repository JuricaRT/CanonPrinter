import { select_dictionary, select_mode } from "../actions/learningSpecs";

function List({ elements, type }) {
  function handleClick(elem) {
    if (type === "dict") {
      select_dictionary(elem);
    } else {
      select_mode(elem);
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
