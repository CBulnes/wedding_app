import { useState } from "react";

import styles from "./ReserveModal.module.css";

function ReserveModal({
  gift,
  onClose,
  onReserve,
}) {

  const [name, setName] = useState("");

  function handleSubmit() {

    if (!name.trim()) return;

    onReserve(name);

    onClose();
  }

  return (
    <div className={styles.backdrop}>

      <div className={styles.modal}>

        <h2>{gift.name}</h2>

        <p>
          Ingresa tu nombre para reservar este regalo
        </p>

        <input
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className={styles.actions}>

          <button onClick={onClose}>
            Cancelar
          </button>

          <button onClick={handleSubmit}>
            Confirmar
          </button>

        </div>

      </div>

    </div>
  );
}

export default ReserveModal;