// import dependencies and initialize the express router
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Up");
});

module.exports = router;
