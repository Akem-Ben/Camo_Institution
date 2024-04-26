"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TotalScore = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../configurations/index");
class TotalScore extends sequelize_1.Model {
}
exports.TotalScore = TotalScore;
TotalScore.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    tota_score: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    section_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    student_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
}, {
    sequelize: index_1.database,
    tableName: "TotalScore",
});
exports.default = TotalScore;
