"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Department = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../configurations/index");
class Department extends sequelize_1.Model {
}
exports.Department = Department;
Department.init({
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
    department_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: index_1.database,
    tableName: "Department",
    timestamps: true,
});
exports.default = Department;
