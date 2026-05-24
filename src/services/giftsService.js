const API_URL =
  "https://script.google.com/macros/s/AKfycbxyLklpkxK1iWJe_fAxzUGYweAnp3FanC56py6twROEJHfyQavo0Y3sRfy8VuRLcBPw/exec";

export async function fetchGifts() {
  const response = await fetch(API_URL);

  return response.json();
}

export async function reserveGift(giftId, personName) {
  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      id: giftId,
      name: personName,
    }),
  });
  return response.json();
}
