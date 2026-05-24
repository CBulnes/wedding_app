import styles from "./CashGift.module.css";
import yapeQR from "../../assets/yape.png";

function CashGift() {

  const whatsappMessage =
    "Hola 😊 Ya realicé el regalo para su boda.";

  const whatsappUrl =
    `https://wa.me/51947743416?text=${encodeURIComponent(
      whatsappMessage
    )}`;

  return (
    <section id="cash-section" className={styles.section}>

      <div className={styles.container}>

        <h2>Regalo en efectivo</h2>

        <p className={styles.description}>
          Tu presencia es lo más importante 💛
          <br />
          Pero si deseas apoyarnos con un regalo,
          puedes hacerlo mediante Yape o transferencia.
        </p>

        <div className={styles.card}>

          <img
            src={yapeQR}
            alt="QR Yape"
          />

          <div className={styles.info}>

            <p>
              <strong>Yape:</strong>
              <br />
              947743416
            </p>

            <p>
              <strong>Cuenta BCP:</strong>
              <br />
              123-4567890-0-12
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              Enviar comprobante
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}

export default CashGift;