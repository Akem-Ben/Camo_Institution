"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markExams = exports.sendTestMail = exports.convertToISODateString = exports.convertToDDMMYY = exports.generateToken = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const notification_1 = require("../utilities/notification");
const studentResponse_1 = __importDefault(require("../models/studentResponseModel/studentResponse"));
const questionModel_1 = __importDefault(require("../models/questionModel/questionModel"));
const enrollment_1 = __importDefault(require("../models/enrollmentModel/enrollment"));
dotenv_1.default.config();
const hashPassword = async (password) => {
    const saltRounds = 10;
    const salt = await bcryptjs_1.default.genSalt(saltRounds);
    const hash = await bcryptjs_1.default.hash(password, salt);
    return hash;
};
exports.hashPassword = hashPassword;
const generateToken = (data) => {
    return jsonwebtoken_1.default.sign(data, `${process.env.APP_SECRET}`, { expiresIn: "1d" });
};
exports.generateToken = generateToken;
const convertToDDMMYY = (isoDateString) => {
    const date = new Date(isoDateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}-${month}-${year}`;
};
exports.convertToDDMMYY = convertToDDMMYY;
const convertToISODateString = (regularDateString) => {
    const dateParts = regularDateString.split('/');
    if (dateParts.length === 3) {
        const day = dateParts[0].padStart(2, '0');
        const month = dateParts[1].padStart(2, '0');
        const year = dateParts[2];
        // Ensure the date is valid by constructing a Date object
        const date = new Date(`${year}-${month}-${day}`);
        // Check if the date is valid after parsing
        if (!isNaN(date.getTime())) {
            return date.toISOString().slice(0, 10);
        }
    }
    return null; // Return null for invalid or unrecognized input
};
exports.convertToISODateString = convertToISODateString;
const sendTestMail = async () => {
    let mailingDetails = {
        email: "akemini.ndaobong@gmail.com",
        registration_number: "HBS/2021/001"
    };
    await (0, notification_1.sendLoginDetails)(mailingDetails);
    return console.log('test');
};
exports.sendTestMail = sendTestMail;
const markExams = async (student_id, course_id) => {
    try {
        const getStudentsResponse = await studentResponse_1.default.findAll({ where: { course_id, student_id } });
        let check_marking = false;
        getStudentsResponse.map((response) => {
            if (Number(response.response_score) !== 0) {
                check_marking = true;
                return;
            }
        });
        if (check_marking) {
            return;
        }
        let sum = 0;
        for (let index = 0; index < getStudentsResponse.length; index++) {
            const studentAnswer = getStudentsResponse[index];
            const question = await questionModel_1.default.findOne({ where: { id: studentAnswer.question_id, course_id } });
            if (question) {
                if (studentAnswer.response_text === question.answer) {
                    sum += Number(question.score);
                    let newScore = Number(question.score);
                    await studentResponse_1.default.update({ response_score: newScore }, { where: { id: studentAnswer.id } });
                }
                else {
                    sum += 0;
                    await studentResponse_1.default.update({ response_score: 0 }, { where: { id: studentAnswer.id } });
                }
            }
            await enrollment_1.default.update({ total_score: sum }, { where: { student_id, course_id } });
        }
        const findAndConfirm = await studentResponse_1.default.findAll({ where: { course_id, student_id } });
        const findQuestion = await questionModel_1.default.findAll({ where: { course_id } });
        return;
    }
    catch (error) {
        console.log(error.message);
        return error.message;
    }
};
exports.markExams = markExams;
