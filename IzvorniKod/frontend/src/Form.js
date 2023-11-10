export default function Form() {
  return (
    <form className="form">
      <input
        type="text"
        placeholder="Password"
        style={{ margin: "10px" }}
      ></input>
      <input
        type="text"
        placeholder="Repeat password"
        style={{ margin: "10px" }}
      ></input>
      <button
        style={{
          backgroundColor: "green",
          marginLeft: "250px",
          marginRight: "20px",
          marginTop: "40px",
        }}
      >
        OK
      </button>
    </form>
  );
}
