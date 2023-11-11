import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";

function Homepage() {
  return (
    <div className={styles.container}>
      <LogSignButtons />
      <Message></Message>
      <Reviews></Reviews>
    </div>
  );
}

function LogSignButtons() {
  return (
    <div className={styles.buttons}>
      <Link to="/login">
        <Button>Log in</Button>
      </Link>
      <Link to="/signup">
        <Button>Sign up</Button>
      </Link>
    </div>
  );
}

function Reviews() {
  return (
    <div className={styles.reviews}>
      <Review>Jedna od najboljih aplikacija za učenje stranih jezika</Review>
      <Review>
        Nakon 6 mjeseci učenja sam prošao ispit i dobio posao u Njemačkoj
      </Review>
    </div>
  );
}

function Button({ children }) {
  if (children === "Log in") {
    return <button className={styles.button1}>{children}</button>;
  }
  return <button className={styles.button2}>{children}</button>;
}

function Message() {
  return (
    <div className={styles.openingMessage}>
      <div className={styles.pictureAndMessage}>
        Dobrodošli na najbolje mjesto za učenje stranih jezika!
      </div>
    </div>
  );
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
