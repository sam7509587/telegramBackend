import { Request, Response } from "express";
import client from "../config/db";
import * as jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";

export const signUp = async (req: Request, res: Response) => {
    try {
        const { email, password }: { email: string, password: string } = req.body;
        const data = await client.query(`SELECT * FROM todouser WHERE email ='${email}'`);
        if (data.rows.length != 0) {
            return res.status(409).json({
                statusCode: 409, message: "email already present"
            })
        }
        const savedData = await client.query(`INSERT INTO todouser (email,password)VALUES('${email}','${password}') RETURNING *`)
        return res.status(201).json({
            statusCode: 201, message: "signup successfull", data: savedData.rows
        })
    } catch (err: any) {
        return res.status(400).json({ statusCode: 400, message: err.message })
    }
}
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const data = await client.query(`SELECT * FROM todouser WHERE email ='${email}'`);
        if (data.rows.length === 0) {
            return res.status(400).json({
                statusCode: 400, message: "no user found"
            })
        }
        const loginDetails = await client.query(`SELECT * FROM todouser WHERE email ='${email}' AND password='${password}' Limit 1`);
        if (loginDetails.rows.length === 0) {
            return res.status(409).json({
                statusCode: 409, message: "invalid email or password"
            })
        }
        if (loginDetails.rows[0].isactive === false) {
            await client.query(`UPDATE todouser SET isactive='${true}' WHERE id = '${loginDetails.rows[0].id}' RETURNING *`)
        }
        const payload = { id: loginDetails.rows[0].id }
        const token = await jwt.sign(payload, SECRET_KEY)
        return res.status(200).json({
            statusCode: 200, message: "login successfull", token
        })
    } catch (err: any) {
        return res.status(400).json({ statusCode: 400, message: err.message })
    }
}
export const updateUser = async (req: any, res: Response) => {
    try {
        const { password } = req.body
        if (!password) {
            return res.status(400).json({ statusCode: 400, message: "nothing to change" })
        }
        const updatedUser = await client.query(`UPDATE todouser SET password = '${password}' WHERE id= '${req.user.id}'  RETURNING *`)
        return res.status(200).json({
            statusCode: 200,
            message: " the user has been updated",
            data: updatedUser.rows[0]
        })
    }
    catch (err: any) {
        return res.status(400).json({ statusCode: 400, message: err.message })
    }
}
export const showAllUser = async (_: Request, res: Response) => {
    const data = await client.query(`SELECT * FROM todouser`);
    if (data.rows.length === 0) {
        return res.status(400).json({
            statusCode: 400, message: "no user found"
        })
    }
    return res.status(200).json({
        statusCode: 200, message: "users data found", data
    })
}
export const deleteUser = async (req: any, res: Response) => {
    try {
        const userFound = await client.query(`SELECT email FROM  todouser  WHERE isactive ='${true}' AND id = '${req.user.id}'`)
        if (userFound.rows.length === 0) {
            return res.status(400).json({
                statusCode: 400, message: `no user found`
            })
        }
        await client.query(`UPDATE todouser SET isactive='${false}' WHERE id = '${req.user.id}' RETURNING *`);
        return res.status(200).json({ statusCode: 200, message: "user data has been deleted" })
    } catch (error: any) {
        return res.status(400).json({ statusCode: 400, message: error.message })
    }
}
