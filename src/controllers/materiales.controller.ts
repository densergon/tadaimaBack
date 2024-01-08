import { Request, Response } from "express";
import pool from "../models/database";

export const materialesController = {
    getMateriales: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const result = await pool.query('SELECT * FROM materiales WHERE curso=?', [id])
            res.status(200).send(result[0])
        } catch (error) {

        }
    },
    getMaterial: () => {

    },
    createMaterial: async (req: Request, res: Response) => {
        const { curso, uri, nombre } = req.body;

        try {
            // Insertar el nuevo material en la base de datos
            const [result] = await pool.execute(
                'INSERT INTO materiales (curso, uri, nombre) VALUES (?, ?, ?)',
                [curso, uri, nombre]
            );

            // Enviar una respuesta de éxito
            res.status(200).json({ message: 'Material creado con éxito' });
        } catch (error) {
            console.error('Error al crear el material:', error);
            res.status(500).send('Error en el servidor');
        }
    },
    updateMaterial: () => {

    },
    deleteMaterial: async (req: Request, res: Response) => {
        const { id } = req.params;
        console.log(id)
        try {
            const result = await pool.execute('DELETE FROM materiales WHERE idMateriales =?', [id])
            res.status(200).send({ message: 'Borrado existosamente' })
        } catch (error) {
            console.log(error)
        }
    }

}