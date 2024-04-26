import { DataTypes, Model } from "sequelize";
import { database } from "../../configurations/index";


export interface ResponseAttributes {
  id: string;
  question_id: string;
  course_id: string;
  response_text: string;
  response_score: number;
  student_id: string;
}

export class Responses extends Model<ResponseAttributes> {}

Responses.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    question_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    response_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    response_score: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    student_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    tableName: "Response",
  }
);

export default Responses;