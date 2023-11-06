import { MongoClient } from "mongodb";

const url = "mongodb://0.0.0.0:27017/";

const client = new MongoClient(url);

export default client;
