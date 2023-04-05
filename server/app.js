const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

//routes
const authRouter = require("./routes/authRoutes.js");
const taskRouter = require("./routes/taskRoutes.js");

app.use(cors());

app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ msg: "API" });
});

app.use("/api/auth", authRouter);
app.use("/api", taskRouter);

app.use(express.static(path.join(__dirname, "build")));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("Server started"));

// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const path = require("path");

// const app = express();

// const PORT = process.env.PORT || 8080;

// app.listen(PORT, () => console.log("Server started"));

// app.use(bodyParser.json());

// app.use(cors());

// // Serve the React application from the root route
// app.use(express.static(path.join(__dirname, "build")));

// // Handle GET requests to "/api/viewTaskList"
// app.get("/api/viewTaskList", (req, res) => {
//   const tasks = [];
//   res.json(tasks);
// });

// // Handle all other requests by serving the React application
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });
