"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExam = void 0;
const uuid_1 = require("uuid");
const courseModel_1 = __importStar(require("../../models/courseModel/courseModel"));
const examSection_1 = __importDefault(require("../../models/examSectionModel/examSection"));
const questionModel_1 = __importStar(require("../../models/questionModel/questionModel"));
const createExam = async (request, response) => {
    try {
        const course = (await courseModel_1.default.findOne({
            where: { id: request.body.course_id },
        }));
        if (!course) {
            return response.status(400).json({
                status: `error`,
                message: `Course not found, check again`,
            });
        }
        const section = (await examSection_1.default.findOne({
            where: { id: request.body.section_id },
        }));
        if (!section) {
            return response.status(400).json({
                status: `error`,
                message: `Exam section not found`,
            });
        }
        const checkExam = await questionModel_1.default.findOne({ where: { course_id: request.body.course_id } });
        if (checkExam) {
            return response.status(400).json({
                status: `error`,
                message: `Exam already created for this course`,
            });
        }
        let examsArray = request.body.questions;
        for (let index = 0; index < examsArray.length; index++) {
            const newExam = await questionModel_1.default.create({
                id: (0, uuid_1.v4)(),
                type: questionModel_1.QuestionType.MULTIPLE_CHOICE,
                question: examsArray[index].question,
                course_id: request.body.course_id,
                section_id: request.body.section_id,
                score: examsArray[index].score,
                answer: examsArray[index].answer
            });
        }
        const confirm_questions = (await questionModel_1.default.findAll({
            where: { course_id: request.body.course_id },
        }));
        if (!confirm_questions) {
            return response.status(400).json({
                status: `error`,
                message: `Unable to create exams`,
            });
        }
        await courseModel_1.default.update({ isExamReady: courseModel_1.examReady.YES }, { where: { id: request.body.course_id } });
        return response.status(200).json({
            status: `success`,
            message: `Exams created successfully`,
            confirm_questions,
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`,
        });
    }
};
exports.createExam = createExam;
