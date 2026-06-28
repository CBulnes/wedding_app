import styles from "./Hero.module.css";

import Countdown from "../Countdown/Countdown";

function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.overlay}>
        <h1>Carlos & Melissa</h1>

        <p>24 Octubre 2026</p>

        <Countdown />

        <a href="#gift-section">
            <button>
                Ver regalos
            </button>
        </a>
      </div>
    </section>
  );
}

export default Hero;