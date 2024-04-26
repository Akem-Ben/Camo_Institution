"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnrolledCourses = void 0;
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const enrollment_1 = __importDefault(require("../../models/enrollmentModel/enrollment"));
const departmentModel_1 = __importDefault(require("../../models/departmentModel/departmentModel"));
const courseModel_1 = __importDefault(require("../../models/courseModel/courseModel"));
const getEnrolledCourses = async (request, response) => {
    try {
        const studentId = request.user.id;
        const student = await userModel_1.default.findOne({ where: { id: studentId } });
        const { semester, session } = request.query;
        const findEnrolledCourses = await enrollment_1.default.findAll({ where: { student_id: studentId, session, semester, department_id: student.department_id } });
        let coursesWithDepartments = [];
        if (findEnrolledCourses) {
            if (findEnrolledCourses.length === 0) {
                return response.status(404).json({
                    status: `success`,
                    message: `No courses found`,
                    coursesWithDepartments
                });
            }
            else {
                coursesWithDepartments = await Promise.all(findEnrolledCourses.map(async (course) => {
                    const departments = (await departmentModel_1.default.findOne({
                        where: {
                            id: course.department_id,
                        },
                    }));
                    const examReady = (await courseModel_1.default.findOne({
                        where: {
                            id: course.course_id
                        }
                    }));
                    return {
                        ...course,
                        examinationStatus: examReady.isExamReady,
                        departmentName: departments.department_name
                    };
                }));
                if (findEnrolledCourses.length === 0) {
                    return response.status(404).json({
                        status: `success`,
                        message: `Not yet enrolled for any courses in this semester`,
                        coursesWithDepartments
                    });
                }
                return response.status(200).json({
                    status: `success`,
                    message: `Courses fetched`,
                    coursesWithDepartments
                });
            }
        }
        return response.status(404).json({
            status: `error`,
            message: `Unable to fetch courses, contact The STudent Affairs Division`
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error, Contact Student Unit Division`
        });
    }
};
exports.getEnrolledCourses = getEnrolledCourses;
