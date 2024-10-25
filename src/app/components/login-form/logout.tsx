import { doLogout } from "@/app/services/login/action"
import styles from "./logout.module.css";
import { User } from "@/app/services/users/action";

const Logout = ({currentUser}: {currentUser: User}) => {
  return (
    <form className={styles.form} action={doLogout}>
        Hello, {currentUser.username}
        <button className={styles.logout} type="submit">Logout</button>
    </form>
  )
}

export default Logout