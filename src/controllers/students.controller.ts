import { Request, Response } from "express";
import pool from "../models/database";

export const studentsController = {
    getStudents: async (req: Request, res: Response) => {
        try {
            const result = await pool.query('SELECT * FROM usuarios where rol=3');
            res.send(result[0])
        } catch (error) {

        }
    },
    getStudent: async (req: Request, res: Response) => {
        try {
            const result = await pool.query('SELECT * FROM usuarios where idUsuarios=? and rol=3', [req.params.id])
            res.send(result[0])
        } catch (error) {
            res.send({
                message: 'Ocurrio un error'
            })
        }
    },
    createStudent: async (req: Request, res: Response) => {
        try {
            const { nombre, apellidoPaterno, apellidoMaterno, correoElectronico, password, boleta } = req.body;
            const [insertResult] = await pool.execute(
                `INSERT INTO usuarios (nombre,apellidoPaterno,apellidoMaterno,correoElectronico,password,rol,boleta) VALUES (?,?,?,?,?,3,?)`,
                [nombre, apellidoPaterno, apellidoMaterno, correoElectronico, password, boleta]
            );
            res.send('Usuario registrado')

        } catch (error) {
            console.error('Error al crear el alumno: ', error);
            res.status(500).send({ message: 'Error al crear el alumno' });
        }
    },
    updateStudent: async (req: Request, res: Response) => {
        try {
            const alumnoId = req.params.id;
            const { nombre, apellidoPaterno, apellidoMaterno, correoElectronico, password, boleta } = req.body;
            // Actualizar la información en la tabla usuarios
            await pool.execute(
                'UPDATE usuarios SET nombre = ?, apellidoPaterno = ?, apellidoMaterno = ?, correoElectronico = ?, password = ?,boleta=? WHERE idUsuarios = ?',
                [nombre, apellidoPaterno, apellidoMaterno, correoElectronico, password, boleta, alumnoId]
            );

            res.status(200).send({ message: 'Alumno actualizado con éxito.' });
        } catch (error) {
            console.error('Error al actualizar el alumno: ', error);
            res.status(500).send({ message: 'Error al actualizar el alumno' });
        }
    }
}