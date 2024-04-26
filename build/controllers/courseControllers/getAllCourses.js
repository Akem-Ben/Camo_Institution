"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCoursesInInstitution = void 0;
const courseModel_1 = __importDefault(require("../../models/courseModel/courseModel"));
const getAllCoursesInInstitution = async (request, response) => {
    try {
        const allCourses = await courseModel_1.default.findAll({});
        if (allCourses) {
            if (allCourses.length === 0) {
                return response.status(404).json({
                    status: `success`,
                    message: `No courses found`,
                    allCourses,
                });
            }
            else {
                return response.status(200).json({
                    status: `success`,
                    message: `Courses found successfully`,
                    allCourses,
                });
            }
        }
        return response.status(400).json({
            status: `error`,
            message: `Unable to find Course, try again`,
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
exports.getAllCoursesInInstitution = getAllCoursesInInstitution;
