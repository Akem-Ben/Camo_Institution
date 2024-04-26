import express from "express";

import { lecturerAuthoriser } from "../../middleware/authorization";
import { getAllLecturersInInstitution } from "../../controllers/lecturersControllers/getAllLecturers";

const router = express.Router();

router.get("/all_lecturers", getAllLecturersInInstitution)


export default router;
