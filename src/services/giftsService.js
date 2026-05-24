const API_URL =
  "https://script.google.com/macros/s/AKfycbxyLklpkxK1iWJe_fAxzUGYweAnp3FanC56py6twROEJHfyQavo0Y3sRfy8VuRLcBPw/exec";

export async function fetchGifts() {
  const response = await fetch(API_URL);

  return response.json();
}

export async function reserveGift(
  giftId,
  personName,
  reservationId
) {

  await fetch(API_URL, {

    method: "POST",
    mode: "no-cors",

    body: JSON.stringify({
      id: giftId,
      name: personName,
      reservationId,
    }),

  });
}