"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Institution = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../configurations/index");
class Institution extends sequelize_1.Model {
}
exports.Institution = Institution;
Institution.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    institution_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: index_1.database,
    tableName: "Institution",
    timestamps: true,
});
exports.default = Institution;
