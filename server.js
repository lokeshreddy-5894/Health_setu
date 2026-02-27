const path = require("path");
const express = require("express");
const { query } = require("./server-db");

require("dotenv").config();

const app = express();
const port = Number(process.env.PORT || 10000);

app.use(express.json());
app.use(express.static(path.resolve(__dirname)));

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "healthsetu", time: new Date().toISOString() });
});

app.get("/health/db", async (_req, res) => {
  try {
    const result = await query("select now() as db_time");
    res.json({ ok: true, dbTime: result.rows[0].db_time });
  } catch (error) {
    res.status(500).json({ ok: false, error: "database_connection_failed" });
  }
});

app.get("/", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.use((_req, res) => {
  res.status(404).json({ ok: false, error: "not_found" });
});

app.listen(port, () => {
  console.log(`HealthSetu server running on port ${port}`);
});
