import { Router } from "express";
import authControllers from "../../controller/auth-controllers.js"; // Import properly

const { register, login } = authControllers; // Destructure correctly

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;