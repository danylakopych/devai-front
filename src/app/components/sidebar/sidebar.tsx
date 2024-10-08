import Link from "next/link";
import Projects from "../projects/projects";
import styles from "./sidebar.module.css";
import Logo from "../logo/logo";

const SideBar = () => { 
  return (
    <div className={styles.sidebar}>
      <Link href={`/projects`} className={styles.logo}>
        <Logo />
        <div>DEVAI</div>
      </Link>
      <Projects />
    </div>
  );
};

export default SideBar;