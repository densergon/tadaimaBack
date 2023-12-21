import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'


export interface IPayload {
    id_usuario: number;
    iat: number;
    rol: number;
}

export const authRequired = (req: Request, res: Response, next: NextFunction) => {
    try {
        const key = 'TRABAJOTERMINAL';
        const token = req.header('token');
        if (!token) return res.status(401).json('Access Denied');
        const payload = jwt.verify(token, key) as IPayload;
        req.user.id_usuario = payload.id_usuario;
        next();
    } catch (e) {
        res.status(400).send('Invalid Token');
    }
}