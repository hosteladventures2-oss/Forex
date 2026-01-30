import fs from "fs";
import path from "path";

const Fetch_rates = (API_KEY, BASE_URL, axios) => {
  let prices = [];

  const DATA_DIR = path.join(process.cwd(), "./data/JSON_files");
  const DATA_FILE = path.join(DATA_DIR, "EURUSD.json");

  // Ensure directory exists
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Helper function to safely read existing candles
  function readCandlesSafely() {
    try {
      if (!fs.existsSync(DATA_FILE)) return [];
      const raw = fs.readFileSync(DATA_FILE, "utf8");
      if (!raw.trim()) return [];
      return JSON.parse(raw);
    } catch (err) {
      console.error("⚠️ JSON corrupted, resetting file");
      return [];
    }
  }

  async function fetchEURUSD() {
    try {
      const res = await axios.get(`${BASE_URL}/fetch-all`, {
        params: {
          api_key: API_KEY,
          from: "EUR",
          to: "USD",
        },
      });

      const price = res.data.results.USD;
      prices.push(price);
     // console.log("Price:", price);
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

    // 1-minute candle timestamp (seconds)
    const time = Math.floor(Date.now() / 60000) * 60;

    const candle = { time, open, high, low, close };

    // Safely read existing candles
    const candles = readCandlesSafely();

    const index = candles.findIndex(c => c.time === time);

    if (index !== -1) {
      candles[index] = candle; // overwrite existing candle for the minute
    } else {
      candles.push(candle);
    }

    // Ensure ascending order
    candles.sort((a, b) => a.time - b.time);

    fs.writeFileSync(DATA_FILE, JSON.stringify(candles, null, 2));

   // console.log("Saved candle:", candle);

    prices = []; // reset for next candle
  }

  // Fetch every 10 seconds
  setInterval(fetchEURUSD, 5000);

  // Calculate OHLC every 60 seconds
  setInterval(calculateOHLC, 60000);
};

export default Fetch_rates;
