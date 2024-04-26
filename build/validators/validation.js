"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateExamSectionSchema = exports.validateAdminSchema = exports.loginSchema = exports.validateRegisterSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.validateRegisterSchema = zod_1.default.object({
    first_name: zod_1.default.string({ required_error: "firstname is required" }),
    last_name: zod_1.default.string({ required_error: "lastname is required" }),
    email: zod_1.default
        .string({ required_error: "email is required" })
        .email({ message: "mail is invalid" }),
    password: zod_1.default.string({ required_error: "password is required" }).min(6),
    confirm_password: zod_1.default.string({ required_error: "password is required" }).min(6),
    user_name: zod_1.default.string({ required_error: "username is required" }),
});
exports.loginSchema = zod_1.default.object({
    email: zod_1.default
        .string({ required_error: "email is required" })
        .email({ message: "invalid email" }),
    password: zod_1.default.string({ required_error: "password is required" }),
});
exports.validateAdminSchema = zod_1.default.object({
    first_name: zod_1.default.string({ required_error: "firstname is required" }),
    last_name: zod_1.default.string({ required_error: "lastname is required" }),
    email: zod_1.default
        .string({ required_error: "email is required" })
        .email({ message: "mail is invalid" }),
    password: zod_1.default.string({ required_error: "password is required" }).min(6),
    confirm_password: zod_1.default.string({ required_error: "password is required" }).min(6),
    user_name: zod_1.default.string({ required_error: "username is required" }),
});
exports.validateExamSectionSchema = zod_1.default.object({
    section_name: zod_1.default.string({ required_error: "section name is required" }),
    course_id: zod_1.default.string({ required_error: "course id is required" }),
    total_score: zod_1.default.string({ required_error: "total score is required" }),
    instructions: zod_1.default.string({ required_error: "instructions is required" }),
    duration: zod_1.default.string({ required_error: "exam duration (in seconds) is required" }),
});
