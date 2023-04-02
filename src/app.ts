import express from "express";
const app = express();

app.route("/users")
  .get((req, res) => {
    // get all users
  })

  .post((req, res) => {
    // create a user
  })

  .put((req, res) => {
    // noop
  })

  .delete((req, res) => {
    // noop
  })

app.route("/users/:userId")
  .get((req, res) => {
    // get specific user
  })

  .post((req, res) => {
    // noop
  })

  .put((req, res) => {
    // edit specific user
  })

  .delete((req, res) => {
    // delete specific user
  })

app.use("/teams", (req, res) => {
  // ...
})

app.use("/tasks", (req, res) => {
  // ...
})

app.use("/meetings", (req, res) => {
  // ...
})