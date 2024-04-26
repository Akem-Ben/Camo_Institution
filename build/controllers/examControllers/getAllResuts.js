"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllResults = void 0;
const enrollment_1 = __importDefault(require("../../models/enrollmentModel/enrollment"));
const getAllResults = async (request, response) => {
    try {
        const student_id = request.user.id;
        const getStudentEnrollments = await enrollment_1.default.findAll({ where: { student_id } });
        if (!getStudentEnrollments || getStudentEnrollments.length === 0) {
            return response.status(404).json({
                status: "error",
                message: "Not enrolled in any courses, please check again"
            });
        }
        const allResults = getStudentEnrollments.map((course) => {
            return {
                course_id: course.course_id,
                course_code: course.course_code,
                students_score: course.total_score,
                exam_written: course.isExamWritten,
            };
        });
        if (allResults.length > 0) {
            return response.status(200).json({
                status: "success",
                allResults
            });
        }
        return response.status(404).json({
            status: "error",
            message: "No results found",
            allResults
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
exports.getAllResults = getAllResults;
