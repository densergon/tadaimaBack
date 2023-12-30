import { Request, Response } from "express";
import pool from "../models/database";

export const classesController = {
    getClasses: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const result = await pool.query('SELECT * FROM curso INNER JOIN usuarios ON curso.profesor=idUsuarios', [id]);
            res.send(result[0])
        } catch (error) {

        }
    },
    getClass: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const result = await pool.query('SELECT curso,idCurso FROM curso WHERE idCurso=?', [id])
            res.send((result[0] as Array<any>)[0])
        } catch (error) {

        }
    },
    createClass: async (req: Request, res: Response) => {
        try {
            const { asignatura, profesor } = req.body;
            const result = await pool.execute('INSERT INTO clases (asignatura,profesor) VALUES (?,?)', [asignatura, profesor])
            res.send({ message: "Creado exitosamente" })
        } catch (error) {

        }
    },
    updateClass: async (req: Request, res: Response) => {
        try {
            const { asignatura, profesor } = req.body;
            const result = await pool.execute('UPDATE clases SET asignatura=?,profesor=? WHERE idClases=?', [asignatura, profesor, req.params.id])
            res.send({ message: "Modificado exitosamente" })
        } catch (error) {

        }
    },
    deleteClass: (req: Request, res: Response) => {
        res.send('Clase eliminada')
    }
}