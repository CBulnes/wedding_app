import { useEffect } from "react";

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

  return (
    <main>

      <Navbar />

      <Hero />

      <GiftList />

      <CashGift />

    </main>
  );
}

export default App;