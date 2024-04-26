import express from "express";

import { studentAuthoriser, lecturerAuthoriser, generalAuthoriser } from "../../middleware/authorization";
import { createExam } from "../../controllers/examControllers/createExam";
import { createExamSection } from "../../controllers/examControllers/createSection";
import { getExam } from "../../controllers/examControllers/getSingleExam";
import { getExamSection } from "../../controllers/examControllers/getExamSection";
import { submitExam } from "../../controllers/examControllers/submitExam";
import { markExams, sendTestMail } from "../../helpers/helpers";
import { getStudentResponse } from "../../controllers/examControllers/getStudentResponse";
import { getAllResults } from "../../controllers/examControllers/getAllResuts";
import { getSingleResult } from "../../controllers/examControllers/getSingleResult";

const router = express.Router();

router.post("/create_exam_section", lecturerAuthoriser, createExamSection)
router.post("/create_exam", lecturerAuthoriser, createExam)
router.get("/get_exam/:course_id", generalAuthoriser, getExam)
router.get("/get_exam_section/:course_id", studentAuthoriser, getExamSection)
router.post("/submit_exam/:course_id", studentAuthoriser, submitExam)
router.get("/get_student_response/:course_id", lecturerAuthoriser, getStudentResponse)
router.get("/get_results", studentAuthoriser, getAllResults)
router.get("/get_single_results/:course_id", studentAuthoriser, getSingleResult)


export default router;
