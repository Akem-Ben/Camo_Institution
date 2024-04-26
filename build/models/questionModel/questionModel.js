"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Questions = exports.QuestionType = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../configurations/index");
var QuestionType;
(function (QuestionType) {
    QuestionType["MULTIPLE_CHOICE"] = "Multiple Choice";
    QuestionType["TEXT"] = "Text";
})(QuestionType || (exports.QuestionType = QuestionType = {}));
class Questions extends sequelize_1.Model {
}
exports.Questions = Questions;
Questions.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    question: {
        type: sequelize_1.DataTypes.JSONB,
        allowNull: false,
    },
    course_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    section_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(QuestionType)),
        allowNull: false,
    },
    score: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    answer: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: index_1.database,
    tableName: "Question",
});
exports.default = Questions;
