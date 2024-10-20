import Link from "next/link";
import Projects from "../projects/projects";
import styles from "./sidebar.module.css";
import Logo from "../logo/logo";
import Logout from "../login-form/logout";
import { getCurrentUser } from "@/app/services/login/action";
import { auth } from "../../../../auth";
import { User } from "@/app/services/users/action";

const SideBar = async () => { 
  const session = await auth();
  const currentUser = await getCurrentUser(session) as User;
  return (
    <div className={styles.sidebar}>
      <Link href={`/projects`} className={styles.logo}>
        <Logo />
        <div>DEVAI</div>
      </Link>
      <Logout />
      {currentUser?.username}
      <Projects currentUser={currentUser}/>
    </div>
  );
};

export default SideBar;