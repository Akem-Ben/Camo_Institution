"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamSection = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../configurations/index");
class ExamSection extends sequelize_1.Model {
}
exports.ExamSection = ExamSection;
ExamSection.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    section_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    course_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    total_score: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    instructions: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize: index_1.database,
    tableName: "ExamSection"
});
exports.default = ExamSection;
