interface Usuario {
    id_usuario: number,
    email: string,
    password: string,
    nombre: string | null,
    boleta: string | null,
    rol: number
}
declare namespace Express {
    export interface Request {
        user: Usuario;
    }
}