import { Request, Response } from "express";
import pool from "../models/database";

export const usuariosController = {
    getUsuarios: async (req: Request, res: Response) => {
        const result = await pool.query('SELECT * FROM usuario')
        res.send(result[0])
    },
    getUsuario: (req: Request, res: Response) => {
        res.send('Get usuario')
    },
    createUsuario: (req: Request, res: Response) => {
        res.send('Post usuario')
    },
    updateUsuario: (req: Request, res: Response) => {
        res.send('Put usuario')
    }
}