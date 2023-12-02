import React from 'react';

const ProfileSettings = () => (
    <div></div>
    /*
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
    */
);
/*
const Return = () => (
    <Link to="/mainScreen" className={styles.return} onClick={handleReturn}>
      Return
    </Link>
);

const Element = () => (
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
*/
export default ProfileSettings;

