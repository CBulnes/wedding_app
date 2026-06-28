import { useEffect, useState } from "react";

import styles from "./GiftList.module.css";

import GiftCard from "../GiftCard/GiftCard";
import ReserveModal from "../ReserveModal/ReserveModal";

import {
  fetchGifts,
  reserveGift,
} from "../../services/giftsService";

function GiftList() {

  const [gifts, setGifts] = useState([]);
  const [sortBy, setSortBy] = useState("nameAsc");
  const [selectedGift, setSelectedGift] = useState(null);

  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);
  const [loadingGiftId, setLoadingGiftId] = useState(null);

  const [alert, setAlert] = useState({
    show: false,
    title: "",
    message: "",
    type: "success",
  });

  useEffect(() => {
    const init = async () => {
      await loadGifts();
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function normalizeGifts(data) {
  return data.map((gift) => ({
    ...gift,

    units: Number(gift.units),
    reservedUnits: Number(gift.reservedUnits),
    availableUnits: Number(gift.availableUnits),

    reserved: Number(gift.availableUnits) <= 0,
  }));
}

  function getPriceValue(price) {
    if (!price) return 0;

    return Number(
      price
        .replace("S/", "")
        .split("-")[0]
        .trim()
    );
  }

  function sortGifts(gifts) {
    const sorted = [...gifts];

    switch (sortBy) {
      case "nameAsc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "nameDesc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;

      case "priceAsc":
        sorted.sort(
          (a, b) =>
            getPriceValue(a.price) -
            getPriceValue(b.price)
        );
        break;

      case "priceDesc":
        sorted.sort(
          (a, b) =>
            getPriceValue(b.price) -
            getPriceValue(a.price)
        );
        break;

      default:
        break;
    }

    return sorted;
  }

  async function refreshGifts() {
    const data = await fetchGifts();
    const normalized = normalizeGifts(data);
    setGifts(normalized);
    return normalized;
  }

  async function waitForReservation(giftId, personName) {
    for (let i = 0; i < 5; i++) {

      const updated = await refreshGifts();

      const gift = updated.find(
        (g) => String(g.id) === String(giftId)
      );

      if (
        gift &&
        gift.reservedBy.includes(personName)
      ) {
        return true;
      }

      await new Promise((resolve) =>
        setTimeout(resolve, 400)
      );
    }

    return false;
  }

  async function loadGifts() {
    try {
      await refreshGifts();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleReserve(giftId, personName) {

    const isValidName =
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/.test(
        personName.trim()
      );

    if (!isValidName) {
      showAlert(
        "Nombre inválido",
        "Ingresa un nombre válido.",
        "error"
      );
      return;
    }

    setLoadingAction(true);
    setLoadingGiftId(giftId);

    try {

      await reserveGift(
        giftId,
        personName,
        crypto.randomUUID()
      );

      const success = await waitForReservation(
        giftId,
        personName
      );

      if (success) {

        showAlert(
          "¡Listo 💛",
          "Has reservado el regalo con éxito.",
          "success"
        );

        setSelectedGift(null);

      } else {

        showAlert(
          "Ups 😅",
          "No fue posible reservar el regalo.",
          "error"
        );

      }

    } catch (error) {

      console.error(error);

      showAlert(
        "Ups 😅",
        "Ocurrió un error al reservar.",
        "error"
      );

    } finally {

      setLoadingAction(false);
      setLoadingGiftId(null);

    }
  }

  const sortedGifts = sortGifts(gifts);

  if (loading) {

    return (
      <section className={styles.giftSection}>
        <h2>Cargando regalos...</h2>
      </section>
    );

  }

  return (
    <section
      id="gift-section"
      className={styles.giftSection}
    >

      {alert.show && (
        <div className={styles.alertOverlay}>
          <div
            className={`${styles.alertBox} ${styles[alert.type]}`}
          >
            <h3>{alert.title}</h3>
            <p>{alert.message}</p>
          </div>
        </div>
      )}

      {loadingAction && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner} />
          <p>Procesando reserva...</p>
        </div>
      )}

      <h2>Lista de regalos</h2>

      <div className={styles.sortContainer}>
        <label>Ordenar por:</label>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="nameAsc">
            Nombre (A-Z)
          </option>

          <option value="nameDesc">
            Nombre (Z-A)
          </option>

          <option value="priceAsc">
            Precio (menor primero)
          </option>

          <option value="priceDesc">
            Precio (mayor primero)
          </option>
        </select>
      </div>

      <div className={styles.giftGrid}>

        {sortedGifts.map((gift) => (

          <GiftCard
            key={gift.id}
            gift={gift}
            loadingGiftId={loadingGiftId}
            onReserve={() =>
              setSelectedGift(gift)
            }
          />

        ))}

      </div>

      {selectedGift && (

        <ReserveModal
          gift={selectedGift}
          loading={loadingAction}
          onClose={() => setSelectedGift(null)}
          onReserve={(name) =>
            handleReserve(selectedGift.id, name)
          }
        />

      )}

    </section>
  );

}

export default GiftList;