import { DataTypes, Model } from "sequelize";
import { database } from "../../configurations/index";

type Options = {
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
};

type Question = {
  question_body: string;
  options: Options;
};

export enum QuestionType {
  MULTIPLE_CHOICE = "Multiple Choice",
  TEXT = "Text",
}

export interface QuestionAttributes {
  id: string;
  type: QuestionType;
  question: Question;
  course_id: string;
  section_id: string;
  score: string;
  answer: string;
}

export class Questions extends Model<QuestionAttributes> {}

Questions.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    question: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    section_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(QuestionType)),
      allowNull: false,
    },
    score: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    tableName: "Question",
  }
);

export default Questions;
