"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const helpers_1 = require("../../helpers/helpers");
const departmentModel_1 = __importDefault(require("../../models/departmentModel/departmentModel"));
const userLogin = async (request, response) => {
    try {
        const { reg_no, password } = request.body;
        const subuser = (await userModel_1.default.findOne({
            where: { userID_no: reg_no },
        }));
        if (!subuser) {
            return response.status(404).json({
                status: `error`,
                message: `Registration number ${reg_no} does not exist`,
            });
        }
        const validate = await bcryptjs_1.default.compare(password, subuser.password);
        if (!validate) {
            return response.status(400).json({
                status: `error`,
                message: `Incorrect Password`,
            });
        }
        const data = {
            id: subuser.id,
            email: subuser.email,
        };
        const token = (0, helpers_1.generateToken)(data);
        const department = await departmentModel_1.default.findOne({ where: { id: subuser.department_id } });
        const user = { ...subuser, departmentName: department.department_name, facultyName: department.faculty_name };
        return response.status(200).json({
            message: `Welcome back ${subuser.first_name}`,
            token,
            user,
        });
    }
    catch (error) {
        console.log(error.message);
        response.status(400).json({
            status: `error`,
            method: request.method,
            message: error.message,
        });
    }
};
exports.userLogin = userLogin;
