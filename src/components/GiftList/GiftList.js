import { useEffect, useState } from "react";

import styles from "./GiftList.module.css";

import GiftCard from "../GiftCard/GiftCard";

import ReserveModal from "../ReserveModal/ReserveModal";

import { fetchGifts, reserveGift } from "../../services/giftsService";

function GiftList() {
  const [gifts, setGifts] = useState([]);

  const [selectedGift, setSelectedGift] = useState(null);

  const [loading, setLoading] = useState(true);

  const [loadingAction, setLoadingAction] = useState(false);

  const [alert, setAlert] = useState({
    show: false,
    title: "",
    message: "",
    type: "success",
  });

  useEffect(() => {
    loadGifts();
  }, []);

  function showAlert(title, message, type = "success") {
    setAlert({
      show: true,
      title,
      message,
      type,
    });

    setTimeout(() => {
      setAlert((prev) => ({
        ...prev,
        show: false,
      }));
    }, 2500);
  }

  async function loadGifts() {
    try {
      const data = await fetchGifts();

      const normalizedData = data.map((gift) => ({
        ...gift,

        reserved: gift.reserved === true || gift.reserved === "TRUE",
      }));

      setGifts(normalizedData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleReserve(giftId, personName) {
    setLoadingAction(true);

    try {
      const reservationId = crypto.randomUUID();

      await reserveGift(giftId, personName, reservationId);

      // Esperar actualización de Sheets
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Recargar regalos
      const data = await fetchGifts();

      const normalizedData = data.map((gift) => ({
        ...gift,

        reserved: gift.reserved === true || gift.reserved === "TRUE",
      }));

      setGifts(normalizedData);

      // Buscar regalo actualizado
      const updatedGift = normalizedData.find(
        (gift) => String(gift.id) === String(giftId),
      );

      // VALIDACIÓN REAL
      if (updatedGift && updatedGift.reservationId !== reservationId) {
        showAlert(
          "Ups 😅",
          "Este regalo ya fue reservado por otra persona",
          "error",
        );
        setLoadingAction(false);
        return;
      }

      // Éxito
      showAlert("¡Listo 💛", "Has reservado el regalo con éxito", "success");
    } catch (error) {
      console.error(error);
      showAlert("Ups 😅", "Ocurrió un error al reservar", "error");
      setLoadingAction(false);
    }
  }

  if (loading) {
    return (
      <section className={styles.giftSection}>
        <h2>Cargando regalos...</h2>
      </section>
    );
  }

  return (
    <section id="gift-section" className={styles.giftSection}>
      {alert.show && (
        <div className="alertOverlay">
          <div className={`alertBox ${alert.type}`}>
            <h3>{alert.title}</h3>
            <p>{alert.message}</p>
          </div>
        </div>
      )}

      {loadingAction && (
        <div className="loadingOverlay">
          <div className="spinner" />
          <p>Procesando reserva...</p>
        </div>
      )}

      <h2>Lista de regalos</h2>

      <div className={styles.grid}>
        {gifts.map((gift) => (
          <GiftCard
            key={gift.id}
            gift={gift}
            onReserve={() => setSelectedGift(gift)}
          />
        ))}
      </div>

      {selectedGift && (
        <ReserveModal
          gift={selectedGift}
          onClose={() => setSelectedGift(null)}
          onReserve={(name) => handleReserve(selectedGift.id, name)}
        />
      )}
    </section>
  );
}

export default GiftList;
