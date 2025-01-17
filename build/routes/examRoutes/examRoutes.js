"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorization_1 = require("../../middleware/authorization");
const createExam_1 = require("../../controllers/examControllers/createExam");
const createSection_1 = require("../../controllers/examControllers/createSection");
const getSingleExam_1 = require("../../controllers/examControllers/getSingleExam");
const getExamSection_1 = require("../../controllers/examControllers/getExamSection");
const submitExam_1 = require("../../controllers/examControllers/submitExam");
const getStudentResponse_1 = require("../../controllers/examControllers/getStudentResponse");
const getAllResuts_1 = require("../../controllers/examControllers/getAllResuts");
const getSingleResult_1 = require("../../controllers/examControllers/getSingleResult");
const router = express_1.default.Router();
router.post("/create_exam_section", authorization_1.lecturerAuthoriser, createSection_1.createExamSection);
router.post("/create_exam", authorization_1.lecturerAuthoriser, createExam_1.createExam);
router.get("/get_exam/:course_id", authorization_1.generalAuthoriser, getSingleExam_1.getExam);
router.get("/get_exam_section/:course_id", authorization_1.studentAuthoriser, getExamSection_1.getExamSection);
router.post("/submit_exam/:course_id", authorization_1.studentAuthoriser, submitExam_1.submitExam);
router.get("/get_student_response/:course_id", authorization_1.lecturerAuthoriser, getStudentResponse_1.getStudentResponse);
router.get("/get_results", authorization_1.studentAuthoriser, getAllResuts_1.getAllResults);
router.get("/get_single_results/:course_id", authorization_1.studentAuthoriser, getSingleResult_1.getSingleResult);
exports.default = router;
