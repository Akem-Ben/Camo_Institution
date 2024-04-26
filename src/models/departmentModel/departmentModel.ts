import { DataTypes, Model } from "sequelize";
import { database } from "../../configurations/index";

export interface DepartmentAttributes {
  id: string;
  institution_name: string;
  faculty_name: string;
  department_name: string;
}

export class Department extends Model<DepartmentAttributes> {}

Department.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    institution_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    faculty_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    tableName: "Department",
    timestamps: true,
  }
);

export default Department;
