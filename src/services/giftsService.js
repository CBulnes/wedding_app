const API_URL = "https://script.google.com/macros/s/AKfycbwijOmjB6tlU4eF08sn-IAE1F7ikQImZjl9_Qv9RKbrBrBFkMSuzlxeJBjWCNrdzrx63A/exec";

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