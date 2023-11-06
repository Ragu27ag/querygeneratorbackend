import { MongoClient } from "mongodb";

// const url = "mongodb://0.0.0.0:27017/";

const url = process.env.CONNECTION_URL;

const client = new MongoClient(url);

export default client;
