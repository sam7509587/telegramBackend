import express ,{Request,Response} from "express" ;
import {PORT} from "./config";
import router from "./routes"
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/api/user",router.userRoutes)
app.use("/api/todo",router.todoRoutes)
app.use("*",(_:Request,res:Response)=>{
    res.status(404).json({
        statusCode : 404,message :"route not found"
    })
})
app.listen(PORT,()=>{
    console.log(`http://127.0.0.1:${PORT}`)
});
