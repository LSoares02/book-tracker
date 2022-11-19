// import dependencies and initialize the express router
const express = require("express");
const router = express.Router();

const {
  insertController,
  getController,
  deleteController,
} = require("../../useCases/mongo/mongoController");

router.post("/insert", insertController);
router.post("/get", getController);
router.post("/delete", deleteController);

module.exports = router;
