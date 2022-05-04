import express from "express";
import {signUp}from "../controller/userController";
let router = express.Router();
router.post("/",signUp) 
export =router
