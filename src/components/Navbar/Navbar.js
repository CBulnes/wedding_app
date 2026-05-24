import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <header className={styles.navbar}>

      <div className={styles.logo}>
        C & M
      </div>

      <nav>

        <a href="#gift-section">
          Regalos
        </a>

        <a href="#cash-section">
          Efectivo
        </a>

      </nav>

    </header>
  );
}

export default Navbar;