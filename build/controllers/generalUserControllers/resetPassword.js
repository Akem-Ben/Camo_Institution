"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = void 0;
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = require("../../helpers/helpers");
const resetPassword = async (request, response) => {
    try {
        const token = request.params.token;
        const { new_password, confirm_password } = request.body;
        const decode = jsonwebtoken_1.default.verify(token, `${process.env.APP_SECRET}`);
        const userId = decode.id;
        const user = (await userModel_1.default.findOne({
            where: { id: userId },
        }));
        if (!user) {
            return response.status(400).json({
                status: `error`,
                message: `Password reset failed`,
            });
        }
        if (new_password !== confirm_password) {
            return response.status(400).json({
                status: `error`,
                message: `Password does not match`,
            });
        }
        const newPassword = await (0, helpers_1.hashPassword)(new_password);
        const updatePassword = await userModel_1.default.update({ password: newPassword }, { where: { id: userId } });
        return response.status(200).json({
            status: `success`,
            message: `Your password has been successfuly changed`,
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`,
        });
    }
};
exports.resetPassword = resetPassword;
