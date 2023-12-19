import { Router } from "express";
import { usuariosController } from "../controllers/usuarios.controller";

const router = Router();

router.get('/', usuariosController.getUsuarios)
router.get('/:id', usuariosController.getUsuario)
router.post('/', usuariosController.createUsuario)
router.put('/', usuariosController.updateUsuario)

export default router