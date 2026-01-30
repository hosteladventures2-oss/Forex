const Fetch_rates = (API_KEY, BASE_URL, axios, JPYUSD) => {

  let prices = [];

  let EURUSD = JPYUSD

  //console.log(EURUSD)

  async function fetchEURUSD() {
    try {
      const res = await axios.get(`${BASE_URL}/fetch-all`, {
        params: {
          api_key: API_KEY,
          from: "JPY",
          to: "USD",
        },
      });

      const price = res.data.results.USD;
      prices.push(price);
      console.log("Tick:", price);

    } catch (err) {
      console.error("Fetch error:", err.message);
    }
  }

  function calculateOHLC() {
    if (prices.length === 0) return;

    const open = prices[0];
    const close = prices[prices.length - 1];
    const high = Math.max(...prices);
    const low = Math.min(...prices);

    const time = Math.floor(Date.now() / 60000) * 60;

    JPYUSD.push({
      time,
      open,
      high,
      low,
      close,
    });

    console.log("EURUSD candle:", EURUSD[EURUSD.length - 1]);

    prices.length = 0;
  }

  setInterval(fetchEURUSD, 5000);
  setInterval(calculateOHLC, 60000);
};

export default Fetch_rates;
