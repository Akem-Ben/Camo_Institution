import express from "express";
import { createCourse } from "../../controllers/courseControllers/createCourse";
import { studentAuthoriser, lecturerAuthoriser } from "../../middleware/authorization";
import { getAllCoursesInInstitution } from "../../controllers/courseControllers/getAllCourses";
import { getAllCoursesInDepartment } from "../../controllers/courseControllers/getStudentCourses";

const router = express.Router();

router.post("/create_course", createCourse)
router.get("/all", getAllCoursesInInstitution)
router.get("/get_department_courses", studentAuthoriser, getAllCoursesInDepartment)

export default router;
