"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Responses = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../configurations/index");
class Responses extends sequelize_1.Model {
}
exports.Responses = Responses;
Responses.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    question_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    course_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    response_text: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    response_score: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    student_id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
}, {
    sequelize: index_1.database,
    tableName: "Response",
});
exports.default = Responses;
