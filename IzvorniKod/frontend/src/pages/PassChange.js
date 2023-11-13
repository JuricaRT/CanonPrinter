import styles from "./PassChange.module.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function PassChange() {
  const location = useLocation();
  const receivedData = location.state;

  return (
    <div className={styles.page}>
      <div className={styles.leftSide}></div>
      <div className={styles.rightSide}>
        <Form data={receivedData} />
      </div>
    </div>
  );
}

function Form({ data }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);
  // const [equalPass, setEqualPass] = useState(false);
  const [passError, setPassError] = useState(false);

  let backendError = false;

  const togglePassword = (e) => {
    e.preventDefault();

    setShowPassword(!showPassword);
  };

  const toggleRepeated = (e) => {
    e.preventDefault();

    setShowRepeatedPassword(!showRepeatedPassword);
  };

  const handlePassword = async (e) => {
    e.preventDefault();

    const sendingData = {
      password: password,
      mail: data.mail,
      initialPass: data.pass,
    };

    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendingData),
    };

    try {
      if (password === repeatedPassword) {
        const response = await fetch(
          "http://localhost:8000/edit_profile/",
          requestOption
        );
        if (response.ok) {
          navigate("/mainScreen", { state: sendingData });
        } else {
          backendError = true;
        }
        setPassError(false);
      } else {
        setPassError(true);
        setRepeatedPassword("");
      }
    } catch (error) {
      console.log("error: ", error);
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

  document.title = "PASSWORD CHANGE";
  return (
    <form className={styles.form} onSubmit={handlePassword}>
      <h1>Password change</h1>
      <div>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          style={{ width: "250px", margin: "10px" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button onClick={togglePassword}>
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      <div>
        <input
          type={showRepeatedPassword ? "text" : "password"}
          placeholder="Repeat password"
          style={{ width: "250px", margin: "10px" }}
          value={repeatedPassword}
          onChange={(e) => setRepeatedPassword(e.target.value)}
        ></input>
        <button onClick={toggleRepeated}>
          {showRepeatedPassword ? "Hide" : "Show"}
        </button>
      </div>
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
