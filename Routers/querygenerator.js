import express from "express";
import { queryData } from "../DB/db-utils.js";
import fs from "fs/promises";

const querygenerate = express.Router();

let file;

querygenerate.post("/query", async (req, res) => {
  try {
    let data = req.body;
    console.log(data);
    let querydata;
    if (data.querytype === "insert") {
      querydata = await queryData("insertquery", "insert");
      console.log(querydata.type);
    }
    let qtype = querydata?.type;
    console.log(typeof qtype);
    let newdata;
    for (let i = 1; i <= data.colno; i++) {
      newdata =
        qtype.substring(0, 11) +
        " " +
        data.tname +
        " " +
        "(" +
        data[`cols` + `${i}`]
          .split(",")
          .map((val) => `'${val}'`)
          .join(",") +
        qtype.substring(18, 28) +
        data[`vals` + `${i}`]
          .split(",")
          .map((val) => `'${val}'`)
          .join(",") +
        ");";
      console.log(data[`cols` + `${i}`]);
      console.log(newdata);
      await fs.appendFile(
        `./Files/${data.tname}_${data.querytype}.txt`,
        `\n ${newdata}`
      );
    }

    file = `./Files/${data.tname}_${data.querytype}.txt`;

    res.send(`Inserted Successfully`);
  } catch (error) {
    console.log(error);
  }
});

querygenerate.get("/upload", async (req, res) => {
  res.download(file);
});

export default querygenerate;
