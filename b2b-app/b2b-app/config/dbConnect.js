import { MongoClient } from "mongodb";
const url = "mongodb://127.0.0.1:27017";
const client= new MongoClient(url);
const dbName = "b2b";
const collectName = "wishlist"

export { url, client, dbName, collectName};