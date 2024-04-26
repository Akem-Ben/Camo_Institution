import { DataTypes, Model } from "sequelize";
import { database } from "../../configurations/index";

export interface FacultyAttributes {
  id: string;
  institution_name: string;
  faculty_name: string
}

export class Faculty extends Model<FacultyAttributes> {}

Faculty.init(
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
  },
  {
    sequelize: database,
    tableName: "Faculty",
    timestamps: true,
  }
);

export default Faculty;
