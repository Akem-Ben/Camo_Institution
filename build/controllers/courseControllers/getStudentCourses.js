"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCoursesInDepartment = void 0;
const courseModel_1 = __importDefault(require("../../models/courseModel/courseModel"));
const departmentModel_1 = __importDefault(require("../../models/departmentModel/departmentModel"));
const getAllCoursesInDepartment = async (request, response) => {
    try {
        const { department_id, level, session, semester } = request.query;
        const allDepartmentalCourses = await courseModel_1.default.findAll({ where: { department_id: department_id, level: level, semester: semester, session: session } });
        let coursesWithDepartments = [];
        if (allDepartmentalCourses) {
            if (allDepartmentalCourses.length === 0) {
                return response.status(404).json({
                    status: `success`,
                    message: `No courses found`,
                    coursesWithDepartments
                });
            }
            else {
                coursesWithDepartments = await Promise.all(allDepartmentalCourses.map(async (course) => {
                    const departments = (await departmentModel_1.default.findOne({
                        where: {
                            id: course.department_id,
                        },
                    }));
                    return {
                        ...course,
                        departmentName: departments.department_name
                    };
                }));
                return response.status(200).json({
                    status: `success`,
                    message: `Courses found successfully`,
                    coursesWithDepartments
                });
            }
        }
        return response.status(400).json({
            status: `error`,
            message: `Unable to find courses, try again`
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
exports.getAllCoursesInDepartment = getAllCoursesInDepartment;
