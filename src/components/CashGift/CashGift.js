import styles from "./CashGift.module.css";
import yapeQR from "../../assets/plin_.jpg";
import { PAYMENT_INFO } from "../../config";

function CashGift({ showAlert }) {

  const whatsappMessage =
    "Hola 😊 Ya realicé el regalo para su boda.";

  const whatsappUrl =
  `https://wa.me/${PAYMENT_INFO.yapeRaw}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  async function copyToClipboard(text, label) {
    try {
      await navigator.clipboard.writeText(text);

      showAlert(
        "¡Copiado! 📋",
        `${label} copiada al portapapeles.`,
        "success"
      );
    } catch {
      showAlert(
        "Ups 😅",
        "No se pudo copiar la cuenta.",
        "error"
      );
    }
  }

  return (
    <section id="cash-section" className={styles.section}>

      <div className={styles.container}>

        <h2 className={styles.titleRegalo}>Regalo en efectivo</h2>

        <p className={styles.description}>
          Si ninguno de los regalos de nuestra lista se ajusta a tu elección, puedes acompañarnos con un aporte en efectivo. Lo recibiremos con mucho cariño y gratitud.
        </p>

        <div className={styles.card}>

          <img
            src={yapeQR}
            alt="QR Yape"
          />

          <div className={styles.info}>

            <div className={styles.infoBlock}>
              <h4>Plin</h4>
              <button
                  className={styles.accountNumber}
                  onClick={() =>
                    copyToClipboard(
                      PAYMENT_INFO.yapeDisplay,
                      "Plin"
                    )
                  }
                >
                  {PAYMENT_INFO.yapeDisplay}
                  <span>Toca para copiar</span>
                </button>
            </div>

            <div className={styles.infoBlock}>
              <h4>Nombre</h4>
              <span>{PAYMENT_INFO.holder}</span>
            </div>

            <div className={styles.bankAccounts}>

              <div className={styles.account}>

                <h4>Cuenta BCP</h4>

                <button
                  className={styles.accountNumber}
                  onClick={() =>
                    copyToClipboard(
                      PAYMENT_INFO.cuentaBcp,
                      "Cuenta BCP"
                    )
                  }
                >
                  {PAYMENT_INFO.cuentaBcp}
                  <span>Toca para copiar</span>
                </button>

              </div>

              <div className={styles.separator}></div>

              <div className={styles.account}>

                <h4>Cuenta BBVA</h4>

                <button
                  className={styles.accountNumber}
                  onClick={() =>
                    copyToClipboard(
                      PAYMENT_INFO.cuentaBbva,
                      "Cuenta BBVA"
                    )
                  }
                >
                  {PAYMENT_INFO.cuentaBbva}
                  <span>Toca para copiar</span>
                </button>
                <br/>
              </div>

            </div>

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