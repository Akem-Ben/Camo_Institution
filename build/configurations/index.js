"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const setup_1 = __importDefault(require("./setup"));
const { URI } = setup_1.default;
dotenv_1.default.config();
const connectDB = async () => {
    try {
        const conn = await mongoose_1.default.connect(`${URI}`);
        console.log(`Database connected`);
    }
    catch (err) {
        console.log(err);
    }
};
exports.connectDB = connectDB;
