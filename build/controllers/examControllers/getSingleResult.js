"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleResult = void 0;
const courseModel_1 = __importDefault(require("../../models/courseModel/courseModel"));
const questionModel_1 = __importDefault(require("../../models/questionModel/questionModel"));
const studentResponse_1 = __importDefault(require("../../models/studentResponseModel/studentResponse"));
const enrollment_1 = __importDefault(require("../../models/enrollmentModel/enrollment"));
const examSection_1 = __importDefault(require("../../models/examSectionModel/examSection"));
const getSingleResult = async (request, response) => {
    try {
        const { course_id } = request.params;
        const getCourse = await courseModel_1.default.findOne({ where: { id: course_id } });
        if (!getCourse) {
            return response.status(404).json({
                status: `error`,
                message: `Course not found, check again`
            });
        }
        const getQuestions = await questionModel_1.default.findAll({ where: { course_id } });
        if (!getQuestions || !getQuestions.length) {
            return response.status(404).json({
                status: `error`,
                message: `No exam found for this course`
            });
        }
        const outPutArray = getQuestions.map((question) => {
            return {
                question_id: question.id,
                question_text: question.question.question_body,
                options: question.question.options,
                correct_answer: question.answer,
            };
        });
        const studentResponses = await studentResponse_1.default.findAll({ where: { course_id } });
        studentResponses.map((student_response) => {
            outPutArray.map((question) => {
                if (student_response.question_id === question.question_id) {
                    question.student_answer = student_response.response_text;
                }
            });
        });
        const getEnrollment = await enrollment_1.default.findOne({ where: { course_id } });
        const total_score = getEnrollment.total_score;
        const getSection = await examSection_1.default.findOne({ where: { course_id } });
        const section_score = getSection.total_score;
        return response.status(200).json({
            status: `success`,
            messsage: `Student Result successfully fetched`,
            outPutArray,
            student_score: total_score,
            section_score
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
exports.getSingleResult = getSingleResult;
