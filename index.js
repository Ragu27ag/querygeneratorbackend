import express from "express";
import cors from "cors";
import client from "./DB/db-client.js";
import querygenerate from "./Routers/querygenerator.js";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

client.connect();

app.get("/health", (req, res) => {
  res.send("connected");
});

app.use("/", querygenerate);

app.listen("5000", () => console.log(`http://localhost:5000`));
