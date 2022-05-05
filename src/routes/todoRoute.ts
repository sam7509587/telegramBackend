import express from "express";
import { addTask,editTask ,showTask, singleTask,deleteTask ,isCompleted } from "../controller";
import {verifyToken} from "../middleware";

const router = express.Router()
import {taskValidition,validateId} from "../validition";

router.route("/:id")
.put(verifyToken,taskValidition,validateId,editTask)
.get(verifyToken,validateId,singleTask)
.delete(verifyToken,validateId,deleteTask)

router.route("/")
.post(verifyToken,taskValidition,addTask)
.get(verifyToken,showTask)

router.put("/status/:id",verifyToken,validateId,isCompleted)

// router.post("/",verifyToken,taskValidition,addTask);
// router.put("/:id",verifyToken,taskValidition,validateId,editTask)
// router.get("/:id",verifyToken,validateId,singleTask)
// router.delete("/:id",verifyToken,validateId,deleteTask)
export = router
