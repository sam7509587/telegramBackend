import * as dotenv from "dotenv";
dotenv.config();
export const PORT = process.env.PORT
export const DB_USER = process.env.DB_USER
export const DB_HOST = process.env.DB_HOST
export const DB_NAME = process.env.DB_NAME
export const DB_PASS = process.env.DB_PASS
export const DB_PORT = process.env.DB_PORT
export const SECRET_KEY:any = process.env.SECRET_KEY

