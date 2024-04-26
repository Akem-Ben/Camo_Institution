"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalAuthoriser = exports.lecturerAuthoriser = exports.studentAuthoriser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel/userModel"));
const studentAuthoriser = async (request, response, next) => {
    try {
        const authorization = request.headers.authorization;
        if (authorization === undefined) {
            return response.status(401).json({
                message: `You are not authorized to view this page`,
            });
        }
        const token = authorization.split(" ");
        const mainToken = token[1];
        if (!mainToken || mainToken === "") {
            return response.status(401).json({
                status: `Failed`,
                message: `Login required`,
            });
        }
        const decode = jsonwebtoken_1.default.verify(mainToken, `${process.env.APP_SECRET}`);
        const student = await userModel_1.default.findOne({ where: { id: decode.id } });
        if (student === null) {
            return response.status(400).json({
                status: `error`,
                message: `Login again`
            });
        }
        if (student.user_type !== 'Student') {
            return response.status(400).json({
                status: `error`,
                message: `You are not allowed to access this resource. Contact the admin`
            });
        }
        request.user = decode;
        next();
    }
    catch (error) {
        if (error.message === 'jwt expired' || error.message === 'invalid signature') {
            return response.status(401).json({
                status: 'error',
                message: 'Session Expired. Please log in again.',
            });
        }
        console.log(error.message);
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error: ${error}`,
        });
    }
};
exports.studentAuthoriser = studentAuthoriser;
const lecturerAuthoriser = async (request, response, next) => {
    try {
        const authorization = request.headers.authorization;
        if (authorization === undefined) {
            return response.status(401).json({
                message: `You are not authorized to view this page`,
            });
        }
        const token = authorization.split(" ");
        const mainToken = token[1];
        if (!mainToken || mainToken === "") {
            return response.status(401).json({
                status: `Failed`,
                message: `Login required`,
            });
        }
        const decode = jsonwebtoken_1.default.verify(mainToken, `${process.env.APP_SECRET}`);
        const admin = await userModel_1.default.findOne({ where: { id: decode.id } });
        if (admin === null) {
            return response.status(400).json({
                status: `error`,
                message: `Login again`
            });
        }
        if (admin.user_type !== 'Lecturer') {
            return response.status(400).json({
                status: `error`,
                message: `You are not allowed to access this resource. Contact the admin`
            });
        }
        request.user = decode;
        next();
    }
    catch (error) {
        if (error.message === 'jwt expired' || error.message === 'invalid signature') {
            return response.status(401).json({
                status: 'error',
                message: 'Session Expired. Please log in again.',
            });
        }
        console.log(error.message);
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error: ${error}`,
        });
    }
};
exports.lecturerAuthoriser = lecturerAuthoriser;
const generalAuthoriser = async (request, response, next) => {
    try {
        const authorization = request.headers.authorization;
        if (authorization === undefined) {
            return response.status(401).json({
                message: `You are not authorized to view this page`,
            });
        }
        const token = authorization.split(" ");
        const mainToken = token[1];
        if (!mainToken || mainToken === "") {
            return response.status(401).json({
                status: `Failed`,
                message: `Login required`,
            });
        }
        const decode = jsonwebtoken_1.default.verify(mainToken, `${process.env.APP_SECRET}`);
        request.user = decode;
        next();
    }
    catch (error) {
        if (error.message === 'jwt expired' || error.message === 'invalid signature') {
            return response.status(401).json({
                status: 'error',
                message: 'Session Expired. Please log in again.',
            });
        }
        console.log(error.message);
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error: ${error}`,
        });
    }
};
exports.generalAuthoriser = generalAuthoriser;
