require("dotenv").config();
// import dependencies and initialize express
const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// enable parsing of http request body
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// routes and api calls
const healthRoute = require("./routes/health/healthRoute");
app.use("/health", healthRoute);

const mongoRoute = require("./routes/mongo/mongoRoute");
app.use("/mongo", mongoRoute);

app.use(express.static(path.join(__dirname, "../build")));

// default path to serve up index.html (single page application)
app.use("", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../build", "index.html"));
});
// error handler for unmatched routes or api calls
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// start node server
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`App UI available http://localhost:${port}`);
});
