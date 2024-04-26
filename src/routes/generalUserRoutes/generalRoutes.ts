import express from "express";
import { createUser } from "../../controllers/generalUserControllers/registerUser";
import { getAllUsers } from "../../controllers/generalUserControllers/getAllUSers";
import { forgetPassword } from "../../controllers/generalUserControllers/forgetPassword";
import { resetPassword } from "../../controllers/generalUserControllers/resetPassword";
import { userLogin } from "../../controllers/generalUserControllers/userLogin";

const router = express.Router();

router.post("/create_user", createUser)
router.get("/users", getAllUsers)
router.post("/forget-password", forgetPassword)
router.post("/reset-password/:token", resetPassword)
router.post("/login", userLogin)

export default router;
