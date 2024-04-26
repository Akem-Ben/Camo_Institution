"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enrollment = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../configurations/index");
class Enrollment extends sequelize_1.Model {
}
exports.Enrollment = Enrollment;
Enrollment.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    student_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    course_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    course_code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    course_title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lecturer_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    department_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    session: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    semester: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    total_score: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    isExamWritten: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    sequelize: index_1.database,
    tableName: "Enrollment",
});
exports.default = Enrollment;
