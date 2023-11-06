import client from "./db-client.js";

const queryData = async (name, obj) => {
  return await client
    .db("querygenerator")
    .collection(name)
    .findOne({ querytype: obj });
};

export { queryData };
