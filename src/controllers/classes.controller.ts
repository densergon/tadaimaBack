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
        const { nombre, profesor } = req.body;
        console.log(nombre, profesor)
        try {
            const result = await pool.execute('INSERT INTO curso (curso,profesor) VALUES (?,?)', [nombre, profesor])
            res.send({ message: "Creado exitosamente" })
        } catch (error) {
            console.log(error)
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
    deleteClass: async (req: Request, res: Response) => {
        try {
            await pool.execute('DELETE FROM curso WHERE idCurso =?', [req.params.id]);

            res.status(200).send('Clase eliminada')
        } catch (error) {
            console.log(error)
            res.status(401).send({ message: "Hubo un error al eliminar" })
        }
    }
}