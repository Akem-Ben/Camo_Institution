"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgetPassword = void 0;
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const helpers_1 = require("../../helpers/helpers");
const notification_1 = require("../../utilities/notification");
const forgetPassword = async (request, response) => {
    try {
        const email = request.body.email;
        const findUser = await userModel_1.default.findOne({ where: { email } });
        if (!findUser) {
            return response.status(400).json({
                status: `error`,
                message: `User does not exists`,
            });
        }
        if (findUser) {
            const token = (0, helpers_1.generateToken)({
                id: findUser.id,
                email: findUser.email,
            });
            await (0, notification_1.sendResetPassword)(findUser.email, token);
            return response.status(200).json({
                status: `success`,
                message: `A password reset link has been sent to ${email}`,
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
exports.forgetPassword = forgetPassword;
