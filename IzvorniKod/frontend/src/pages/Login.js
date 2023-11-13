import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";

function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.picture}></div>
      <RightPartScreen />
    </div>
  );
}

function RightPartScreen() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mail, setMail] = useState("");
  const [error, setError] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const fetchData = async () => {
      const dataPackage = {
        mail: mail,
      };
      const requestPackage = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataPackage),
      };
      try {
        const dataResponse = await fetch(
          "http://localhost:8000/login/",
          requestPackage
        );
        const dataReceived = await dataResponse.json();
        if (dataReceived.status === "logged") {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (error) {}
    };
    fetchData();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataSource = {
      mail: mail,
      password: password,
    };
    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataSource),
    };

    try {
      const response = await fetch(
        "http://localhost:8000/login/",
        requestOption
      );
      if (response.ok) {
        const jsonData = await response.json();
        const initialPassword = jsonData.has_initial_pass;
        const message = jsonData.message;
        const userFunction = jsonData.userFunction;
        if (message === "ok") {
          if (initialPassword === false) {
            navigate("/mainScreen", {
              state: { data: dataSource, userFunction: userFunction },
            });
          } else {
            navigate("/passChange", {
              state: { mail: mail, pass: false, userFunction: userFunction },
            });
          }
        } else {
          setError(true);
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  document.title = "LOG IN";

  return (
    <form className={styles.rightPartScreen} onSubmit={handleSubmit}>
      <div className={styles.buttons}>
        <div className={styles.logInText}>LOG IN</div>
        {loggedIn ? (
          <Link to="/mainScreen">
            <button className={styles.button1}>Main screen</button>
          </Link>
        ) : (
          <button className={styles.button1}>Log in</button>
        )}
        {loggedIn ? (
          <Link to="/profileSettings">
            <button className={styles.button2}>Profile</button>
          </Link>
        ) : (
          <Link to="/signup">
            <button className={styles.button2}>Sign up</button>
          </Link>
        )}
      </div>
      <div className={styles.emailInputDiv}>
        <input
          className={styles.emailInput}
          type="text"
          placeholder="Email..."
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
      </div>
      <div>
        <div className={styles.passwordInputDiv}>
          <input
            className={styles.passwordInput}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password..."
          />
        </div>
        <div className={styles.showPasswordButton}>
          {error ? (
            <p className={styles.wrongDataError}>*Wrong email or password* </p>
          ) : (
            ""
          )}
          <button onClick={togglePasswordVisibility}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
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

export default Login;
