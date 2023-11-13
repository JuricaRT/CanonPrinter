import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./ProfileSettings.module.css";
import { useState } from "react";

export default function ProfileSettings() {
  const location = useLocation();
  const data = location.state || {};

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

  const deleteProfile = async (e) => {
    e.preventDefault();

    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data.mail),
    };

    try {
      const response = await fetch("http://localhost8000/", requestOption);
      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <>
      <h1 className={styles.h1}>Profile Settings</h1>
      <div className={styles.settings}>
        <Element changable={false} data={data.email}>
          Mail
        </Element>
        {wantToChangePass ? (
          <Change handleChange={handleSaveChange}>Password</Change>
        ) : (
          <Element
            changable={true}
            handleClick={handlePassClick}
            wantToChange={wantToChangePass}
            data={data.password}
          >
            Password
          </Element>
        )}
        {wantToChangeUsername ? (
          <Change handleChange={handleSaveUsername}>Username</Change>
        ) : (
          <Element
            changable={true}
            handleClick={handleUsernameClick}
            data={data.username}
          >
            Username
          </Element>
        )}
        {wantToChangeName ? (
          <Change handleChange={handleSaveName}>Name</Change>
        ) : (
          <Element
            changable={true}
            handleClick={handleNameClick}
            data={data.name}
          >
            Name
          </Element>
        )}
        {wantToChangeLastName ? (
          <Change handleChange={handleSaveLastName}>Last name</Change>
        ) : (
          <Element
            changable={true}
            handleClick={handleLastNameClick}
            data={data.last_name}
          >
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
        {children}:<input type="text" placeholder={`New ${children}`}></input>
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

function Element({ children, changable, handleClick, wantToChange, data }) {
  return (
    <div className={styles.element}>
      {`${children}: ${data}`}
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
