import express from "express";
import {getAdmins, getPerformance} from "../controllers/management.js"
const router = express.Router();
router.get("/admin",getAdmins)
router.get("/performance/:id",getPerformance)

export default router;