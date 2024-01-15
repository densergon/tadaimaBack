import { Request, Response } from "express"
import pool from "../models/database";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

interface Usuario {
    idUsuarios: number,
    email: string,
    password: string,
    nombre: string | null,
    boleta: string | null,
    rol: number
}
const key = 'TRABAJOTERMINAL';
export const authController = {
    login: async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            const rows = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);

            if ((rows[0] as Array<any>).length > 0) {
                const usuario = (rows[0] as Array<Usuario>)[0];
                if (usuario.password == password) {
                    // Crear un token JWT
                    const token = jwt.sign(
                        { idUsuario: usuario.idUsuarios, email: usuario.email, rol: usuario.rol, name: usuario.nombre },
                        key,
                        { expiresIn: '1h' }
                    );

                    // Devolver el token al usuario
                    return res.json({ token: token, idUsuario: usuario.idUsuarios, email: usuario.email, rol: usuario.rol, name: usuario.nombre });
                }
                return res.status(500).send({ message: "Contraseña incorrecta" });

            } else {
                return res.status(404).send({ message: "Usuario no encontrado" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: "Error interno del servidor" });
        }
    },
    facebook: async (req: Request, res: Response) => {
        const { id, name, email, token } = req.body;

        try {
            const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);

            if (Array.isArray(rows) && rows.length > 0) {
                const usuario = rows[0] as Usuario;
                // Crear un token JWT
                const token = jwt.sign(
                    { idUsuario: usuario.idUsuarios, email: usuario.email, rol: usuario.rol, name: usuario.nombre },
                    key,
                    { expiresIn: '1h' }
                );

                // Devolver el token al usuario
                return res.json({ token: token, idUsuario: usuario.idUsuarios, email: usuario.email, rol: usuario.rol, name: usuario.nombre });
            } else {
                let usuarioId;
                const [result] = await pool.execute(
                    'INSERT INTO Usuarios (nombre,apellidoPaterno,apellidoMaterno, email, password, rol) VALUES (?, ?, ?, ?,?,?)',
                    [name, "", "", email, '', 3]
                );

                // Acceder a insertId
                const insertId = (result as any).insertId;
                usuarioId = insertId;
                // Registrar el usuario en la tabla Alumnos
                await pool.query(
                    'INSERT INTO Alumnos (idAlumno, idUsuario, boleta) VALUES (?, ?, ?)',
                    [id, usuarioId, null]
                );

                const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);

                // Asegúrate de que rows es un array y tiene al menos un elemento
                if (Array.isArray(rows) && rows.length > 0) {
                    const usuario = rows[0] as Usuario;
                    // Crear un token JWT
                    const token = jwt.sign(
                        { idUsuario: usuario.idUsuarios, email: usuario.email, rol: usuario.rol, name: usuario.nombre },
                        key,
                        { expiresIn: '1h' }
                    );

                    // Devolver el token al usuario
                    return res.json({ token: token, idUsuario: usuario.idUsuarios, email: usuario.email, rol: usuario.rol, name: usuario.nombre });
                }




            }


            res.status(200).json({ message: 'Usuario registrado con éxito' });
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            res.status(500).send('Error en el servidor');
        }
    },
    boleta: async (req: Request, res: Response) => {
        const { id, boleta } = req.body;

        try {
            // Actualizar la boleta en la tabla Alumnos
            const [result] = await pool.execute(
                'UPDATE Alumnos SET boleta = ? WHERE idAlumno = ?',
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
    },
    user: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const result = await pool.query('SELECT * FROM usuarios where idUsuarios=?', [id])
            res.status(200).send((result[0] as Array<any>)[0])
        } catch (error) {
            console.log(error)
        }
    }
}