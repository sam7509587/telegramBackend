import {Client} from "pg";
const client = new Client({
  user: 'pg4',
  host: 'localhost',
  database: 'telegram_backend',
  password: '1234',
  port: 5432,
})
const text = `
    CREATE TABLE IF NOT EXISTS "users"(
        "id" SERIAL PRIMARY KEY,
        "full_name" VARCHAR(100) NOT NULL,
        "email" VARCHAR(100) NOT NULL,
        "password" VARCHAR(100) NOT NULL,
        "role" VARCHAR(15) NOT NULL,
        "is_Active" BOOLEAN DEFAULT true,
        "created_at" timestamp DEFAULT NOW(),
        "is_verified" BOOLEAN DEFAULT false
    );`;
    
client.connect().then(()=>{
    client.query(text).catch((err)=>{
        console.log("err",err)
    })
    console.log("connected");
}).catch((err)=>console.log("not connected",err));



module.exports = client;
