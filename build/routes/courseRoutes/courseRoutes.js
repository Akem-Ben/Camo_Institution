"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createCourse_1 = require("../../controllers/courseControllers/createCourse");
const authorization_1 = require("../../middleware/authorization");
const getAllCourses_1 = require("../../controllers/courseControllers/getAllCourses");
const getStudentCourses_1 = require("../../controllers/courseControllers/getStudentCourses");
const router = express_1.default.Router();
router.post("/create_course", createCourse_1.createCourse);
router.get("/all", getAllCourses_1.getAllCoursesInInstitution);
router.get("/get_department_courses", authorization_1.studentAuthoriser, getStudentCourses_1.getAllCoursesInDepartment);
exports.default = router;
