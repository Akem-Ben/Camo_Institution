import { DataTypes, Model } from "sequelize";
import { database } from "../../configurations/index";


export interface TotalScoreAttributes {
  id: string;
  section_id: string;
  student_id: string;
  tota_score: string;
}

export class TotalScore extends Model<TotalScoreAttributes> {}

TotalScore.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    tota_score: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    section_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    student_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
  },
  {
    sequelize: database,
    tableName: "TotalScore",
  }
);

export default TotalScore;