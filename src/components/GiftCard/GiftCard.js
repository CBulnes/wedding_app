import styles from "./GiftCard.module.css";

function GiftCard({ gift, onReserve, loadingGiftId }) {
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
    gift.search
  )}`;

  const completed = gift.availableUnits <= 0;

  const percentage =
    (gift.reservedUnits / gift.units) * 100;

  return (
    <div className={styles.card}>
      <h3>{gift.name}</h3>

      <p className={styles.price}>
        {gift.price}
      </p>

      <p className={styles.units}>
        {gift.units === 1 ? "1 de 1 unidad reservada" : `${gift.reservedUnits} de ${gift.units} unidades reservadas`}
      </p>

      {!completed && (
        <p className={styles.available}>
          {gift.availableUnits === 1 ? "Queda 1 unidad disponible" : `Quedan ${gift.availableUnits} unidades disponibles`}
        </p>
      )}

      <div className={styles.progress}>
        <div
          className={styles.progressBar}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      {!completed ? (
        <div className={styles.actions}>
          <a
            href={searchUrl}
            target="_blank"
            rel="noreferrer"
          >
            Buscar
          </a>

          <button
            disabled={loadingGiftId === gift.id}
            onClick={onReserve}
          >
            {loadingGiftId === gift.id
              ? "Reservando..."
              : "Yo lo compro"}
          </button>
        </div>
      ) : (
        <p className={styles.reserved}>
          🎁 Regalo completado
        </p>
      )}
    </div>
  );
}

export default GiftCard;