import express from "express" ;
import {PORT} from "./config";
import router from "./routes/userroutes"
const app = express();
require("./config/db")

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/",router)
app.listen(PORT,()=>{
    console.log(`http://127.0.0.1:${PORT}`)
});
