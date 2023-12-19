import { Request, Response } from "express"
import pool from "../models/database";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

interface Usuario {
    id_usuario: number,
    email: string,
    password: string,
    nombre: string | null,
    boleta: string | null,
    rol: number
}

export const authController = {
    login: async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            const [rows] = await pool.query('SELECT * FROM usuario WHERE email = ?', [email]);

            // Asegúrate de que rows es un array y tiene al menos un elemento
            if (Array.isArray(rows) && rows.length > 0) {
                const usuario = rows[0] as Usuario;

                const esValido = await bcrypt.compare(password, usuario.password);
                if (!esValido) {
                    return res.status(401).json({ error: "Contraseña incorrecta" });
                }

                // Crear un token JWT
                const token = jwt.sign(
                    { id_usuario: usuario.id_usuario, email: usuario.email, rol: usuario.rol },
                    'tu-clave-secreta',  // Reemplaza 'tu-clave-secreta' con una clave secreta real
                    { expiresIn: '1h' }  // Configura la duración del token
                );

                // Devolver el token al usuario
                return res.json({ token: token, rol: usuario.rol });
            } else {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}