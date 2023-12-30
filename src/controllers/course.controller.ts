import { Request, Response } from "express";
import pool from "../models/database";
interface Alumno {
    idAlumno: number
}

export const courseController = {
    getMyCourses: async (req: Request, res: Response) => {
        const { id } = req.params;
        interface Data {
            idAlumno: number,
            idUsuario: number,
            boleta: string
        }
        try {
            // Primero, obtén el idAlumno correspondiente al idUsuario
            const result = await pool.query(
                'SELECT idAlumno FROM alumnos WHERE idUsuario = ?',
                [id]
            );
            if ((result[0] as Array<Data>).length > 0) {
                const alumno = result[0] as Array<Data>
                const cursos = await pool.query(
                    'SELECT curso.idCurso, curso.curso, usuarios.nombre, usuarios.apellidoPaterno, usuarios.apellidoMaterno FROM pertenece INNER JOIN curso ON pertenece.idCurso = curso.idCurso INNER JOIN usuarios ON curso.profesor = usuarios.idUsuarios WHERE pertenece.idAlumno = ?',
                    [alumno[0].idAlumno]
                );

                res.status(200).send(cursos[0]);
            } else {

                return res.status(404).send('Alumno no encontrado.');
            }


        } catch (error) {
            console.error('Error al obtener los cursos:', error);
            res.status(500).send('Error en el servidor');
        }


    }
}