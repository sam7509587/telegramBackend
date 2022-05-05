import {Client} from "pg";
import {DB_USER,DB_HOST,DB_NAME,DB_PASS} from "./index"
// import text from "../model"
const client = new Client({
  user: DB_USER,
  host:DB_HOST,
  database: DB_NAME,
  password: DB_PASS,
  port: 5432,
})
    Promise.allSettled([
        client.connect()
        // ,
        // client.query(text)
    ]).then(()=>console.log("connected to db")).catch((e)=>console.log("not nonnected",e.message))

export = client;
