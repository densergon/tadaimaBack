import { Request, Response } from "express";
import pool from "../models/database";

export const deliveredController = {
    getDeliveredHomeworks: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const result = await pool.query('SELECT idEntregadas,calificacion,nombre,boleta,uri FROM entregadas e INNER JOIN alumnos a ON e.idAlumno=a.idAlumno INNER JOIN usuarios u ON a.idUsuario=u.idUsuarios where idTarea=?', [id])
            res.status(200).send(result[0])
        } catch (error) {
            console.log(error)
            res.send({ message: "error" })
        }
    },
    getDeliveredHomework: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const result = await pool.query('SELECT * FROM tadaima.entregadas where idEntregadas=?', [id])
            res.status(200).send(result[0])
        } catch (error) {
            console.log(error)
            res.send({ message: "error" })
        }
    }
}

const calificar = `UPDATE entregadas SET calificacion=? WHERE (idEntregadas=?)`