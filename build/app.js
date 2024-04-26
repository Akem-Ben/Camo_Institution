"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const configurations_1 = require("./configurations");
const studentRoutes_1 = __importDefault(require("./routes/studentRoutes/studentRoutes"));
const lecturerRoutes_ts_1 = __importDefault(require("./routes/lecturerRoutes/lecturerRoutes.ts"));
const institutionRoutes_1 = __importDefault(require("./routes/institutionRoutes/institutionRoutes"));
const examRoutes_1 = __importDefault(require("./routes/examRoutes/examRoutes"));
const courseRoutes_1 = __importDefault(require("./routes/courseRoutes/courseRoutes"));
const generalRoutes_1 = __importDefault(require("./routes/generalUserRoutes/generalRoutes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use("/student", studentRoutes_1.default);
app.use("/lecturer", lecturerRoutes_ts_1.default);
app.use("/institution", institutionRoutes_1.default);
app.use("/exam", examRoutes_1.default);
app.use("/course", courseRoutes_1.default);
app.use("/user", generalRoutes_1.default);
configurations_1.database.sync({}).then(() => {
    console.log("Database is connected");
}).catch((err) => {
    console.log(err);
});
app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
});
exports.default = app;
