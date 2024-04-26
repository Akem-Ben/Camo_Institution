import { DataTypes, Model } from "sequelize";
import { database } from "../../configurations/index";

export interface EnrollmentAttributes {
  id: string;
  student_id: string;
  course_id: string;
  course_code: string;
  course_title: string;
  lecturer_id: string;
  department_id: string;
  session: string;
  semester: string;
  total_score: number;
  isExamWritten: boolean;
}

export class Enrollment extends Model<EnrollmentAttributes> {}

Enrollment.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    student_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    course_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lecturer_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    department_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    session: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    semester: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    total_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
  isExamWritten: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  },
  {
    sequelize: database,
    tableName: "Enrollment",
  }
);

export default Enrollment;