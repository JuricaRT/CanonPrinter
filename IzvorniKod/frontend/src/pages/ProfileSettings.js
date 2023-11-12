import { Link, useNavigate } from "react-router-dom";
import styles from "./ProfileSettings.module.css";
import { useState } from "react";

export default function ProfileSettings() {
  const navigate = useNavigate();
  const [wantToChangePass, setWantToChangePass] = useState(false);
  const [wantToChangeUsername, setWantToChangeUsername] = useState(false);
  const [wantToChangeName, setWantToChangeName] = useState(false);
  const [wantToChangeLastName, setWantToChangeLastName] = useState(false);

  function handlePassClick() {
    setWantToChangePass(true);
    setWantToChangeUsername(false);
    setWantToChangeName(false);
    setWantToChangeLastName(false);
  }

  function handleSaveChange() {
    setWantToChangePass(false);
  }

  function handleUsernameClick() {
    setWantToChangeUsername(true);
    setWantToChangePass(false);
    setWantToChangeName(false);
    setWantToChangeLastName(false);
  }

  function handleSaveUsername() {
    setWantToChangeUsername(false);
  }

  function handleNameClick() {
    setWantToChangeName(true);
    setWantToChangePass(false);
    setWantToChangeUsername(false);
    setWantToChangeLastName(false);
  }

  function handleSaveName() {
    setWantToChangeName(false);
  }

  function handleLastNameClick() {
    setWantToChangeLastName(true);
    setWantToChangeName(false);
    setWantToChangePass(false);
    setWantToChangeUsername(false);
  }

  function handleSaveLastName() {
    setWantToChangeLastName(false);
  }

  function deleteProfile() {
    navigate("/");
  }

  return (
    <>
      <h1 className={styles.h1}>Profile Settings</h1>
      <div className={styles.settings}>
        <Element changable={false}>Mail</Element>
        {wantToChangePass ? (
          <Change handleChange={handleSaveChange}>Password</Change>
        ) : (
          <Element
            changable={true}
            handleClick={handlePassClick}
            wantToChange={wantToChangePass}
          >
            Password
          </Element>
        )}
        {wantToChangeUsername ? (
          <Change handleChange={handleSaveUsername}>Username</Change>
        ) : (
          <Element changable={true} handleClick={handleUsernameClick}>
            Username
          </Element>
        )}
        {wantToChangeName ? (
          <Change handleChange={handleSaveName}>Name</Change>
        ) : (
          <Element changable={true} handleClick={handleNameClick}>
            Name
          </Element>
        )}
        {wantToChangeLastName ? (
          <Change handleChange={handleSaveLastName}>Last name</Change>
        ) : (
          <Element changable={true} handleClick={handleLastNameClick}>
            Last name
          </Element>
        )}
        <button className={styles.delete} onClick={deleteProfile}>
          Delete profile
        </button>
      </div>
      <div className={styles.donji}>
        <Return />
      </div>
    </>
  );
}

function Change({ children, handleChange }) {
  return (
    <div>
      <form className={styles.change}>
        {children}:<input type="text" placeholder="New Password..."></input>
        <button onClick={handleChange}>Save changes</button>
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
