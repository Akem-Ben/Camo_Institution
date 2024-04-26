"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInstitution = void 0;
const uuid_1 = require("uuid");
const institutionModel_1 = __importDefault(require("../../models/institutionModel/institutionModel"));
const createInstitution = async (request, response) => {
    try {
        const { institution_name } = request.body;
        const checkSchool = await institutionModel_1.default.findOne({
            where: { institution_name },
        });
        if (checkSchool) {
            return response.status(400).json({
                status: `error`,
                message: `Institution already exists`,
            });
        }
        const createdSchool = (await institutionModel_1.default.create({
            id: (0, uuid_1.v4)(),
            institution_name,
        }));
        const findSchool = await institutionModel_1.default.findOne({
            where: { institution_name, id: createdSchool.id },
        });
        if (findSchool) {
            return response.status(200).json({
                status: `success`,
                message: `Institution created successfully`,
                findSchool,
            });
        }
        return response.status(400).json({
            status: `error`,
            message: `Unable to create Institution, try again`,
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
exports.createInstitution = createInstitution;
