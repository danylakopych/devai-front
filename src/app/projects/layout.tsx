import NavBar from "../components/navbar/navbar";
import SideBar from "../components/sidebar/sidebar";
import styles from "../components/dashboard.module.css";


const Layout = ({ children, }: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <SideBar />
      </div>
      <div className={styles.content}>
        <NavBar />
        <div className={styles.containerPage}>
          {children}
        </div>
      </div>
    </div>
    );
};

export default Layout;