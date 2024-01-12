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
            const result = await pool.query('SELECT * FROM entregadas where idEntregadas=?', [id])
            res.status(200).send(result[0])
        } catch (error) {
            console.log(error)
            res.send({ message: "error" })
        }
    },
    calificar: async (req: Request, res: Response) => {
        const { id, calificacion } = req.body;
        try {
            const result = await pool.query('UPDATE entregadas SET calificacion=? WHERE (idEntregadas=?)', [calificacion, id])
            res.status(200).send(result[0])
        } catch (error) {
            console.log(error)
            res.send({ message: "error" })
        }
    },
    entregarTarea: async (req: Request, res: Response) => {
        const { idUsuario, idTarea } = req.body;
        try {
            const getIdAlumno = await pool.query(`SELECT idAlumno FROM alumnos where idUsuario=?`, [idUsuario]);

            const idAlumno = ((getIdAlumno[0] as Array<any>)[0] as any).idAlumno;
            console.log(idAlumno);
            const result = await pool.execute(`INSERT INTO entregadas (idAlumno,idTarea) VALUES (?,?)`, [idAlumno, idTarea]);
            //res.status(200).send(result[0])
            res.send({ message: 'ok' })
        } catch (error) {
            console.log(error)
            res.send({ message: "error" })
        }
    }
}
