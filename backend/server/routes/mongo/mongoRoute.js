// import dependencies and initialize the express router
const express = require("express");
const router = express.Router();

const {
  insertController,
  getController,
  loginController,
  signupController,
  deleteController,
} = require("../../useCases/mongo/mongoController");

router.post("/insert", insertController);
router.post("/get", getController);
router.post("/login", loginController);
router.post("/signup", signupController);
router.post("/delete", deleteController);

module.exports = router;
