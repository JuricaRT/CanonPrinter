import React from 'react';

const MainScreen = () => (
    <div></div>
    /*
    <>
      <div className={styles.div}>
        <Logo />
        <SearchBar />
        <Profile handleClick={handleClick} />
      </div>
      <hr />
      {isAdmin ? <AdminPage /> : <div className={styles.picturePart}></div>}
    </>
    */
);

/*
const AdminPage = () => (
    <div>
        <div className={styles.adminclass}>
            <h1>Admin Panel</h1>
            <span><b>Students</b></span>
            {
                students.map((item) => (
                <div key={item['email']} className={styles.adminstudentrow}>
                    <span><b>Mail:</b>{item['email']}</span>
                    <span><b>Username:</b>{item['username']}</span>
                    <span><b>First Name:</b>{item['first_name']}</span>
                    <span><b>Last Name:</b>{item['last_name']}</span>
                    <button onClick={() => DeleteUser(item['email'])}>Delete</button>
                    <button onClick={() => GrantAdmin(item['email'])}>Grant Admin</button>
                </div>
                ))
            }
            <hr style={{color: "black"}, {width: "99%"}}></hr>
            <span><b> Admins</b></span>
            {
                admins.map((item) => (
                <div key={item['email']} className={styles.adminstudentrow}>
                    <span><b>Mail:</b>{item['email']}</span>
                    <span><b>Username:</b>{item['username']}</span>
                    <span><b>First Name:</b> {item['first_name']}</span>
                    <span><b>Last Name:</b> {item['last_name']}</span>
                    {item['email'] == Cookies.get('email') ? <div></div> : <button onClick={() => RevokeAdmin(item['email'])}>Revoke Admin</button>}
                </div>
                ))
            }
        </div>
    </div>
);

const Logo = () => (
    <div className={styles.divLogo}>Flip Memo</div>
);

const SearchBar = () => (
    <div>
      <form>
        <input
          className={styles.inputSearch}
          type="text"
          placeholder="Search..."
        ></input>
      </form>
    </div>
);

const Profile = () => (
    <Link
      to="/profileSettings"
      onClick={handleClick}
      className={styles.profileSettings}
    >
      Profile
    </Link>
);
*/
export default MainScreen;