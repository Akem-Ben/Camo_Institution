import { DataTypes, Model } from "sequelize";
import { database } from "../../configurations/index";

export interface ExamSectionAttributes {
  id: string;
  section_name: string;
  course_id: string;
  total_score: string;
  instructions: string;
  duration: string;
}

export class ExamSection extends Model<ExamSectionAttributes> {}

ExamSection.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    section_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    total_score: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instructions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize: database,
    tableName: "ExamSection"
  }
);

export default ExamSection;