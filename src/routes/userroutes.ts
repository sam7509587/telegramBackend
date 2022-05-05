import express from "express";
import {signUp,login,updateUser,showAllUser,deleteUser}from "../controller/userController";
import { verifyToken } from "../middleware";
import { userValidition } from "../validition";
const router = express.Router();

router.route("/")
.get(showAllUser)
.post(userValidition,signUp)
.put(verifyToken,updateUser)
.delete(verifyToken,deleteUser)

router.post("/login",userValidition,login)

export =router
