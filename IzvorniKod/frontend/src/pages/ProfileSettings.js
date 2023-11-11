import { Link } from "react-router-dom";
import styles from "./ProfileSettings.module.css";

export default function ProfileSettings() {
  return (
    <>
      <h1 className={styles.h1}>Profile Settings</h1>
      <div className={styles.div}>Svi settingsi</div>
      <div className={styles.donji}>
        <Return />
      </div>
    </>
  );
}

function Return() {
  return (
    <Link to="/mainScreen" className={styles.return}>
      Return
    </Link>
  );
}
