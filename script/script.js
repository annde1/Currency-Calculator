const form = document.querySelector("#currency-form");
const API_KEY = `fca_live_UxB3u9b7uC122jHYs8FpuNiEzV4WccqMOGWWZl6i`;
window.addEventListener("load", () => {
  const fetchWithAxios = async (
    apiAddress,
    amount,
    currencyTo,
    currencyFrom
  ) => {
    try {
      let { data } = await axios.get(apiAddress);
      const exchangeRate = data.data[currencyTo];
      const result = document.querySelector("#result");
      result.innerHTML = `${amount} ${currencyFrom} = ${(
        exchangeRate * amount
      ).toPrecision(4)} ${currencyTo}`;
    } catch (err) {
      console.log(err);
    }
  };
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const amount = +document.querySelector("#amount").value;
    const currencyFrom = document.querySelector("#currency-from").value;
    const currencyTo = document.querySelector("#currency-to").value;
    if (!amount || !currencyFrom || !currencyTo) {
      return;
    }
    fetchWithAxios(
      `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_UxB3u9b7uC122jHYs8FpuNiEzV4WccqMOGWWZl6i&base_currency=${currencyFrom}&currencies=${currencyTo}`,
      amount,
      currencyTo,
      currencyFrom
    );
  });
});
