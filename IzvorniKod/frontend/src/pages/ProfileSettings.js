import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./ProfileSettings.module.css";
import { useState, useEffect } from "react";

export default function ProfileSettings() {
  const location = useLocation();
  const data = location.state || {};

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (data.mail === undefined) {
  //     navigate("/login");
  //   }
  // });

  const [wantToChangePass, setWantToChangePass] = useState(false);
  const [newPassword, setNewPassword] = useState(data.password);
  const [wantToChangeUsername, setWantToChangeUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(data.username);
  const [wantToChangeName, setWantToChangeName] = useState(false);
  const [newName, setNewName] = useState(data.name);
  const [wantToChangeLastName, setWantToChangeLastName] = useState(false);
  const [newLastName, setNewLastName] = useState(data.last_name);

  function handlePassClick() {
    setWantToChangePass(true);
    setWantToChangeUsername(false);
    setWantToChangeName(false);
    setWantToChangeLastName(false);
  }

  const handleSavePass = async (e) => {
    e.preventDefault();
    setWantToChangePass(false);

    const sendingData = {
      mail: data.mail,
      password: newPassword,
    };

    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendingData),
    };

    try {
      const response = await fetch(
        "http://localhost:8000/edit_profile/",
        requestOption
      );
      if (response.ok) {
        const jsonData = await response.json();
        const message = jsonData.message;
        if (message === "ok") {
          navigate("/profileSettings", { state: sendingData });
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  function handleUsernameClick() {
    setWantToChangeUsername(true);
    setWantToChangePass(false);
    setWantToChangeName(false);
    setWantToChangeLastName(false);
  }

  const handleSaveUsername = async (e) => {
    e.preventDefault();
    setWantToChangeUsername(false);

    const sendingData = {
      mail: data.email,
      username: newUsername,
    };

    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendingData),
    };

    try {
      const response = await fetch(
        "http://localhost:8000/edit_profile/",
        requestOption
      );
      if (response.ok) {
        const jsonData = await response.json();
        const message = jsonData.message;
        if (message === "ok") {
          navigate("/profileSettings", { state: sendingData });
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  function handleNameClick() {
    setWantToChangeName(true);
    setWantToChangePass(false);
    setWantToChangeUsername(false);
    setWantToChangeLastName(false);
  }

  const handleSaveName = async (e) => {
    e.preventDefault();
    setWantToChangeName(false);

    const sendingData = {
      mail: data.email,
      name: newName,
    };

    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendingData),
    };

    try {
      const response = await fetch(
        "http://localhost:8000/edit_profile/",
        requestOption
      );
      if (response.ok) {
        const jsonData = await response.json();
        const message = jsonData.message;
        if (message === "ok") {
          navigate("/profileSettings", { state: sendingData });
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  function handleLastNameClick() {
    setWantToChangeLastName(true);
    setWantToChangeName(false);
    setWantToChangePass(false);
    setWantToChangeUsername(false);
  }

  const handleSaveLastName = async (e) => {
    e.preventDefault();
    setWantToChangeLastName(false);

    const sendingData = {
      mail: data.email,
      last_name: newLastName,
    };

    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state: sendingData }),
    };

    try {
      const response = await fetch(
        "http://localhost:8000/edit_profile/",
        requestOption
      );
      if (response.ok) {
        const jsonData = await response.json();
        const message = jsonData.message;
        if (message === "ok") {
          navigate("/profileSettings", { state: sendingData });
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const logout = async (e) => {
    e.preventDefault();

    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mail: data.email, password: newPassword }),
    };

    try {
      const response = await fetch(
        "http://localhost:8000/logout/",
        requestOption
      );
      if (response.ok) {
        const jsonData = await response.json();
        const message = jsonData.message;
        if (message === "ok") {
          navigate("/");
        } else {
          console.log("Neuspješan logout");
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const deleteProfile = async (e) => {
    e.preventDefault();

    const sendingData = {
      mail: data.mail,
    };

    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendingData),
    };

    try {
      const response = await fetch(
        "http://localhost:8000/delete_user/",
        requestOption
      );
      if (response.ok) {
        const jsonData = await response.json();
        const message = jsonData.message;
        if (message === "ok") {
          navigate("/");
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleReturn = (e) => {
    e.preventDefault();

    navigate("/mainScreen", { state: { mail: data.email } });
  };

  document.title = "PROFILE SETTINGS";

  return (
    <>
      <h1 className={styles.h1}>Profile Settings</h1>
      <div className={styles.settings}>
        <div>
          <Element changable={false} data={data.email}>
            Email
          </Element>
        </div>
        <div>
          {wantToChangePass ? (
            <Change handleChange={handleSavePass} setChange={setNewPassword}>
              Password
            </Change>
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
        </div>
        <div>
          {wantToChangeUsername ? (
            <Change
              handleChange={handleSaveUsername}
              setChange={setNewUsername}
            >
              Username
            </Change>
          ) : (
            <Element
              changable={true}
              handleClick={handleUsernameClick}
              data={data.username}
            >
              Username
            </Element>
          )}
        </div>
        <div>
          {wantToChangeName ? (
            <Change handleChange={handleSaveName} setChange={setNewName}>
              Name
            </Change>
          ) : (
            <Element
              changable={true}
              handleClick={handleNameClick}
              data={data.name}
            >
              Name
            </Element>
          )}
        </div>
        <div>
          {wantToChangeLastName ? (
            <Change
              handleChange={handleSaveLastName}
              setChange={setNewLastName}
            >
              Last name
            </Change>
          ) : (
            <Element
              changable={true}
              handleClick={handleLastNameClick}
              data={data.last_name}
            >
              Last name
            </Element>
          )}
        </div>
        <button className={styles.logout} onClick={logout}>
          Logout
        </button>
        <button className={styles.delete} onClick={deleteProfile}>
          Delete profile
        </button>
      </div>
      <div className={styles.donji}>
        <Return handleReturn={handleReturn} />
      </div>
    </>
  );
}

function Change({ children, handleChange, setChange }) {
  return (
    <div>
      <form className={styles.change}>
        {children}:
        <input
          type="text"
          placeholder={`New ${children}`}
          onChange={(e) => setChange(e.target.value)}
        ></input>
        <button onClick={handleChange}>Save changes</button>
      </form>
    </div>
  );
}

function Return({ handleReturn }) {
  return (
    <Link to="/mainScreen" className={styles.return} onClick={handleReturn}>
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
