"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDepartment = void 0;
const facultyModel_1 = __importDefault(require("../../models/facultyModel/facultyModel"));
const departmentModel_1 = __importDefault(require("../../models/departmentModel/departmentModel"));
const uuid_1 = require("uuid");
const createDepartment = async (request, response) => {
    try {
        const { faculty_name, department_name } = request.body;
        const checkFaculty = (await facultyModel_1.default.findOne({
            where: { faculty_name },
        }));
        if (!checkFaculty) {
            return response.status(400).json({
                status: `error`,
                message: `Faculty does not exist`,
            });
        }
        const checkDepartment = await departmentModel_1.default.findOne({
            where: { faculty_name, department_name },
        });
        if (checkDepartment) {
            return response.status(400).json({
                status: `error`,
                message: `This Department already exists in this faculty`,
            });
        }
        const createdDepartment = (await departmentModel_1.default.create({
            id: (0, uuid_1.v4)(),
            institution_name: checkFaculty.institution_name,
            faculty_name,
            department_name,
        }));
        const findDepartment = (await departmentModel_1.default.findOne({
            where: {
                institution_name: checkFaculty.institution_name,
                id: createdDepartment.id,
                faculty_name,
                department_name,
            },
        }));
        if (findDepartment) {
            return response.status(200).json({
                status: `success`,
                message: `Department created successfully`,
                findDepartment,
            });
        }
        return response.status(400).json({
            status: `error`,
            message: `Unable to create Department, try again`,
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
exports.createDepartment = createDepartment;
