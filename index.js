import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Fetch_rates from "./Functions/Fetch_rates.js";
import axios from "axios";
//import fetch from "node-fetch"; // or just fetch in Node 20+
import https from "https";
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

let EURUSD = [] // display this array
let GPBUSD = []
let JPYUSD = []

app.get("/EURUSD", (req, res) => {
  res.json(EURUSD);
});

app.get("/GBPUSD", (req, res) => {
  res.json(GPBUSD);
});

app.get("/JPYUSD", (req, res) => {
  res.json(JPYUSD);
});


//app.use("/data", express.static("data"));

Fetch_rates(API_KEY, BASE_URL, axios, EURUSD,  https) // fetching data for EURUSD
//GPPUSD(API_KEY, BASE_URL, axios, GPBUSD) // fetching data for GPPUSD
//JPPUSD(API_KEY, BASE_URL, axios, JPYUSD) // fetching data for JPPUSD



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
