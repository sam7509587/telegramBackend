import { NextFunction, Response } from "express";
import { SECRET_KEY } from "../config";
import client from "../config/db";
import * as jwt from "jsonwebtoken"
export const verifyToken = async (req: any, res: Response, next: NextFunction) => {
    const token: any = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(409).json({
            statusCode: 409, message: "token is required"
        })
    }
   return jwt.verify(token, SECRET_KEY, (err: any, result: any) => {
        if (err) {
             res.status(409).json({
                statusCode: 409, message: err.message
            })
        }
        const id: string = result.id
        client.query(`SELECT * FROM todouser WHERE id = '${id}'`, (err, result) => {
            if (err) {
                return res.status(409).json({
                    statusCode: 409, message: err.message
                })
            }
            if (result.rows.length === 0) {
                return res.status(409).json({
                    statusCode: 409, message: "user not found"
                })
            }
            else {
                req.user = result.rows[0];
                return next()
            }
        })
    })
}
