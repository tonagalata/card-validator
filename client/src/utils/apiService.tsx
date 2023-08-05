interface CreditCardData {
  creditCardNumber: Number;
  expirationDate?: String;
  cvv?: Number;
}

export const postCreditCard = async (creditCardData: CreditCardData) => {
  const response = await fetch("http://localhost:9000/api/validate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creditCardData),
  });
  const data = await response.json();
  return data;
};
