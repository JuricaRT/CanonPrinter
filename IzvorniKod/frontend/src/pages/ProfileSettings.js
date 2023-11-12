import { Link } from "react-router-dom";
import styles from "./ProfileSettings.module.css";
import { useState } from "react";

export default function ProfileSettings() {
  const [wantToChangePass, setWantToChangePass] = useState(false);

  function handleClick() {
    setWantToChangePass(true);
  }

  function handleSaveChange() {
    setWantToChangePass(false);
  }

  return (
    <>
      <h1 className={styles.h1}>Profile Settings</h1>
      <div className={styles.settings}>
        <Element changable={false}>Mail</Element>
        {wantToChangePass ? (
          <Change handleSaveChange={handleSaveChange}>Password</Change>
        ) : (
          <Element
            changable={true}
            handleClick={handleClick}
            wantToChange={wantToChangePass}
          >
            Password
          </Element>
        )}
      </div>
      <div className={styles.donji}>
        <Return />
      </div>
    </>
  );
}

function Change({ children, handleSaveChange }) {
  return (
    <div>
      <form className={styles.change}>
        {children}:<input type="text" placeholder="New Password..."></input>
        <button onClick={handleSaveChange}>Save changes</button>
      </form>
    </div>
  );
}

function Return() {
  return (
    <Link to="/mainScreen" className={styles.return}>
      Return
    </Link>
  );
}

function Element({ children, changable, handleClick, wantToChange }) {
  return (
    <div className={styles.element}>
      {`${children}: Tvoj ${children}`}
      {changable && (
        <button
          style={{ height: "20px", margin: "10px" }}
          onClick={handleClick}
        >
          Change
        </button>
      )}
    </div>
  );
}
