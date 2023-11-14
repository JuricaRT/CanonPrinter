import { useLocation, Link } from "react-router-dom";
import styles from "./MainScreen.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function MainScreen() {
  const navigate = useNavigate();

  const [isAdmin, setAdmin] = useState(null);

  var admins = []
  var students = []

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
          admins = data
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
          students = data
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  
    getIsAdmin();
    getAdmins();
    getStudents();

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
  console.log(isAdmin)

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
  return <div>
      <div class="admin-class">
        <h1>Admin Panel</h1>
      </div>
    </div>;
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
