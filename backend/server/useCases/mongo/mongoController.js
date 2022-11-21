const { encryptPassword, checkPassword } = require("../../helpers/crypto");
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

async function signupController(req, res) {
  // req.body should be something like:
  //   {
  //     user: true,
  //     username: "example@email.com",
  //     document: {
  //       username: "example@email.com",
  //       password: "****"
  //     },
  //   };
  const emailAccounts = await getFromMongo(req.body);
  if (emailAccounts.length == 0) {
    req.body.document.password = await encryptPassword(
      req.body.document.password
    );

    res.send({ result: "created", reason: await insertOnMongo(req.body) });
  } else {
    res.send({
      result: "ignored",
      reason: "email already exists",
    });
  }
}

async function loginController(req, res) {
  // req.body should be something like:
  //   {
  //     user: true,
  //     username: "example@email.com",
  //     password: "****"
  //
  //   };
  const emailAccounts = await getFromMongo(req.body);
  if (emailAccounts.length > 0) {
    emailAccounts.forEach(async (user, index) => {
      if (await checkPassword(req.body.password, user.password)) {
        res.send(user);
      } else {
        if (index === emailAccounts.length - 1) res.send(null);
      }
    });
  } else {
    res.send(null);
  }
}

module.exports = {
  insertController,
  getController,
  deleteController,
  signupController,
  loginController,
};
