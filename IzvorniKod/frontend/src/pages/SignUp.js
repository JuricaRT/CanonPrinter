import { Link } from "react-router-dom";
import styles from "./SignUp.module.css";
import { useState } from "react";

function SignUp() {
  return (
    <div className={styles.container}>
      <div className={styles.picture}></div>
      <RightPartScreen />
    </div>
  );
}

function RightPartScreen() {
  const [mail, setMail] = useState("");

  return (
    <form className={styles.rightPartScreen}>
      <div className={styles.buttons}>
        <Link to="/login">
          <button className={styles.button1}>Log in</button>
        </Link>
        <Link to="/signup">
          <button className={styles.button2}>Sign up</button>
        </Link>
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
