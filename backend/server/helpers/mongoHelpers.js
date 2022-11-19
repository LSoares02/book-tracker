require("dotenv").config({ path: __dirname + "/../../.env" });
const {
  createMongoClient,
  insertOrUpdateDoc,
  createMany,
  getDocs,
  deleteDoc,
} = require("../common/database/mongo");

const booksCollection = process.env.MONGO_BOOKS_COLLECTION;
const usersCollection = process.env.MONGO_USERS_COLLECTION;

async function insertOnMongo({ user, document }) {
  const collection = user ? usersCollection : booksCollection;
  const client = await createMongoClient();
  if (Array.isArray(document)) {
    return await createMany(client, collection, document);
  } else {
    const id = document._id;
    delete document._id;
    return await insertOrUpdateDoc(
      client,
      collection,
      id ? id : null,
      document
    );
  }
}

async function getFromMongo({ user, username }) {
  const collection = user ? usersCollection : booksCollection;
  const client = await createMongoClient();
  return await getDocs(client, collection, username);
}

async function deleteFromMongo({ user, _id }) {
  const collection = user ? usersCollection : booksCollection;
  const client = await createMongoClient();
  return await deleteDoc(client, collection, _id);
}

module.exports = {
  insertOnMongo,
  getFromMongo,
  deleteFromMongo,
};
