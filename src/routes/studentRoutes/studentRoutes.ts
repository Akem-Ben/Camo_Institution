import express from "express";

import { studentAuthoriser } from "../../middleware/authorization";
import { getAllStudentsInInstitution } from "../../controllers/studentsControllers/getAllStudents";
import { enrollCourses } from "../../controllers/studentsControllers/enrollCourses";
import { getEnrolledCourses } from "../../controllers/studentsControllers/getEnrolledCourses";
import { getASingleCourse } from "../../controllers/studentsControllers/getSingleCourse";

const router = express.Router();

router.post("/enroll_course", studentAuthoriser, enrollCourses)
router.get("/all_students", getAllStudentsInInstitution)
router.get('/my_courses', studentAuthoriser, getEnrolledCourses)
router.get('/single_course/:course_id', studentAuthoriser, getASingleCourse)

export default router;
