import styles from "./PassChange.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  // const [equalPass, setEqualPass] = useState(false);
  const [passError, setPassError] = useState(false);

  let backendError = false;

  const handlePassword = async (e) => {
    e.preventDefault();

    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(password),
    };

    try {
      if (password === repeatedPassword) {
        const response = await fetch("http://localhost:8000", requestOption);
        if (response.ok) {
          navigate("mainScreen");
        } else {
          backendError = true;
        }
        setPassError(false);
      } else {
        setPassError(true);
        setRepeatedPassword("");
      }
    } catch (error) {
      console("error: ", error);
    }
  };

  // function handlePassword(e) {
  //   e.preventDefault();
  //   if (password === repeatedPassword) {
  //     const requestOptions = {
  //       method: "POST",
  //       headers: { "Content-Type": "applications/json" },
  //       body: JSON.stringify(password),
  //     };

  //     const response = fetch("http://localhost:8000/passChange/", requestOptions);

  //     if (response.ok) {
  //       navigate("/mainScreen");
  //     } else {
  //       backendError = true;
  //     }

  //     navigate("/mainScreen");
  //     setPassError(false);
  //   } else {
  //     setPassError(true);
  //     setRepeatedPassword("");
  //   }
  //}

  return (
    <form className={styles.form} onSubmit={handlePassword}>
      <h1>Password change</h1>
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
      {passError === true && (
        <p style={{ color: "red" }}>
          Make sure you enter the same passwords!!!
        </p>
      )}
      {backendError === true && (
        <p style={{ color: "red" }}> Try again we have an error!</p>
      )}
      <button
        style={{
          backgroundColor: "beige",
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
