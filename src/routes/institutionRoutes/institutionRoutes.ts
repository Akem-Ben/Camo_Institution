import express from "express";
import {createInstitution} from '../../controllers/institutionControllers/createInstitution'
import {createDepartment } from '../../controllers/institutionControllers/createDepartment'
import {createFaculty} from '../../controllers/institutionControllers/createFaculty'

const router = express.Router();

router.post("/create_institution", createInstitution)
router.post("/create_faculty", createFaculty)
router.post("/create_department", createDepartment)


export default router;
