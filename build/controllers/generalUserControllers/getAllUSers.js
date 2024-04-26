"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const getAllUsers = async (request, response) => {
    try {
        const allUsers = await userModel_1.default.findAll({});
        if (allUsers) {
            if (allUsers.length === 0) {
                return response.status(404).json({
                    status: `success`,
                    message: `No Users found`,
                    allUsers
                });
            }
            else {
                return response.status(200).json({
                    status: `success`,
                    message: `Users found successfully`,
                    allUsers
                });
            }
        }
        return response.status(400).json({
            status: `error`,
            message: `Unable to find Users, try again`,
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
exports.getAllUsers = getAllUsers;
