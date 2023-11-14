import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import { useState, useEffect } from "react";
import { redirect } from 'react-router-dom';
import Cookies from "js-cookie";

function Homepage() {
  document.title = "HOME";
  var loggedIn = false
  useEffect(() => {

    const requestOption = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: 'include'
    };

    const fetchAuthStatus = async () => {
      try {
        let isAuthorized = Cookies.get('is_authenticated');
        if (isAuthorized == null) isAuthorized = false
        console.log(loggedIn)
        loggedIn = isAuthorized
      } catch (error) {
        console.error('Error fetching authentication status:', error);
      }
    };

    //const loginStatus = sessionStorage.getItem("loginStatus");
    const updateLoginStatus = () => {
      fetchAuthStatus();
    };

    updateLoginStatus();
  }, []);
  console.log(loggedIn)
  return (
    <div className={styles.container}>
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
      <Message></Message>
      <Reviews></Reviews>
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
