import { useEffect, useState } from "react";

import styles from "./Navbar.module.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");

    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`${styles.navbar} ${
        scrolled ? styles.scrolled : ""
      }`}
    >
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