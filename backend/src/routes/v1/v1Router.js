import { Router } from "express";
import hospitalRoutes from "./hospitalRoutes.js";
import authRoutes from "./authRoutes.js";

const v1Router = Router();

v1Router.use("/hospitals", hospitalRoutes);
v1Router.use("/auth", authRoutes);

export default v1Router;
