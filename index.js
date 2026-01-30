import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Fetch_rates from "./Functions/Fetch_rates.js";
import axios from "axios";
import path from "path";
import fs from "fs";
import GPPUSD from "./Functions/GPPUSD.js";
import JPPUSD from "./Functions/JPPUSD.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

const API_KEY = "793a834b52-732aac3eb6-t9ijlm";
const BASE_URL = "https://api.fastforex.io";

// API endpoint
app.get("/candles", (req, res) => {
  res.json(candleData);
});

app.use("/data", express.static("data"));

Fetch_rates(API_KEY, BASE_URL, axios, path, fs) // fetching data for EURUSD
GPPUSD(API_KEY, BASE_URL, axios, path, fs) // fetching data for GPPUSD
JPPUSD(API_KEY, BASE_URL, axios, path, fs) // fetching data for JPPUSD

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
