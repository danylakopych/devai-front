import Link from "next/link";
import Projects from "../projects/projects";
import styles from "./sidebar.module.css";
import Logo from "../logo/logo";
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
      <Projects currentUser={currentUser} />
    </div>
  );
};

export default SideBar;