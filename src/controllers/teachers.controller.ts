import { Request, Response } from "express";
import pool from "../models/database";

export const teachersController = {
    getTeachers: async (req: Request, res: Response) => {
        try {
            const result = await pool.query('SELECT * FROM Usuarios where rol=2');
            res.send(result[0])
        } catch (error) {
            res.status(500).send({ message: 'Ocurrio un error' });
        }
    },
    getTeacher: async (req: Request, res: Response) => {
        interface Teacher {
            nombre: string
            apellidoPaterno: string,
            apellidoMaterno: string,
            email: string,
            password: string
        }
        try {
            const result = await pool.query('SELECT * FROM Usuarios where idUsuarios=? and rol=2', [req.params.id])
            const teacher = result[0] as Array<Teacher>;
            res.send(teacher[0])
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            })
        }
    },
    createTeacher: async (req: Request, res: Response) => {
        try {
            const { nombre, apellidoPaterno, apellidoMaterno, email, password } = req.body;
            const [insertResult] = await pool.execute(
                `INSERT INTO Usuarios (nombre,apellidoPaterno,apellidoMaterno,email,password,rol) VALUES (?,?,?,?,?,2)`,
                [nombre, apellidoPaterno, apellidoMaterno, email, password]
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
            const { nombre, apellidoPaterno, apellidoMaterno, email, password } = req.body;
            // Actualizar la información en la tabla usuarios
            await pool.execute(
                'UPDATE Usuarios SET nombre = ?, apellidoPaterno = ?, apellidoMaterno = ?, email= ?, password = ? WHERE idUsuarios = ?',
                [nombre, apellidoPaterno, apellidoMaterno, email, password, idTeacher]
            );

            res.status(200).send({ message: 'Usuario actualizado' });
        } catch (error) {
            console.error('Error al actualizar el profesor: ', error);
            res.status(500).send({ message: 'Error al actualizar el profesor' });
        }
    },
    deleteTeacher: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const nid = Number(id)
            if (await verificarCursoAsignado(nid) == true) {
                res.status(500).send({ message: 'No se puede borrar porque el profesor tiene cursos asignados' });
            } else {
                await pool.execute(`DELETE FROM Usuarios WHERE idUsuarios = ?`, [req.params.id]);
                res.status(200).send({ message: 'Borrrado exitosamente' })
            }

        } catch (error) {
            res.status(500).send({ message: 'Ocurro un error' });
        }
    }
}
interface Result {
    count: number;
}
const verificarCursoAsignado = async (profesorId: number) => {
    try {
        const rows = await pool.query(
            'SELECT COUNT(*) AS count FROM Curso WHERE profesor = ?',
            [profesorId]
        );

        const count = (rows[0] as Array<Result>)[0].count
        if (count > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error al verificar el curso asignado:', error);
    }
}
