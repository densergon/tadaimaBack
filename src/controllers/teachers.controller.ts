import { Request, Response } from "express";
import pool from "../models/database";

export const teachersController = {
    getTeachers: async (req: Request, res: Response) => {
        try {
            const result = await pool.query('SELECT * FROM usuarios where rol=2');
            res.send(result[0])
        } catch (error) {

        }
    },
    getTeacher: async (req: Request, res: Response) => {
        interface Teacher {
            nombre: string
            apellidoPaterno: string,
            apellidoMaterno: string,
            correoElectronico: string,
            password: string
        }
        try {
            const result = await pool.query('SELECT * FROM usuarios where idUsuarios=? and rol=2', [req.params.id])
            const teacher = result[0] as Array<Teacher>;
            res.send(teacher[0])
        } catch (error) {
            res.send({
                message: 'Ocurrio un error'
            })
        }
    },
    createTeacher: async (req: Request, res: Response) => {
        try {
            const { nombre, apellidoPaterno, apellidoMaterno, correoElectronico, password } = req.body;
            const [insertResult] = await pool.execute(
                `INSERT INTO usuarios (nombre,apellidoPaterno,apellidoMaterno,correoElectronico,password,rol) VALUES (?,?,?,?,?,2)`,
                [nombre, apellidoPaterno, apellidoMaterno, correoElectronico, password]
            );
            res.send({ message: 'Usuario registrado' })

        } catch (error) {
            console.error('Error al crear el profesor: ', error);
            res.status(500).send({ message: 'Error al crear el profesor' });
        }
    },
    updateTeacher: async (req: Request, res: Response) => {
        try {
            const idTeacher = req.params.id;
            const { nombre, apellidoPaterno, apellidoMaterno, correoElectronico, password } = req.body;
            // Actualizar la información en la tabla usuarios
            await pool.execute(
                'UPDATE usuarios SET nombre = ?, apellidoPaterno = ?, apellidoMaterno = ?, correoElectronico = ?, password = ? WHERE idUsuarios = ?',
                [nombre, apellidoPaterno, apellidoMaterno, correoElectronico, password, idTeacher]
            );

            res.status(200).send({ message: 'Usuario actualizado' });
        } catch (error) {
            console.error('Error al actualizar el profesor: ', error);
            res.status(500).send({ message: 'Error al actualizar el profesor' });
        }
    },
    deleteTeacher: async (req: Request, res: Response) => {
        try {
            await pool.execute(`DELETE FROM usuarios WHERE idUsuarios = ?`, [req.params.id]);
            res.status(200).send({ message: 'Borrrado exitosamente' })
        } catch (error) {

        }
    }
}