require("dotenv").config({ path: __dirname + "/../../../.env" });
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const connectionString = process.env.MONGO_CONNSTR;
const cert = process.env.MONGO_CERT;
const dbName = process.env.MONGO_DBNAME;

async function createMongoClient() {
  try {
    const options = {
      useUnifiedTopology: true,
      ssl: true,
      sslValidate: true,
      sslCA: Buffer.from(cert, "base64"),
    };

    const client = new MongoClient(connectionString, options);
    return await client.connect();
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function insertOrUpdateDoc(client, collectionName, docId, document) {
  const options = { upsert: true };
  try {
    return await client
      .db(dbName)
      .collection(collectionName)
      .updateOne(
        { $or: [{ _id: ObjectID(docId) }, { _id: docId }] },
        { $set: document },
        options
      );
  } catch (err) {
    console.log("insertOrUpdateDoc ERROR:", err);
    throw err;
  } finally {
    client.close();
  }
}

async function createMany(client, collection, data) {
  try {
    return await client.db(dbName).collection(collection).insertMany(data);
  } catch (err) {
    console.log("createMany ERROR:", err);
    throw err;
  } finally {
    client.close();
  }
}

async function getDocs(client, collectionName, username) {
  const query = { user: username };
  try {
    return await client
      .db(dbName)
      .collection(collectionName)
      .find(query)
      .toArray();
  } catch (err) {
    console.log("getDocs ERROR:", err);
    throw err;
  } finally {
    client.close();
  }
}

async function deleteDoc(client, collectionName, docId) {
  const query = { _id: ObjectID(docId) };
  try {
    return await client.db(dbName).collection(collectionName).deleteOne(query);
  } catch (err) {
    console.log("deleteDoc ERROR: ", err);
    throw err;
  } finally {
    client.close();
  }
}

module.exports = {
  createMongoClient,
  insertOrUpdateDoc,
  createMany,
  getDocs,
  deleteDoc,
};
