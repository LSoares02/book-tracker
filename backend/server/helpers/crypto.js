// Requiring module
const bcrypt = require("bcryptjs");

async function encryptPassword(password) {
  return await bcrypt.hash(password, 10);
}
async function checkPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

module.exports = { encryptPassword, checkPassword };
