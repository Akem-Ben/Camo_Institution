"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExam = void 0;
const courseModel_1 = __importDefault(require("../../models/courseModel/courseModel"));
const questionModel_1 = __importDefault(require("../../models/questionModel/questionModel"));
const getExam = async (request, response) => {
    try {
        const { course_id } = request.params;
        const getCourse = await courseModel_1.default.findOne({ where: { id: course_id } });
        if (!getCourse) {
            return response.status(404).json({
                status: `error`,
                message: `Course not found, check again`
            });
        }
        const getExam = await questionModel_1.default.findAll({ where: { course_id } });
        if (!getExam) {
            return response.status(404).json({
                status: `error`,
                message: `No exam found for this course`
            });
        }
        return response.status(200).json({
            status: `success`,
            message: `Exam fetched successfully`,
            getExam
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
exports.getExam = getExam;
