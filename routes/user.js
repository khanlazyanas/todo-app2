import express from "express"
import { getMyDetail, login, logout, register } from "../controllers/user.js";
import { isAuthentication } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login",login)
router.get("/logout",logout)
router.post("/new",register)
router.get("/me",isAuthentication ,getMyDetail)

export default router;