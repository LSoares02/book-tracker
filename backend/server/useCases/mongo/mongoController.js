const {
  insertOnMongo,
  getFromMongo,
  deleteFromMongo,
} = require("../../helpers/mongoHelpers");

async function insertController(req, res) {
  // req.body should be something like:
  //   {
  //     user: true,
  //     document: {
  //       username: "example@email.com",
  //       password: "****"
  //     },
  //   };

  res.send(await insertOnMongo(req.body));
}

async function getController(req, res) {
  // req.body should be something like:
  //   {
  //     user: true,
  //     username: "example@email.com"
  //   };

  res.send(await getFromMongo(req.body));
}

async function deleteController(req, res) {
  // req.body should be something like:
  //   {
  //     user: true,
  //     _id: "63781d8c3fcdf64b0b0d5698"
  //   };

  res.send(await deleteFromMongo(req.body));
}

module.exports = {
  insertController,
  getController,
  deleteController,
};
