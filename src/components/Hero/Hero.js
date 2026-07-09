import styles from "./Hero.module.css";

import Countdown from "../Countdown/Countdown";

function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.overlay}>
        <h1>Carlos & Melissa</h1>

        <p>24 Octubre 2026</p>

        <Countdown />

        <div className={styles.welcome}>
          <p>
            Tu presencia hará de este día un recuerdo inolvidable.
          </p>

          <p>
            Si además deseas sorprendernos con un detalle, puedes conocer nuestra lista de regalos a continuación.
          </p>
        </div>

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