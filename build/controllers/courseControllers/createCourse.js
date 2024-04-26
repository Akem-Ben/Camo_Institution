"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourse = void 0;
const uuid_1 = require("uuid");
const courseModel_1 = __importDefault(require("../../models/courseModel/courseModel"));
const departmentModel_1 = __importDefault(require("../../models/departmentModel/departmentModel"));
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const createCourse = async (request, response) => {
    try {
        const { title, course_code, credit_unit, level, semester, session, lecturer_id, department_id, faculty_id } = request.body;
        const checkDepartment = await departmentModel_1.default.findOne({
            where: { id: department_id },
        });
        if (!checkDepartment) {
            return response.status(400).json({
                status: `error`,
                message: `Department does not exist`,
            });
        }
        const checkCourse = await courseModel_1.default.findOne({
            where: { department_id, course_code },
        });
        if (checkCourse) {
            return response.status(400).json({
                status: `error`,
                message: `This Course already exists in this department`,
            });
        }
        const checkLecturer = await userModel_1.default.findOne({ where: { id: lecturer_id, } });
        if (!checkLecturer) {
            return response.status(400).json({
                status: `error`,
                message: `Lecturer does not exist`,
            });
        }
        const createdCourse = (await courseModel_1.default.create({
            id: (0, uuid_1.v4)(),
            title,
            course_code,
            credit_unit,
            semester,
            session,
            department_id,
            level,
            lecturer_id,
            faculty_id,
            isExamReady: "No"
        }));
        const findCourse = (await courseModel_1.default.findOne({
            where: { department_id, id: createdCourse.id, course_code, credit_unit },
        }));
        if (findCourse) {
            return response.status(200).json({
                status: `success`,
                message: `Course created successfully`,
                findCourse,
            });
        }
        return response.status(400).json({
            status: `error`,
            message: `Unable to create Course, try again`,
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error, contact admin please`,
        });
    }
};
exports.createCourse = createCourse;
