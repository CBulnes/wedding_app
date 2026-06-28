import { useState, useEffect } from "react";
import styles from "./ReserveModal.module.css";

function ReserveModal({ gift, onClose, onReserve, loading }) {
  const [name, setName] = useState("");

  useEffect(() => {
    setName("");
  }, [gift]);

  function handleSubmit() {
    if (!name.trim()) return;

    onReserve(name); // 👈 único flujo
  }

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h2>Reservar regalo</h2>

        <h3 className={styles.giftName}>
          {gift.name}
        </h3>

        <p>
          Ingresa tu nombre para reservar este regalo.
        </p>

        <input
          type="text"
          value={name}
          disabled={loading}
          placeholder="Tu nombre"
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) {
              handleSubmit();
            }
          }}
        />

        <div className={styles.actions}>
          <button
            disabled={loading}
            onClick={onClose}
          >
            Cancelar
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Reservando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReserveModal;
