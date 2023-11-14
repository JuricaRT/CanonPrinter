import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import { useState, useEffect } from "react";

function SignUp() {
  return (
    <div className={styles.container}>
      <div className={styles.picture}></div>
      <RightPartScreen />
    </div>
  );
}

function RightPartScreen() {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [error, setError] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (loggedMail !== "") {
  //       const dataPackage = {
  //         mail: mail,
  //       };
  //       const requestPackage = {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(dataPackage),
  //       };
  //       try {
  //         const dataResponse = await fetch(
  //           "http://localhost:8000/login/",
  //           requestPackage
  //         );
  //         const dataReceived = await dataResponse.json();
  //         if (dataReceived.status === "logged") {
  //           setLoggedIn(true);
  //         } else {
  //           setLoggedIn(false);
  //         }
  //       } catch (error) {
  //         console.log("Error: ", error);
  //       }
  //     }
  //   };
  //   fetchData();
  // });
  useEffect(() => {
    const loginStatus = sessionStorage.getItem("loginStatus");
    const updateLoginStatus = () => {
      if (loginStatus === "in") {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    };
    updateLoginStatus();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataSource = {
      mail: mail,
    };
    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataSource),
    };

    try {
      const response = await fetch(
        "http://localhost:8000/signup/",
        requestOption
      );
      if (response.ok) {
        const jsonData = await response.json();
        const message = jsonData.message;
        if (message === "ok") {
          navigate("/login");
        } else {
          setError(true);
        }
      }
    } catch (error) {
      setError(true);
    }
  };

  document.title = "SIGN UP";

  return (
    <form className={styles.rightPartScreen} onSubmit={handleSubmit}>
      <div className={styles.buttons}>
        <div className={styles.signUpText}>SIGN UP</div>
        {loggedIn ? (
          <Link to="/mainScreen">
            <button className={styles.button1}>Main screen</button>
          </Link>
        ) : (
          <Link to="/login">
            <button className={styles.button1}>Log in</button>
          </Link>
        )}
        {loggedIn ? (
          <Link to="/profileSettings">
            <button className={styles.button2}>Profile</button>
          </Link>
        ) : (
          <button className={styles.button2}>Sign up</button>
        )}
      </div>
      <div className={styles.emailInputDivMain}>
        <div className={styles.emailInputDiv}>
          <input
            className={styles.emailInput}
            type="text"
            placeholder="Email..."
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        </div>
        {error ? (
          <p className={styles.wrongDataError}>
            *Something went wrong, try again*
          </p>
        ) : (
          ""
        )}
      </div>
      <div className={styles.comingSoonDiv}>
        <div className={styles.comingSoonDivIteration}>
          <div className={styles.comingSoonText}>Coming soon!</div>
          <div className={styles.comingSoonLogInGoogleAppleDiv}>
            <button className={styles.comingSoon} disabled>
              Log in with Google
            </button>
          </div>
          <div className={styles.comingSoonLogInGoogleAppleDiv}>
            <button className={styles.comingSoon} disabled>
              Log in with Apple
            </button>
          </div>
        </div>
      </div>
      <div className={styles.buttonOkDiv}>
        <button className={styles.buttonOk}>OK</button>
      </div>
    </form>
  );
}

export default SignUp;
