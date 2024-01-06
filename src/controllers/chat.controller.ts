import { Request, Response } from "express"
import pool from "../models/database"

interface Mensaje {
    de: number,
    para: number,
    contenido: string,
    created: string,
    conversacion: number
}
export const chatController = {
    newMessage: async (mensaje: Mensaje) => {
        const { de, para, contenido, created, conversacion } = mensaje
        try {
            await pool.execute(`INSERT INTO mensajes (de,para,contenido,created,conversacion) VALUES (?,?,?,?,?)`, [de, para, contenido, created, conversacion])
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    },
    getMessages: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const mensajes = await pool.query(`SELECT * FROM mensajes where conversacion=?`, [id])
            res.send(mensajes[0])
        } catch (error) {
            console.log(error)
            res.status(401).send({ message: "Error" })
        }
    },
    getConversaciones: async (req: Request, res: Response) => {
        const { id } = req.params;
        const query = `SELECT u.nombre,m.contenido,m.created,m.conversacion FROM sala s INNER JOIN usuarios u ON s.usuario=u.idUsuarios INNER JOIN conversacion c ON s.conversacion=c.idConversacion INNER JOIN mensajes m ON c.ultimo=m.idMensaje  where s.usuario!=?`;
        try {
            const result = await pool.query(query, [id])
            res.status(200).send(result[0])
        } catch (error) {
            console.log(error)
        }
    },
    getNombre: async (req: Request, res: Response) => {
        const { conversacion, usuario } = req.body;
        console.log(conversacion, usuario)
        try {
            const result = await pool.query(`SELECT nombre FROM sala s INNER JOIN usuarios u ON s.usuario=u.idUsuarios where s.conversacion=? && s.usuario!=?`, [conversacion, usuario])
            res.status(200).send(result[0])
        } catch (error) {
            console.log(error)
        }
    }
}