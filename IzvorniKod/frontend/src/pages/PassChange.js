import styles from "./PassChange.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

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
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [errorPass, setErrorPass] = useState(false);

  function handlePassword(e) {
    e.preventDefault();
    if (password === repeatedPassword) {
      <Link to="/mainScreen"></Link>;
    } else {
      setErrorPass(true);
      setRepeatedPassword("");
    }
  }

  return (
    <form className={styles.form} onSubmit={handlePassword}>
      <input
        type="text"
        placeholder="Password"
        style={{ margin: "10px" }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Repeat password"
        style={{ margin: "10px" }}
        value={repeatedPassword}
        onChange={(e) => setRepeatedPassword(e.target.value)}
      ></input>
      {errorPass && (
        <p style={{ color: "red" }}>
          Make sure you enter the same passwords!!!
        </p>
      )}
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
