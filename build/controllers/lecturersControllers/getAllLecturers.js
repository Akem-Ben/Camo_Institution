"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllLecturersInInstitution = void 0;
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const getAllLecturersInInstitution = async (request, response) => {
    try {
        const allLecturers = await userModel_1.default.findAll({ where: { user_type: "Lecturer" } });
        if (allLecturers) {
            if (allLecturers.length === 0) {
                return response.status(404).json({
                    status: `success`,
                    message: `No Lecturers found`,
                    allLecturers
                });
            }
            else {
                return response.status(200).json({
                    status: `success`,
                    message: `Lecturers found successfully`,
                    allLecturers
                });
            }
        }
        return response.status(400).json({
            status: `error`,
            message: `Unable to find Lecturers, try again`,
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
exports.getAllLecturersInInstitution = getAllLecturersInInstitution;
