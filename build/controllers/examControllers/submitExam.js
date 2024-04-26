"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitExam = void 0;
const courseModel_1 = __importDefault(require("../../models/courseModel/courseModel"));
const uuid_1 = require("uuid");
const studentResponse_1 = require("../../models/studentResponseModel/studentResponse");
const enrollment_1 = __importDefault(require("../../models/enrollmentModel/enrollment"));
const helpers_1 = require("../../helpers/helpers");
const submitExam = async (request, response, next) => {
    try {
        const { course_id } = request.params;
        const findCourse = await courseModel_1.default.findOne({ where: { id: course_id } });
        if (!findCourse) {
            return response.status(404).json({
                status: `error`,
                message: `Course not found`
            });
        }
        const checkPastResponse = await studentResponse_1.Responses.findOne({ where: { course_id: course_id, student_id: request.user.id } });
        if (checkPastResponse) {
            return response.status(400).json({
                status: `error`,
                message: `You have already submitted this exam`
            });
        }
        for (let index = 0; index < request.body.length; index++) {
            const answer = request.body[index];
            if (answer.answer_text === "" || answer.answer_text === null) {
                return response.status(400).json({
                    status: `error`,
                    message: `Answer text is required`
                });
            }
            const newAnswer = await studentResponse_1.Responses.create({
                id: (0, uuid_1.v4)(),
                question_id: answer.question_id,
                course_id: course_id,
                response_text: answer.answer_text,
                response_score: 0,
                student_id: request.user.id
            });
        }
        const checkAnswers = await studentResponse_1.Responses.findAll({ where: { course_id: course_id, student_id: request.user.id } });
        if (checkAnswers && checkAnswers.length > 0) {
            await enrollment_1.default.update({ isExamWritten: true }, { where: { course_id, student_id: request.user.id } });
            await (0, helpers_1.markExams)(request.user.id, course_id);
            return response.status(200).json({
                status: `success`,
                message: `Exam submitted successfully`,
                checkAnswers
            });
        }
        return response.status(400).json({
            status: `error`,
            message: `Exam not submitted, try again`
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error, contact admin please`
        });
    }
};
exports.submitExam = submitExam;
