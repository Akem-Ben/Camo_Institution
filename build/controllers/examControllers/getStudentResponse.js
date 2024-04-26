"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentResponse = void 0;
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const courseModel_1 = __importDefault(require("../../models/courseModel/courseModel"));
const studentResponse_1 = __importDefault(require("../../models/studentResponseModel/studentResponse"));
const getStudentResponse = async (request, response) => {
    try {
        const { course_id } = request.params;
        const { student_id } = request.query;
        if (!student_id) {
            return response.status(404).json({
                status: `error`,
                message: `Student id not found, check again`
            });
        }
        const getCourse = await courseModel_1.default.findOne({ where: { id: course_id } });
        if (!getCourse) {
            return response.status(404).json({
                status: `error`,
                message: `Course not found, check again`
            });
        }
        const getStudent = await userModel_1.default.findOne({
            where: { id: student_id, user_type: `Student` }
        });
        if (!getStudent) {
            return response.status(404).json({
                status: `error`,
                message: `Student not found, check again`
            });
        }
        const fetchStudentResponse = await studentResponse_1.default.findAll({ where: { course_id, student_id: student_id } });
        if (!fetchStudentResponse) {
            return response.status(404).json({
                status: `error`,
                message: `No Answer found for this student`,
            });
        }
        return response.status(200).json({
            status: `success`,
            message: `Answers fetched successfully`,
            fetchStudentResponse
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
exports.getStudentResponse = getStudentResponse;
