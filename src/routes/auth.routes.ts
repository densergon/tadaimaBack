import { Router } from "express";
import { authController } from "../controllers/auth.controller";

const router = Router();

router.post('/custom/', authController.login)
router.post('/facebook/', authController.facebook)
export default router