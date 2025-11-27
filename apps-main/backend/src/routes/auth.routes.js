import { signup, signin } from "../controllers/auth.controller.js";

import { Router } from "express";
const router = Router();
router.post("/signup", signup);
router.post("/signin", signin);
export default router;
