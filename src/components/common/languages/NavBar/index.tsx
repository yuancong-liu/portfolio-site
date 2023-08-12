import styles from "./index.module.scss";

export const NavBar = () => {
  return (
    <nav className={styles['nav-bar']}>
      <ul className={styles['nav-items']}>
        <li>ABOUT ME</li>
        <li>PORTFOLIO</li>
        <li>BLOG</li>
        <li>...AND</li>
      </ul>
    </nav>
  );
};
