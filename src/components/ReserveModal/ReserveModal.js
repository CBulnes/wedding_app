import { useState } from "react";
import styles from "./ReserveModal.module.css";

function ReserveModal({ gift, onClose, onReserve }) {
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
        <h2>{gift.name}</h2>

        <p>Ingresa tu nombre para reservar este regalo</p>

        <input
          type="text"
          value={name}
          placeholder="Tu nombre"
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />

        <div className={styles.actions}>
          <button onClick={onClose}>Cancelar</button>

          <button onClick={handleSubmit}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}

export default ReserveModal;
