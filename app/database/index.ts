import PouchDB from "pouchdb";
import logger from "../utils/logger";


const db = new PouchDB("stax-database");

db.info()
  .then(function (result) {
    logger({
        type: "info",
        title: `Information from created DB`,
        completeMessage: `${result}`,
      })
  })
  .catch(function (err) {
    console.log(err);
  });

export default db;
