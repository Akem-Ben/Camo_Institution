"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getASingleCourse = void 0;
const courseModel_1 = __importDefault(require("../../models/courseModel/courseModel"));
const getASingleCourse = async (request, response, next) => {
    try {
        const { course_id } = request.params;
        const course = await courseModel_1.default.findOne({ where: { id: course_id } });
        if (!course) {
            return response.status(404).json({
                status: `error`,
                message: `Course does not exist`
            });
        }
        return response.status(200).json({
            status: `success`,
            message: `Course fetched successfully`,
            course
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
exports.getASingleCourse = getASingleCourse;
