import client from "../config/db";
import {  Response } from "express";
export const addTask =  async (req: any, res: Response) => {
    try {
        const { title, description } = req.body
        const findTask = await client.query(`SELECT * FROM todolist WHERE title ='${title}' AND userid = '${req.user.id}' `)
        if (findTask.rows.length > 0) {
            return res.status(409).json({
                statusCode: 409, message: "title already present"
            })
        }
        const addTask = await client.query(`INSERT INTO todolist (title,description,userid)
         VALUES('${title}','${description}','${req.user.id}') RETURNING *`)
        return res.status(201).json({
            statusCode: 201, message: "task has been added", data: addTask.rows
        })
    } catch (error:any) {
        return res.status(400).json({ statusCode: 400, message: error.message })
    }
}
export const editTask = async (req: any, res: Response) => {
    const { title, description } = req.body;
    const { id } = req.params
    if (!title && !description) {
        return res.status(400).json({
            statusCode: 400, message:  "nothing to change"
        })
    }
    try {
        const taskFound = await client.query(`SELECT * FROM todolist WHERE userid = '${req.user.id}' AND id='${id}' `);
        if (taskFound.rows.length === 0) {
            return res.status(400).json({
                statusCode: 400, message: `no task found with this id -${id}`
            })
        }
        // const titleFound =await client.query(`SELECT * FROM todolist WHERE userid = '${req.user.id}' AND id='${id}' AND title = '${title}'`);
        // if (titleFound.rows.length === 0) {
        //     return res.status(400).json({
        //         statusCode: 400, message: `no task found with this id -${id}`
        //     })
        // }
        const updatedData = await client.query(`UPDATE todolist SET title ='${title}',description ='${description}'
         WHERE userid = '${req.user.id}' AND id = ${id} RETURNING *`)
        return res.status(200).json({
            statusCode: 200, message: "task has been updated ", data: updatedData.rows[0]
        })
    } catch (error:any) {
        return res.status(400).json({ statusCode: 400, message: error.message })
    }
}
export const showTask = async (req: any, res: Response) => {
    try {
        const fetchedTask = await client.query(`SELECT todolist.id,title,description,iscomplted,
    email FROM todolist LEFT  OUTER  JOIN todouser
    ON todolist.userid = todouser.id WHERE userid = '${req.user.id}'`);
        return res.status(200).json({ statusCode: 200, message: "task fetched", data: fetchedTask.rows })
    } catch (error:any) {
        return res.status(400).json({ statusCode: 400, message: error.message })
    }
}
export const singleTask = async (req: any, res: Response) => {
    const { id } = req.params
    try {
        const fetchedTask = await client.query(`SELECT todolist.id,title,description,iscomplted ,
    email FROM todolist LEFT  OUTER  JOIN todouser
    ON todolist.userid = todouser.id WHERE userid = '${req.user.id}' AND todolist.id='${id}'`);
        return res.status(200).json({ statusCode: 200, message: "task fetched", data: fetchedTask.rows })
    } catch (error:any) {
        return res.status(400).json({ statusCode: 400, message: error.message })
    }
}
export const deleteTask = async(req: any, res: Response)  => {
    try {
        const { id } = req.params
        const taskFound = await client.query(`SELECT title FROM  todolist  WHERE id ='${id}' AND userid = '${req.user.id}'`)
        if (taskFound.rows.length === 0) {
            return res.status(400).json({
                statusCode: 400, message: `no task found with this id -${id}`
            })
        }
        await client.query(`DELETE FROM todolist WHERE id =${id} AND userid = '${req.user.id}'`)
        return res.status(200).json({
            statusCode: 200, message: `task has been deleted with id - ${id}`
        })
    } catch (error:any) {
        return res.status(400).json({ statusCode: 400, message: error.message })
    }
}
export const isCompleted = async(req: any, res: Response) => {
    try {
        const { id } = req.params
        const taskFound = await client.query(`SELECT iscomplted FROM  todolist  WHERE id ='${id}' AND userid = '${req.user.id}'`)
        if (taskFound.rows.length === 0) {
            return res.status(400).json({
                statusCode: 400, message: `no task found with this id -${id}`
            })
        }
        let updatedData;
        if (taskFound.rows[0].iscomplted === true) {
            updatedData = await client.query(`UPDATE todolist SET iscomplted=false WHERE userid = '${req.user.id}' AND id='${id}' RETURNING *`)
            return res.status(200).json({ statusCode: 200, message: "task set to incompleted", data: updatedData.rows[0] })
        } else {
            updatedData = await client.query(`UPDATE todolist SET iscomplted=true WHERE userid = '${req.user.id}'AND id='${id}' RETURNING *`)
            return res.status(200).json({ statusCode: 200, message: "task set to completed", data: updatedData.rows[0] })

        }
    } catch (error:any) {
        return res.status(400).json({ statusCode: 400, message: error.message })
    }
}
