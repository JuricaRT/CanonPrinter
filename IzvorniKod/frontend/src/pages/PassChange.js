import styles from "./PassChange.module.css";

export default function PassChange() {
  return (
    <div className={styles.page}>
      <div className={styles.leftSide}></div>
      <div className={styles.rightSide}>
        <Form />
      </div>
    </div>
  );
}

function Form() {
  return (
    <form className={styles.form}>
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
