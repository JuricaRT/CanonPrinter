import { useLocation, Link } from "react-router-dom";
import styles from "./MainScreen.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function MainScreen() {
  const navigate = useNavigate();

  const [isAdmin, setAdmin] = useState(null);



  useEffect(() => {
    //if (data.mail === null) {
    //  navigate("/login");
    //}
    const getIsAdmin = async () => {
      const sendingData = {
        email: Cookies.get('email'),
      };
  
      const requestOption = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendingData),
      };
  
      try {
        const response = await fetch(
          "http://localhost:8000/admin_status/",
          requestOption
        );
        if (response.ok) {
          const data = await response.json();
          setAdmin(data.isAdmin == 1 ? true : null);
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  
    getIsAdmin();

  }, []);

  //if (data.admin === "admin") {
  //  setIsAdmin(!isAdmin);
  //}

  const handleClick = async (e) => {
    e.preventDefault();

    const sendingData = {
      mail: Cookies.get('email'),
    };

    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendingData),
    };

    try {
      const response = await fetch(
        "http://localhost:8000/profile/",
        requestOption
      );
      if (response.ok) {
        const finalData = await response.json();
        console.log(finalData);
        navigate("/profileSettings", { state: finalData });
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  document.title = "MAIN PAGE";

  return (
    <>
      <div className={styles.div}>
        <Logo />
        <SearchBar />
        <Profile handleClick={handleClick} />
      </div>
      <hr />
      {isAdmin ? <AdminPage /> : <div className={styles.picturePart}></div>}
    </>
  );
}

function AdminPage() {
  const [admins, setAdmins] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const getAdmins = async () => {
  
      const requestOption = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
  
      try {
        const response = await fetch(
          "http://localhost:8000/get_admins/",
          requestOption
        );
        if (response.ok) {
          const data = await response.json();
          setAdmins(JSON.parse(data))
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  
    const getStudents = async () => {
      const requestOption = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
  
      try {
        const response = await fetch(
          "http://localhost:8000/get_students/",
          requestOption
        );
        if (response.ok) {
          const data = await response.json();
          setStudents(JSON.parse(data))
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  
    getAdmins();
    getStudents();
  }, [])

  return (<div>
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
    </div>);
}

async function RevokeAdmin(mail) {
  const sendingData = {
    mail: mail,
  };
  let url = "http://localhost:8000/remove_admin/";

  CreatePostToDjango(sendingData, url);
}

async function GrantAdmin(mail) {
  const sendingData = {
    mail: mail,
  };
  let url = "http://localhost:8000/add_admin/";

  CreatePostToDjango(sendingData, url);
}

async function DeleteUser(mail) {
  const sendingData = {
    mail: mail,
  };
  let url = "http://localhost:8000/delete_user/";

  CreatePostToDjango(sendingData, url);
}

async function CreatePostToDjango(sendingData, url) {
  const requestOption = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sendingData),
  };

  try {
    const response = await fetch(
      url,
      requestOption
    );
    if (response.ok) {
      window.location.reload(false)
    }
  } catch (error) {
    console.log("error: ", error);
  }
}

function Logo() {
  return <div className={styles.divLogo}>Flip Memo</div>;
}

function SearchBar() {
  return (
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
}

function Profile({ handleClick }) {
  return (
    // <div>
    //   <button onClick={handleClick} className={styles.profile}>
    //     Profile
    //   </button>
    // </div>
    <Link
      to="/profileSettings"
      onClick={handleClick}
      className={styles.profileSettings}
    >
      Profile
    </Link>
  );
}
