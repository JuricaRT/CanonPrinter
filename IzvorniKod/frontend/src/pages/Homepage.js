import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import { useState } from "react";

function Homepage() {
  document.title = "HOME";
  return (
    <div className={styles.container}>
      <LogSignButtons />
      <Message></Message>
      <Reviews></Reviews>
    </div>
  );
}

function LogSignButtons() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className={styles.buttons}>
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
        <Link to="/signup">
          <button className={styles.button2}>Sign up</button>
        </Link>
      )}
    </div>
  );
}

function Reviews() {
  return (
    <div className={styles.reviews}>
      <Review>One of the best apps for learning foreign languages</Review>
      <Review>
        After 6 months of study, I passed the exam and got a job in Germany
      </Review>
    </div>
  );
}

function Message() {
  return <div className={styles.openingMessage}></div>;
}

function Review({ children }) {
  return (
    <div className={styles.review}>
      <div className={styles.reviewChildren}>{children}</div>
      <div className={styles.reviewPerson}>Anonymus ⭐⭐⭐⭐⭐</div>
    </div>
  );
}

export default Homepage;
