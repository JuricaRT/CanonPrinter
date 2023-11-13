import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";

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
      <Review>One of the best apps for learning foreign languages</Review>
      <Review>
        After 6 months of study, I passed the exam and got a job in Germany
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
