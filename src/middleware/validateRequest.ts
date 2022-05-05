import { NextFunction, Request,Response } from "express";
export const validateBody = (schema:any,req:Request,res:Response,next:NextFunction)=>{
    const result = schema.validate(req.body);
    if(result.error){
       const errorMsg =  result.error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, "")
        res.status(409).json({
            statusCode :409,message:errorMsg
        })
    }
    else{
        next()
    }
}
