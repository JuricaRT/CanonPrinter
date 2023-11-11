import { Link } from "react-router-dom";
import styles from "./MainScreen.module.css";

export default function MainScreen() {
  return (
    <>
      <div className={styles.div}>
        <Logo />
        <SearchBar />
        <Profile />
      </div>
      <hr />
      <div className={styles.picturePart}></div>
    </>
  );
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

function Profile() {
  return (
    <Link to="/profileSettings" className={styles.profileSettings}>
      Profile
    </Link>
  );
}
