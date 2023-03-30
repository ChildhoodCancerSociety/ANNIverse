const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("Server started"));

app.use(bodyParser.json());

app.use(cors());

// Serve the React application from the root route
app.use(express.static(path.join(__dirname, "build")));

// Handle GET requests to "/api/viewTaskList"
app.get("/api/viewTaskList", (req, res) => {
  console.log(typeof localStorage);
  const tasks = JSON.parse(localStorage.getItem("task")) || [];
  res.json(tasks);
});

// Handle all other requests by serving the React application
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
