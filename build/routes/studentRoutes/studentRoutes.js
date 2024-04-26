"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorization_1 = require("../../middleware/authorization");
const getAllStudents_1 = require("../../controllers/studentsControllers/getAllStudents");
const enrollCourses_1 = require("../../controllers/studentsControllers/enrollCourses");
const getEnrolledCourses_1 = require("../../controllers/studentsControllers/getEnrolledCourses");
const getSingleCourse_1 = require("../../controllers/studentsControllers/getSingleCourse");
const router = express_1.default.Router();
router.post("/enroll_course", authorization_1.studentAuthoriser, enrollCourses_1.enrollCourses);
router.get("/all_students", getAllStudents_1.getAllStudentsInInstitution);
router.get('/my_courses', authorization_1.studentAuthoriser, getEnrolledCourses_1.getEnrolledCourses);
router.get('/single_course/:course_id', authorization_1.studentAuthoriser, getSingleCourse_1.getASingleCourse);
exports.default = router;
