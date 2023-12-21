import { Request, Response } from "express";
import pool from "../models/database"

export const homeworksController = {
    getHomeworks: async (req: Request, res: Response) => {
        const clase = req.params.id;
        console.log(clase)
        try {
            const result = await pool.query('SELECT * FROM tareas where idClase=?', [clase])
            console.log(result)
            res.send(result[0])
        } catch (error) {

        }
    },
    getHomework: () => {

    },
    createHomework: () => {

    },
    updateHomework: () => {

    },
    deleteHomework: () => {

    }
}