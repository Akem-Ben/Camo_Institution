import { DataTypes, Model } from "sequelize";
import { database } from "../../configurations/index";

export interface CourseAttributes {
  id: string;
  title: string;
  course_code: string;
  credit_unit: string;
  semester: string;
  session: string;
  department_id: string;
  faculty_id: string;
  level: string;
  lecturer_id: string;
  isExamReady: string;
}


export enum examReady {
  YES = 'Yes',
  NO = 'No',
  EXPIRED = 'Expired'
}

export class Course extends Model<CourseAttributes> {}

Course.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    level:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    credit_unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    semester: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isExamReady: {
      type: DataTypes.ENUM(...Object.values(examReady)),
      allowNull: false,
      defaultValue: "No"
    },
    session: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    faculty_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    lecturer_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
  },
  {
    sequelize: database,
    tableName: "Course",
  }
);

export default Course;