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
            const [rows] = await pool.query('SELECT * FROM usuarios WHERE correoElectronico = ?', [email]);

            // Asegúrate de que rows es un array y tiene al menos un elemento
            if (Array.isArray(rows) && rows.length > 0) {
                const usuario = rows[0] as Usuario;
                // Crear un token JWT
                const token = jwt.sign(
                    { id_usuario: usuario.idUsuarios, email: usuario.email, rol: usuario.rol },
                    key,
                    { expiresIn: '1h' }
                );

                // Devolver el token al usuario
                return res.json({ token: token, rol: usuario.rol, idUsuario: usuario.idUsuarios });
            } else {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    },
    facebook: async (req: Request, res: Response) => {

    }
}