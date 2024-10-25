import { getCurrentUser } from "@/app/services/login/action";
import { auth } from "../../../../auth";
import { User } from "@/app/services/users/action";
import Logout from "../login-form/logout";
import styles from "./navbar.module.css";

const NavBar = async () => { 
  const session = await auth();
  const currentUser = await getCurrentUser(session) as User;

  return (
    <div className={styles.navbar}>
      <h1>DevAI - AI для розробників</h1>
      <Logout currentUser={currentUser} />
    </div>
  );
};

export default NavBar;