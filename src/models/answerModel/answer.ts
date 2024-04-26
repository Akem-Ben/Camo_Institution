import { DataTypes, Model } from "sequelize";
import { database } from "../../configurations/index";


export interface AnswerAttributes {
  id: string;
  question_id: string;
  course_id: string;
  answer_text: string;
  answer_score: number
}

export class Answer extends Model<AnswerAttributes> {}

Answer.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    question_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    answer_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    tableName: "Answer",
  }
);

export default Answer;