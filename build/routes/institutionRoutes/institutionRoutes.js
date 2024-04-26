"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createInstitution_1 = require("../../controllers/institutionControllers/createInstitution");
const createDepartment_1 = require("../../controllers/institutionControllers/createDepartment");
const createFaculty_1 = require("../../controllers/institutionControllers/createFaculty");
const router = express_1.default.Router();
router.post("/create_institution", createInstitution_1.createInstitution);
router.post("/create_faculty", createFaculty_1.createFaculty);
router.post("/create_department", createDepartment_1.createDepartment);
exports.default = router;
