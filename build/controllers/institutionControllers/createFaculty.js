"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFaculty = void 0;
const institutionModel_1 = __importDefault(require("../../models/institutionModel/institutionModel"));
const facultyModel_1 = __importDefault(require("../../models/facultyModel/facultyModel"));
const uuid_1 = require("uuid");
const createFaculty = async (request, response) => {
    try {
        const { institution_name, faculty_name } = request.body;
        const checkSchool = await institutionModel_1.default.findOne({
            where: { institution_name },
        });
        if (!checkSchool) {
            return response.status(400).json({
                status: `error`,
                message: `Institution does not exist`,
            });
        }
        const checkFaculty = await facultyModel_1.default.findOne({
            where: { institution_name, faculty_name },
        });
        if (checkFaculty) {
            return response.status(400).json({
                status: `error`,
                message: `Faculty already exists`,
            });
        }
        const createdFaculty = (await facultyModel_1.default.create({
            id: (0, uuid_1.v4)(),
            institution_name,
            faculty_name,
        }));
        const findFaculty = (await facultyModel_1.default.findOne({
            where: { institution_name, id: createdFaculty.id, faculty_name },
        }));
        if (findFaculty) {
            return response.status(200).json({
                status: `success`,
                message: `Faculty created successfully`,
                findFaculty,
            });
        }
        return response.status(400).json({
            status: `error`,
            message: `Unable to create Faculty, try again`,
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
exports.createFaculty = createFaculty;
