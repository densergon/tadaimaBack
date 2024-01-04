import { Request, Response } from "express";
import pool from "../models/database";

export const adminController = {
    getAdmin: async (req: Request, res: Response) => {
        interface Admin {
            nombre: string,
            apellidoPaterno: string,
            apellidoMaterno: string,
            email: string
        }
        try {
            const result = await pool.query('SELECT * FROM Usuarios where idUsuarios=?', [req.params.id])
            const admin = result[0] as Array<Admin>;
            res.send({
                persona: `${admin[0].nombre} ${admin[0].apellidoPaterno} ${admin[0].apellidoMaterno}`,
                email: admin[0].email
            })
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error'
            })
        }
    }
}