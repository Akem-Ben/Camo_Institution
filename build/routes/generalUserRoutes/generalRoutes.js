"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registerUser_1 = require("../../controllers/generalUserControllers/registerUser");
const getAllUSers_1 = require("../../controllers/generalUserControllers/getAllUSers");
const forgetPassword_1 = require("../../controllers/generalUserControllers/forgetPassword");
const resetPassword_1 = require("../../controllers/generalUserControllers/resetPassword");
const userLogin_1 = require("../../controllers/generalUserControllers/userLogin");
const router = express_1.default.Router();
router.post("/create_user", registerUser_1.createUser);
router.get("/users", getAllUSers_1.getAllUsers);
router.post("/forget-password", forgetPassword_1.forgetPassword);
router.post("/reset-password/:token", resetPassword_1.resetPassword);
router.post("/login", userLogin_1.userLogin);
exports.default = router;
