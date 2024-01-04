import { Request, Response } from "express";
import pool from "../models/database"
import { RowDataPacket } from "mysql2";

export const homeworksController = {
    getHomeworks: async (req: Request, res: Response) => { //Tareas de una clase
        const clase = req.params.id;
        try {
            const result = await pool.query('SELECT * FROM tareas where curso=?', [clase])
            res.send(result[0])
        } catch (error) {
            console.log(error)
        }
    },
    getHomework: () => {

    },
    getCurrent: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            // Primero, obtén la boleta del alumno usando su idUsuario
            const [alumno]: any[] = await pool.query(
                'SELECT boleta FROM Alumnos WHERE idUsuario = ?',
                [id]
            );

            if (alumno.length === 0) {
                return res.status(404).send('Alumno no encontrado.');
            }

            const boleta = alumno[0].boleta;

            const [tareas]: any[] = await pool.query(
                `SELECT Tareas.*
                FROM Tareas
                INNER JOIN Curso ON Tareas.curso = Curso.idCurso
                INNER JOIN Pertenece ON Curso.idCurso = Pertenece.idCurso
                INNER JOIN Alumnos ON Pertenece.idAlumno = Alumnos.idAlumno
                WHERE Alumnos.boleta = ?
                  AND Tareas.dateDelivery > CURDATE()`,
                [boleta]
            );

            res.status(200).json(tareas);
        } catch (error) {
            console.error('Error al obtener las tareas:', error);
            res.status(500).send('Error en el servidor');
        }
    }
    ,
    createHomework: async (req: Request, res: Response) => {
        const { nombre, descripcion, dateDelivery, curso, prioridad } = req.body;
        const created = new Date()

        try {
            await pool.execute(`INSERT INTO tareas (nombre,descripcion,created,dateDelivery,curso, prioridad)
             VALUES (?,?,?,?,?,?);
            `, [nombre, descripcion, format(created), dateDelivery, curso, prioridad])
            res.status(200).send({ message: "Creada exitosamente" })
        } catch (error) {
            console.log(error);
            res.status(401).send({ message: "Error" })
        }
    },
    updateHomework: () => {

    },
    deleteHomework: () => {

    }
}

const format = (dateObject: Date) => {
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // getMonth() devuelve un valor de 0 a 11
    const day = dateObject.getDate().toString().padStart(2, '0');

    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
    const seconds = dateObject.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}