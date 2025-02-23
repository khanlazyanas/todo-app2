import express from "express"
import { isAuthentication } from "../middlewares/auth.js"
import { DeleteTask, getMyTask, newTask, UpdateTask } from "../controllers/task.js"

const router = express.Router()

router.post("/new",isAuthentication,newTask)
router.get("/my",isAuthentication,getMyTask)
router.route("/:id")
.put(isAuthentication,UpdateTask)
.delete(isAuthentication,DeleteTask)

export default router;