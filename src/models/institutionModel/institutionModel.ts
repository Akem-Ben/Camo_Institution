import { DataTypes, Model } from "sequelize";
import { database } from "../../configurations/index";

export interface InstitutionAttributes {
  id: string;
  institution_name: string;
}

export class Institution extends Model<InstitutionAttributes> {}

Institution.init(
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
  },
  {
    sequelize: database,
    tableName: "Institution",
    timestamps: true,
  }
);

export default Institution;
