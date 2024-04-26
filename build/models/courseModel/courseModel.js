"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = exports.examReady = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../configurations/index");
var examReady;
(function (examReady) {
    examReady["YES"] = "Yes";
    examReady["NO"] = "No";
    examReady["EXPIRED"] = "Expired";
})(examReady || (exports.examReady = examReady = {}));
class Course extends sequelize_1.Model {
}
exports.Course = Course;
Course.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    level: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    course_code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    credit_unit: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    semester: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    isExamReady: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(examReady)),
        allowNull: false,
        defaultValue: "No"
    },
    session: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    department_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    faculty_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    lecturer_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
}, {
    sequelize: index_1.database,
    tableName: "Course",
});
exports.default = Course;
