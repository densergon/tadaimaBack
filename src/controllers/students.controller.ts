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
    getStudentsCourse: async (req: Request, res: Response) => {
        const { id } = req.params;
        const curso = Number(id)
        try {
            const result = await pool.query('SELECT nombre,boleta FROM pertenece p INNER JOIN alumnos a ON p.idAlumno=a.idAlumno INNER JOIN usuarios u ON a.idUsuario=u.idUsuarios  where idCurso=?', [curso]);
            res.status(200).send(result[0])
        } catch (error) {
            console.log(error)
        }
    },
    getStudent: async (req: Request, res: Response) => {
        interface data {
            nombre: string,
            email: string,
            boleta: string | null
        }
        try {
            const result = await pool.query('SELECT nombre,boleta,email FROM usuarios INNER JOIN alumnos where idUsuarios=? and rol=3', [req.params.id])
            const teacher = result[0] as Array<data>;
            res.send(teacher[0])
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
    },
    boletaStudent: async (req: Request, res: Response) => {
        const { id, boleta } = req.body;
        console.log(id)
        console.log(boleta)
        try {
            const [result] = await pool.execute(
                'UPDATE Alumnos SET boleta = ? WHERE idUsuario = ?',
                [boleta, id]
            );

            // Verificar si la fila fue actualizada
            if ((result as any).affectedRows === 0) {
                return res.status(404).send('Alumno no encontrado o la boleta ya está actualizada.');
            }

            res.status(200).json({ message: 'Boleta actualizada con éxito' });
        } catch (error) {
            console.error('Error al actualizar la boleta:', error);
            res.status(500).send('Error en el servidor');
        }
    }
}