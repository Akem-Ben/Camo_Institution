"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExamSection = void 0;
const examSection_1 = __importDefault(require("../../models/examSectionModel/examSection"));
const getExamSection = async (request, response) => {
    try {
        const { course_id } = request.params;
        const getSection = await examSection_1.default.findOne({ where: { course_id } });
        if (!getSection) {
            return response.status(404).json({
                status: `error`,
                message: `Section not found, check again`
            });
        }
        // const getExam = await Questions.findAll({where: {course_id}})
        // if(!getExam){
        //     return response.status(404).json({
        //         status: `error`,
        //         message: `No exam found for this course`
        //       });
        // }
        return response.status(200).json({
            status: `success`,
            message: `Section fetched successfully`,
            getSection
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
exports.getExamSection = getExamSection;
