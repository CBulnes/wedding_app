import styles from "./GiftCard.module.css";

function GiftCard({ gift, onReserve }) {
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(gift.search)}`;

  return (
    <div className={styles.card}>
      <h3>{gift.name}</h3>

      {gift.reserved ? (
        <p className={styles.reserved}>Reservado 💛</p>
      ) : (
        <div className={styles.actions}>
          <a href={searchUrl} target="_blank" rel="noreferrer">
            Buscar
          </a>

          <button disabled={loadingAction} onClick={onReserve}>
            {loadingAction ? "Reservando..." : "Yo lo compro"}
          </button>
        </div>
      )}
    </div>
  );
}

export default GiftCard;
