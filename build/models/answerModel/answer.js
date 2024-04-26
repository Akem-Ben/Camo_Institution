"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Answer = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../configurations/index");
class Answer extends sequelize_1.Model {
}
exports.Answer = Answer;
Answer.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    course_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    question_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    answer_text: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    answer_score: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: index_1.database,
    tableName: "Answer",
});
exports.default = Answer;
