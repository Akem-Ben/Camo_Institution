"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faculty = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../configurations/index");
class Faculty extends sequelize_1.Model {
}
exports.Faculty = Faculty;
Faculty.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    institution_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    faculty_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: index_1.database,
    tableName: "Faculty",
    timestamps: true,
});
exports.default = Faculty;
