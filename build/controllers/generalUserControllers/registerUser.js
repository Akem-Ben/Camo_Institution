"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const facultyModel_1 = __importDefault(require("../../models/facultyModel/facultyModel"));
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const uuid_1 = require("uuid");
const departmentModel_1 = __importDefault(require("../../models/departmentModel/departmentModel"));
const helpers_1 = require("../../helpers/helpers");
const notification_1 = require("../../utilities/notification");
const createUser = async (request, response) => {
    try {
        const checkUser = await userModel_1.default.findOne({ where: { email: request.body.email } });
        if (checkUser) {
            return response.status(400).json({
                status: `error`,
                message: `User already exists`,
            });
        }
        const department = (await departmentModel_1.default.findOne({
            where: { id: request.body.department_id },
        }));
        if (!department) {
            return response.status(400).json({
                status: `error`,
                message: `Department not found`,
            });
        }
        const faculty = (await facultyModel_1.default.findOne({
            where: { faculty_name: department.faculty_name },
        }));
        if (!faculty) {
            return response.status(400).json({
                status: `error`,
                message: `Faculty not found`,
            });
        }
        let Id_no = "";
        if (request.body.user_type === "Lecturer") {
            const lecturers = await userModel_1.default.findAll({
                where: { user_type: "Lecturer" },
            });
            if (lecturers.length === 0) {
                Id_no = "CU/LC/1010101";
            }
            else {
                const getIds = lecturers.map((a) => a.userID_no);
                for (let index = 0; index < getIds.length; index++) {
                    getIds[index] = Number(getIds[index].split("/")[2]);
                }
                getIds.sort((a, b) => b - a);
                const incrementId = getIds[0] + 1;
                Id_no = `CU/LC/${incrementId}`;
            }
            let newLastName = request.body.last_name.toLowerCase();
            const passwordHash = await (0, helpers_1.hashPassword)(newLastName);
            const newUser = (await userModel_1.default.create({
                id: (0, uuid_1.v4)(),
                first_name: request.body.first_name,
                last_name: request.body.last_name,
                email: request.body.email,
                user_type: request.body.user_type,
                faculty_id: faculty.id,
                department_id: request.body.department_id,
                userID_no: Id_no,
                password: passwordHash,
            }));
            const confirm_user = (await userModel_1.default.findOne({
                where: { id: newUser.id },
            }));
            if (!confirm_user) {
                return response.status(400).json({
                    status: `error`,
                    message: `Unable to create user`,
                });
            }
            let mailingDetails = {
                email: confirm_user.email,
                registration_number: confirm_user.userID_no
            };
            await (0, notification_1.sendLoginDetails)(mailingDetails);
            return response.status(200).json({
                status: `success`,
                message: `User created successfully`,
                confirm_user,
            });
        }
        else if (request.body.user_type === "Student") {
            if (request.body.level === undefined || request.body.level === null || request.body.level.length === 0) {
                return response.status(400).json({
                    status: `error`,
                    message: `Student level cannot be empty`
                });
            }
            const students = await userModel_1.default.findAll({ where: { user_type: "Student" } });
            if (students.length === 0) {
                Id_no = "CU/ST/1010101";
            }
            else {
                const getIds = students.map((a) => a.userID_no);
                for (let index = 0; index < getIds.length; index++) {
                    getIds[index] = Number(getIds[index].split("/")[2]);
                }
                getIds.sort((a, b) => b - a);
                const incrementId = getIds[0] + 1;
                Id_no = `CU/ST/${incrementId}`;
            }
            let newLastName = request.body.last_name.toLowerCase();
            const passwordHash = await (0, helpers_1.hashPassword)(newLastName);
            const newUser = (await userModel_1.default.create({
                id: (0, uuid_1.v4)(),
                first_name: request.body.first_name,
                last_name: request.body.last_name,
                email: request.body.email,
                user_type: request.body.user_type,
                level: request.body.level,
                faculty_id: faculty.id,
                department_id: request.body.department_id,
                userID_no: Id_no,
                password: passwordHash,
            }));
            const confirm_user = (await userModel_1.default.findOne({
                where: { id: newUser.id },
            }));
            if (!confirm_user) {
                return response.status(400).json({
                    status: `error`,
                    message: `Unable to create user`,
                });
            }
            let mailingDetails = {
                email: confirm_user.email,
                registration_number: confirm_user.userID_no
            };
            await (0, notification_1.sendLoginDetails)(mailingDetails);
            return response.status(200).json({
                status: `success`,
                message: `User created successfully`,
                confirm_user,
            });
        }
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`,
        });
    }
};
exports.createUser = createUser;
