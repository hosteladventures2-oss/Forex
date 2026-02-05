const Fetch_rates = (API_KEY, BASE_URL, axios, GBPUSD) => {

  let prices = [];

    const place_array = async (time, open, high, low, close) => {


// no need to pass fetch as a parameter
        await fetch("http://forexapi.atwebpages.com/json_files/GPBUSD_fetch.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ time, open, high, low, close }),

        });


   }


  async function fetchEURUSD() {
    try {
      const res = await axios.get(`${BASE_URL}/fetch-all`, {
        params: {
          api_key: API_KEY,
          from: "GBP",
          to: "USD",
        },
      });

      const price = res.data.results.USD;
      prices.push(price);
      //console.log("Tick:", price);

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

    GBPUSD.push({
      time,
      open,
      high,
      low,
      close,
    });

    console.log("GPBUSD candle:", GBPUSD[GBPUSD.length - 1]);

    place_array(time, open, high, low, close)

    prices.length = 0;
  }

  setInterval(fetchEURUSD, 5000);
  setInterval(calculateOHLC, 9000000);
};

export default Fetch_rates;
