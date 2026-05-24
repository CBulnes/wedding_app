import styles from "./GiftCard.module.css";

function GiftCard({ gift, onReserve, loadingAction, loadingGiftId }) {
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

          <button disabled={loadingGiftId === gift.id} onClick={onReserve}>
            {loadingGiftId === gift.id ? "Reservando..." : "Yo lo compro"}
          </button>
        </div>
      )}
    </div>
  );
}

export default GiftCard;
