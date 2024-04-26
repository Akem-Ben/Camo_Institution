"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getAllLecturers_1 = require("../../controllers/lecturersControllers/getAllLecturers");
const router = express_1.default.Router();
router.get("/all_lecturers", getAllLecturers_1.getAllLecturersInInstitution);
exports.default = router;
