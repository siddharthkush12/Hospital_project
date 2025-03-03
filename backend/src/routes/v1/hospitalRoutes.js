import { Router } from "express";
import { createHospital, getHospitalsByCity, updateHospital, deleteHospital, addHospitalDetails } from "../../controller/hostpitalController.js";
import { authMiddleware, adminMiddleware } from "../../middleware/authMiddleware.js";

const router = Router();

router.post("/create", authMiddleware, adminMiddleware, createHospital);
router.get("/", authMiddleware, getHospitalsByCity);
router.put("/update", authMiddleware, adminMiddleware, updateHospital);
router.delete("/delete", authMiddleware, adminMiddleware, deleteHospital);
router.post("/details", authMiddleware, addHospitalDetails);

export default router;
