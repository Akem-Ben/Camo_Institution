"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllStudentsInInstitution = void 0;
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const getAllStudentsInInstitution = async (request, response) => {
    try {
        const allStudents = await userModel_1.default.findAll({ where: { user_type: "Student" } });
        if (allStudents) {
            if (allStudents.length === 0) {
                return response.status(404).json({
                    status: `success`,
                    message: `No Students found`,
                    allStudents
                });
            }
            else {
                return response.status(200).json({
                    status: `success`,
                    message: `Students found successfully`,
                    allStudents
                });
            }
        }
        return response.status(400).json({
            status: `error`,
            message: `Unable to find Students, try again`,
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
exports.getAllStudentsInInstitution = getAllStudentsInInstitution;
