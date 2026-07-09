import { useEffect, useState } from "react";

import Navbar from "./components/Navbar/Navbar";

import Hero from "./components/Hero/Hero";
import GiftList from "./components/GiftList/GiftList";
import CashGift from "./components/CashGift/CashGift";

function App() {

  useEffect(() => {

    if (window.location.hash) {

      window.history.replaceState(
        null,
        "",
        window.location.pathname
      );

      window.scrollTo(0, 0);
    }

  }, []);

  const [alert, setAlert] = useState({
    show: false,
    title: "",
    message: "",
    type: "success",
  });

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

  return (
    <main>

      {alert.show && (
        <div className="alertOverlay">
          <div className={`alertBox ${alert.type}`}>
            <h3>{alert.title}</h3>
            <p>{alert.message}</p>
          </div>
        </div>
      )}

      <Navbar />

      <Hero />

      <GiftList showAlert={showAlert} />

      <CashGift showAlert={showAlert} />

    </main>
  );
}

export default App;