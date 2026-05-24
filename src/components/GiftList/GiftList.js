import { useEffect, useState } from "react";

import styles from "./GiftList.module.css";

import GiftCard from "../GiftCard/GiftCard";

import ReserveModal from "../ReserveModal/ReserveModal";

import { fetchGifts, reserveGift } from "../../services/giftsService";

function GiftList() {
  const [gifts, setGifts] = useState([]);

  const [selectedGift, setSelectedGift] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGifts();
  }, []);

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
    try {
      const result = await reserveGift(giftId, personName);

      if (!result.success) {
        alert(result.message);

        // recargar regalos reales
        await loadGifts();

        return;
      }

      // Esperar un poco para que Sheets actualice
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Recargar desde backend
      const data = await fetchGifts();

      const normalizedData = data.map((gift) => ({
        ...gift,

        reserved: gift.reserved === true || gift.reserved === "TRUE",
      }));

      setGifts(normalizedData);
    } catch (error) {
      console.error(error);
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
