import styles from "./CashGift.module.css";
import yapeQR from "../../assets/yape.png";
import { PAYMENT_INFO } from "../../config";

function CashGift() {

  const whatsappMessage =
    "Hola 😊 Ya realicé el regalo para su boda.";

  const whatsappUrl =
  `https://wa.me/${PAYMENT_INFO.yapeRaw}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <section id="cash-section" className={styles.section}>

      <div className={styles.container}>

        <h2>Regalo en efectivo</h2>

        <p className={styles.description}>
          Si ninguno de los regalos de nuestra lista se ajusta a tu elección, puedes acompañarnos con un aporte en efectivo. Lo recibiremos con mucho cariño y gratitud.
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
              {PAYMENT_INFO.yapeDisplay}
            </p>

            <p>
              <strong>Nombre:</strong>
              <br />
              {PAYMENT_INFO.holder}
            </p>

            <p>
              <strong>Cuenta BCP:</strong>
              <br />
              {PAYMENT_INFO.cuenta}
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