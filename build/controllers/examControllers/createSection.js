"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExamSection = void 0;
const uuid_1 = require("uuid");
const courseModel_1 = __importDefault(require("../../models/courseModel/courseModel"));
const examSection_1 = __importDefault(require("../../models/examSectionModel/examSection"));
const createExamSection = async (request, response) => {
    try {
        const { section_name, course_id, total_score, instructions, duration } = request.body;
        const course = (await courseModel_1.default.findOne({
            where: { id: course_id },
        }));
        if (!course) {
            return response.status(400).json({
                status: `error`,
                message: `Course not found, check again`,
            });
        }
        const section = (await examSection_1.default.findOne({
            where: { section_name },
        }));
        if (section) {
            return response.status(400).json({
                status: `error`,
                message: `Exam section already created`,
            });
        }
        const newExamSection = await examSection_1.default.create({
            id: (0, uuid_1.v4)(),
            section_name,
            course_id,
            total_score,
            instructions,
            duration
        });
        const confirm_section = (await examSection_1.default.findOne({
            where: { id: newExamSection.id },
        }));
        if (!confirm_section) {
            return response.status(400).json({
                status: `error`,
                message: `Unable to create section`,
            });
        }
        return response.status(200).json({
            status: `success`,
            message: `section created successfully`,
            confirm_section,
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
exports.createExamSection = createExamSection;
